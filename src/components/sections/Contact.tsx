import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Mail,
  AlertTriangle,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "subject" | "message";

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LABELS: Record<FieldName, string> = {
  name: "Your name",
  email: "Email address",
  subject: "Subject",
  message: "Message",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That email address doesn't look valid.";

  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  else if (values.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";

  if (!values.message.trim()) errors.message = "Please write a message.";
  else if (values.message.trim().length < 12)
    errors.message = "A little more detail helps — 12 characters minimum.";

  return errors;
}

interface FieldProps {
  name: FieldName;
  value: string;
  error?: string;
  onChange: (name: FieldName, value: string) => void;
  onBlur: (name: FieldName) => void;
  type?: "text" | "email";
  textarea?: boolean;
  autoComplete?: string;
  placeholder?: string;
}

function Field({
  name,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  textarea,
  autoComplete,
  placeholder,
}: FieldProps) {
  const errorId = `${name}-error`;
  const shared =
    "w-full rounded-xl border bg-surface px-4 py-3.5 text-[0.92rem] text-ink placeholder:text-faint transition-all duration-300 focus:outline-none focus:ring-0";

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted"
      >
        {LABELS[name]}
        <span className="ml-1 text-accent2" aria-hidden="true">
          *
        </span>
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          className={cn(
            shared,
            "resize-none",
            error
              ? "border-red-500/60 focus:border-red-500"
              : "border-line hover:border-accent2/40 focus:border-accent2",
          )}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          className={cn(
            shared,
            error
              ? "border-red-500/60 focus:border-red-500"
              : "border-line hover:border-accent2/40 focus:border-accent2",
          )}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-2 text-[0.76rem] text-red-500 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusDetail, setStatusDetail] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);

  const setField = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the error as soon as the visitor starts fixing it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    if (status !== "idle") setStatus("idle");
  };

  const blurField = (name: FieldName) => {
    const found = validate(values);
    setErrors((prev) => ({ ...prev, [name]: found[name] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    // Simple spam trap — real visitors never fill this.
    if (honeypot.current?.value) return;

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("error");
      setStatusDetail("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setStatusDetail("");

    const endpoint = profile.contact.formEndpoint;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...values,
            _subject: `Portfolio enquiry — ${values.subject}`,
            _source: "kowshik-gajula-portfolio",
          }),
        });

        if (!response.ok) throw new Error(`Request failed (${response.status})`);

        setStatus("success");
        setStatusDetail(
          "Thanks — your message has been sent. I'll get back to you as soon as I can.",
        );
      } else {
        // No backend configured: hand the message to the visitor's mail client
        // with everything pre-filled so nothing is lost.
        const body = `${values.message}\n\n—\n${values.name}\n${values.email}`;
        const href =
          `mailto:${profile.contact.email}` +
          `?subject=${encodeURIComponent(`Portfolio enquiry — ${values.subject}`)}` +
          `&body=${encodeURIComponent(body)}`;

        window.location.href = href;

        setStatus("success");
        setStatusDetail(
          "Your email client should be opening with the message pre-filled — press send there and it's on its way.",
        );
      }
    } catch (error) {
      setStatus("error");
      setStatusDetail(
        `Something went wrong sending that (${
          error instanceof Error ? error.message : "unknown error"
        }). Please try again, or email me directly.`,
      );
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setStatus("idle");
    setStatusDetail("");
  };

  const links = [
    {
      id: "email",
      label: "Email",
      value: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
      icon: Mail,
      external: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: profile.contact.linkedin,
      icon: LinkedinIcon,
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      value: "View repositories",
      href: profile.contact.github,
      icon: GithubIcon,
      external: true,
    },
    {
      id: "resume",
      label: "Résumé",
      value: "Download PDF",
      href: profile.contact.resume,
      icon: Download,
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent-gradient opacity-[0.08] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="06 — Contact"
          title={
            <>
              Have an SAP Challenge?{" "}
              <span className="text-gradient">Let's Build the Solution.</span>
            </>
          }
          description="Whether it's a new development, an integration that needs designing, or a production issue that refuses to go away — send the details and I'll come back to you."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* -------- Details -------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      download={link.id === "resume" ? true : undefined}
                      className="card-hover group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-accent-gradient-soft text-accent2 transition-colors group-hover:border-accent2/45">
                        <link.icon size={17} strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faint">
                          {link.label}
                        </span>
                        <span className="mt-1 block truncate text-[0.92rem] font-medium text-ink">
                          {link.value}
                        </span>
                      </span>
                      <ArrowRight
                        size={15}
                        strokeWidth={1.8}
                        className="shrink-0 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent2"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass mt-6 rounded-2xl p-6">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-emerald-500 dark:text-emerald-400">
                    {profile.availability.label}
                  </span>
                </div>
                <p className="text-[0.88rem] leading-relaxed text-muted">
                  Based in {profile.location} and working across time zones.
                  Typically replies within a working day.
                </p>
              </div>
            </Reveal>
          </div>

          {/* -------- Form -------- */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass rounded-2xl p-6 sm:p-8"
              >
                {/* Honeypot */}
                <input
                  ref={honeypot}
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    name="name"
                    value={values.name}
                    error={errors.name}
                    onChange={setField}
                    onBlur={blurField}
                    autoComplete="name"
                    placeholder="Jane Doe"
                  />
                  <Field
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={setField}
                    onBlur={blurField}
                    autoComplete="email"
                    placeholder="jane@company.com"
                  />
                </div>

                <div className="mt-5">
                  <Field
                    name="subject"
                    value={values.subject}
                    error={errors.subject}
                    onChange={setField}
                    onBlur={blurField}
                    placeholder="Interface development for SAP PM"
                  />
                </div>

                <div className="mt-5">
                  <Field
                    name="message"
                    textarea
                    value={values.message}
                    error={errors.message}
                    onChange={setField}
                    onBlur={blurField}
                    placeholder="Tell me about the system, the process and what needs to change…"
                  />
                </div>

                {/* Feedback banner */}
                <AnimatePresence mode="wait">
                  {status !== "idle" && (
                    <motion.div
                      key={status + statusDetail}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      role={status === "error" ? "alert" : "status"}
                      className={cn(
                        "mt-5 flex items-start gap-3 rounded-xl border px-4 py-3.5 text-[0.86rem] leading-relaxed",
                        status === "success"
                          ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-red-500/35 bg-red-500/10 text-red-600 dark:text-red-400",
                      )}
                    >
                      {status === "success" ? (
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                      ) : (
                        <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                      )}
                      <span>
                        {status === "success" ? (
                          <>
                            <strong className="font-semibold">Message ready.</strong>{" "}
                            {statusDetail}
                          </>
                        ) : (
                          statusDetail
                        )}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[0.9rem] font-medium transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending…
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 size={16} strokeWidth={1.9} />
                        Sent
                      </>
                    ) : (
                      <>
                        <Send size={15} strokeWidth={1.9} />
                        Send message
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <button
                      type="button"
                      onClick={reset}
                      className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted underline-offset-4 transition-colors hover:text-accent2 hover:underline"
                    >
                      Send another
                    </button>
                  )}

                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                    Or email{" "}
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="text-accent2 underline-offset-4 hover:underline"
                    >
                      directly
                    </a>
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
