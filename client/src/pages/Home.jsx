import { Link } from "react-router-dom";
import { ArrowRight, Code2, GraduationCap, HeartHandshake, MapPin, Megaphone, Quote, Users } from "lucide-react";

const stats = [
  { label: "Volunteers", value: "500+", icon: Users },
  { label: "Cities", value: "25+", icon: MapPin },
  { label: "Campaigns", value: "80+", icon: HeartHandshake }
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
      <section className="bg-white dark:bg-slate-950">
        <div className="section-shell py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal">NayePankh Foundation</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-brand-navy dark:text-white sm:text-5xl">
              NayePankh Volunteer Management System
            </h1>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
              A complete volunteer registration and admin management platform for tracking skills, cities, activity, reports, and team recommendations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary">
                Join as Volunteer
                <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-secondary">
                Admin Login
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="page-card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-3xl font-bold text-brand-teal">{item.value}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                    </div>
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200">
                      <Icon size={21} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
        <div className="section-shell grid gap-6 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal">About NayePankh</p>
            <h2 className="mt-2 text-3xl font-bold">Connecting people with meaningful social work.</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              NayePankh works with volunteers to support education, awareness, and community campaigns through organized teams and measurable impact.
            </p>
          </div>
          <div className="grid gap-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="page-card p-5">
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-teal-50 text-brand-teal dark:bg-teal-950 dark:text-teal-200">
                      <Icon size={21} />
                    </span>
                    <div>
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
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal">Testimonials</p>
            <h2 className="mt-2 text-3xl font-bold">Volunteer voices</h2>
          </div>
          <Link to="/register" className="btn-secondary w-fit">
            Register Now
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="page-card p-5">
              <Quote className="text-brand-teal" size={24} />
              <p className="mt-4 text-slate-700 dark:text-slate-200">"{testimonial.quote}"</p>
              <div className="mt-5">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="section-shell flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Email: contact@nayepankh.org | Location: India</p>
          </div>
          <Link to="/register" className="btn-primary w-fit">
            Start Volunteering
          </Link>
        </div>
      </section>
    </main>
  );
}
