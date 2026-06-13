import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  Code2,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Megaphone,
  Quote,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

const stats = [
  { label: "Volunteers", value: "500+", helper: "registered across campaigns", icon: Users, tone: "text-brand-teal bg-teal-50 dark:bg-teal-950 dark:text-teal-200" },
  { label: "Cities", value: "25+", helper: "local outreach networks", icon: MapPin, tone: "text-sky-700 bg-sky-50 dark:bg-sky-950 dark:text-sky-200" },
  { label: "Campaigns", value: "80+", helper: "education and awareness drives", icon: HeartHandshake, tone: "text-rose-700 bg-rose-50 dark:bg-rose-950 dark:text-rose-200" }
];

const reasons = [
  {
    title: "Education Support",
    text: "Teach, mentor, and help children build confidence through learning drives.",
    icon: GraduationCap
  },
  {
    title: "Digital Impact",
    text: "Use web development and design skills to improve campaign operations.",
    icon: Code2
  },
  {
    title: "Awareness Campaigns",
    text: "Create content, manage social media, and amplify community initiatives.",
    icon: Megaphone
  }
];

const workflow = [
  { title: "Register", text: "Capture profile, city, availability, and skill data.", icon: BadgeCheck },
  { title: "Recommend", text: "Map each volunteer to the right department instantly.", icon: Sparkles },
  { title: "Manage", text: "Review, update, export, and track activity from admin.", icon: BarChart3 }
];

const testimonials = [
  {
    name: "Riya Sharma",
    role: "Education Volunteer",
    quote: "The team matched my teaching skills with the right campaign and made volunteering simple."
  },
  {
    name: "Aman Verma",
    role: "Technical Volunteer",
    quote: "I could contribute through technology while learning how social impact projects are managed."
  }
];

export default function Home() {
  return (
    <main>
      <section className="hero-photo relative overflow-hidden text-white">
        <div className="absolute inset-0 fine-grid opacity-30" />
        <div className="section-shell relative flex min-h-[calc(100svh-132px)] items-center py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-teal-50 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-saffron" />
              NayePankh Foundation
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              NayePankh Volunteer Management System
            </h1>
            <p className="mt-5 max-w-[21rem] text-base leading-7 text-slate-100 sm:max-w-2xl sm:text-lg">
              A complete volunteer registration and admin management platform for tracking skills, cities, activity, reports, and team recommendations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="btn-primary">
                Join as Volunteer
                <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-secondary text-brand-navy hover:text-brand-navy dark:text-brand-navy">
                Admin Login
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-slate-100 sm:grid-cols-3">
              {["Skill-based routing", "Export-ready reports", "Protected admin panel"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">
                  <ShieldCheck size={16} className="shrink-0 text-teal-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell -mt-8 relative z-10 grid gap-4 pb-10 md:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="page-card lift-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-3xl font-bold text-slate-950 dark:text-white">{item.value}</p>
                  <p className="mt-1 font-semibold">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.helper}</p>
                </div>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${item.tone}`}>
                  <Icon size={22} />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="bg-white dark:bg-slate-950">
        <div className="section-shell grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">Operational Flow</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy dark:text-white sm:text-4xl">
              Built for fast volunteer intake and calm admin work.
            </h2>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
              The frontend keeps public registration simple while giving admins a focused workspace for filtering, reporting, recommendations, and activity visibility.
            </p>
            <Link to="/register" className="btn-primary mt-6 w-fit">
              Start Registration
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {workflow.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="page-card lift-card p-5">
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-100 text-brand-navy dark:bg-slate-900 dark:text-slate-100">
                      <Icon size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Step {index + 1}</p>
                      <h3 className="mt-1 font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{step.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900">
        <div className="section-shell grid gap-6 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <p className="eyebrow">About NayePankh</p>
            <h2 className="mt-3 text-3xl font-bold">Connecting people with meaningful social work.</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              NayePankh works with volunteers to support education, awareness, and community campaigns through organized teams and measurable impact.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Education", "Awareness", "Technology", "Outreach"].map((item) => (
                <span key={item} className="badge">{item}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="page-card lift-card p-5">
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200">
                      <Icon size={21} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold">{reason.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{reason.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-3 text-3xl font-bold">Volunteer voices</h2>
          </div>
          <Link to="/register" className="btn-secondary w-fit">
            Register Now
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="page-card lift-card p-5">
              <Quote className="text-brand-teal" size={24} />
              <p className="mt-4 text-slate-700 dark:text-slate-200">"{testimonial.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-amber-50 text-sm font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-200">
                  {testimonial.name.charAt(0)}
                </span>
                <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-brand-navy text-white dark:border-slate-800">
        <div className="section-shell flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-100">
              <CalendarCheck size={16} />
              Volunteer intake is open
            </div>
            <h2 className="mt-2 text-2xl font-bold">Contact NayePankh Foundation</h2>
            <p className="mt-2 text-slate-200">Email: contact@nayepankh.org | Location: India</p>
          </div>
          <Link to="/register" className="btn-primary w-fit bg-white text-brand-navy hover:bg-slate-100">
            Start Volunteering
          </Link>
        </div>
      </section>
    </main>
  );
}
