import { mkdir, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const outputDir = path.join(rootDir, "docs", "screenshots");
const chromePaths = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
];

const baseUrl = process.env.SCREENSHOT_BASE_URL || "http://127.0.0.1:5173";
const apiUrl = process.env.SCREENSHOT_API_URL || "http://127.0.0.1:5000/api";
const profileDir = path.join(rootDir, ".screenshot-browser-profile");
const remotePort = Number(process.env.SCREENSHOT_REMOTE_PORT || 9333);

const viewports = [
  { name: "desktop", width: 1440, height: 1000, mobile: false, scale: 1 },
  { name: "mobile", width: 390, height: 844, mobile: true, scale: 2 }
];

const pages = [
  { name: "home", route: "/" },
  { name: "register", route: "/register" },
  { name: "login", route: "/login" },
  { name: "dashboard", route: "/admin", auth: true },
  { name: "volunteers", route: "/admin/volunteers", auth: true }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readEnv() {
  const envPath = path.join(rootDir, "server", ".env");
  if (!existsSync(envPath)) return {};

  return Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index), line.slice(index + 1)];
      })
  );
}

async function loginAdmin() {
  const env = readEnv();
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return null;

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD })
    });

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

function getBrowserPath() {
  const browserPath = chromePaths.find((candidate) => existsSync(candidate));
  if (!browserPath) throw new Error("Chrome or Edge executable was not found.");
  return browserPath;
}

async function getWebSocketDebuggerUrl() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${remotePort}/json/version`);
      const json = await response.json();
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }

  throw new Error("Chrome DevTools Protocol did not become ready.");
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();

    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) {
        pending.reject(new Error(message.error.message));
      } else {
        pending.resolve(message.result);
      }
    });
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId;
    this.nextId += 1;

    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;

    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  close() {
    this.ws.close();
  }
}

async function capturePage(client, sessionId, page, viewport, auth) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.scale,
    mobile: viewport.mobile
  }, sessionId);

  await client.send("Page.navigate", { url: `${baseUrl}/` }, sessionId);
  await sleep(700);
  if (page.auth) {
    await client.send("Runtime.evaluate", {
      expression: `
        localStorage.setItem("nayepankh_token", ${JSON.stringify(auth?.token || "screenshot-token")});
        localStorage.setItem("nayepankh_admin", ${JSON.stringify(JSON.stringify(auth?.admin || {
          id: "screenshot",
          name: "NayePankh Admin",
          email: "admin@nayepankh.org",
          role: "admin"
        }))});
        localStorage.setItem("nayepankh_theme", "light");
      `
    }, sessionId);
  } else {
    await client.send("Runtime.evaluate", {
      expression: `
        localStorage.removeItem("nayepankh_token");
        localStorage.removeItem("nayepankh_admin");
        localStorage.setItem("nayepankh_theme", "light");
      `
    }, sessionId);
  }

  await client.send("Page.navigate", { url: `${baseUrl}${page.route}` }, sessionId);
  await sleep(page.auth ? 3200 : 1800);

  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
    fromSurface: true
  }, sessionId);

  const filename = `${page.name}-${viewport.name}.png`;
  await writeFile(path.join(outputDir, filename), Buffer.from(screenshot.data, "base64"));
  console.log(`saved docs/screenshots/${filename}`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browserPath = getBrowserPath();
  const auth = await loginAdmin();
  const browser = spawn(browserPath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${remotePort}`,
    `--user-data-dir=${profileDir}`,
    "about:blank"
  ], { stdio: "ignore" });

  try {
    const wsUrl = await getWebSocketDebuggerUrl();
    const client = new CdpClient(wsUrl);
    await client.ready();
    const { targetId } = await client.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await client.send("Target.attachToTarget", { targetId, flatten: true });
    await client.send("Page.enable", {}, sessionId);
    await client.send("Runtime.enable", {}, sessionId);

    for (const viewport of viewports) {
      for (const page of pages) {
        await capturePage(client, sessionId, page, viewport, auth);
      }
    }

    client.close();
  } finally {
    browser.kill();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
