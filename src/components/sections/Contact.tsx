import * as React from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT } from "@/data";

const PROJECT_TYPES = ["Video editing", "Web design", "Both", "Other"];

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="slate text-dim">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Contact() {
  const [type, setType] = React.useState(PROJECT_TYPES[0]);
  const [status, setStatus] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();
    const subject = encodeURIComponent(`Project inquiry — ${type}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your email client…");
  };

  const contactItems = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
    {
      label: "YouTube",
      value: CONTACT.youtubeLabel,
      href: CONTACT.youtube,
      external: true,
    },
  ];

  return (
    <section id="contact" className="vignette relative overflow-hidden border-b border-ink/[0.08]">
      <div className="container py-20 md:py-28">
        <SectionHead reel="06" label="Contact" title="Let's make something that gets seen" />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left: coordinates */}
          <div>
            <Reveal>
              <Card className="p-0">
                <div className="flex items-center gap-2.5 border-b border-ink/[0.08] px-5 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-dim">
                    contact.card
                  </span>
                </div>
                <div className="p-5 font-mono text-[13px] leading-relaxed">
                  <p className="text-ink">
                    <span className="text-rose">&gt;</span> Ready to start a
                    project?
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 inline-block text-rose underline-offset-4 hover:underline"
                  >
                    <span className="text-rose">&gt;</span> {CONTACT.email}
                  </a>
                </div>
              </Card>
            </Reveal>

            <Reveal stagger className="mt-8 divide-y divide-ink/[0.08]">
              {contactItems.map((c) => (
                <div key={c.label} className="flex flex-col gap-1 py-4">
                  <span className="slate text-dim">{c.label}</span>
                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-1.5 font-mono text-[14px] text-ink transition-colors hover:text-rose"
                  >
                    {c.value}
                    {c.external && (
                      <ArrowUpRight className="h-3.5 w-3.5 text-dim transition-colors group-hover:text-rose" />
                    )}
                  </a>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal>
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" htmlFor="cf-name">
                  <Input id="cf-name" name="name" required autoComplete="name" />
                </Field>
                <Field label="Email" htmlFor="cf-email">
                  <Input
                    id="cf-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </Field>
              </div>

              <Field label="Project type">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger aria-label="Project type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Message" htmlFor="cf-message">
                <Textarea id="cf-message" name="message" required rows={4} />
              </Field>

              <div className="mt-2 flex flex-wrap items-center gap-5">
                <Button type="submit" variant="primary" size="md">
                  Send message <Send className="h-4 w-4" />
                </Button>
                <span
                  className="font-mono text-[12px] text-rose"
                  role="status"
                  aria-live="polite"
                >
                  {status}
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
