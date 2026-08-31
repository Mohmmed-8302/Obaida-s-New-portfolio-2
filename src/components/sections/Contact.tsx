import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT } from "@/data";
import { useGSAP, prefersReducedMotion, revealOnScroll } from "@/lib/gsap";

export function Contact() {
  const [status, setStatus] = React.useState("");
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealOnScroll(root.current!);
    },
    { scope: root }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();
    const subject = encodeURIComponent("Project inquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your email client...");
  };

  const links = [
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
    <section
      id="contact"
      ref={root}
      className="section-line"
      data-clip="08 / CONTACT"
    >
      <div className="wrap grid gap-12 md:grid-cols-2 md:items-start md:gap-[72px]">
        <div>
          <h2
            data-reveal
            className="text-[clamp(2.2rem,6vw,4rem)] text-text"
          >
            Got something that needs to{" "}
            <em className="italic text-accent">move?</em>
          </h2>
          <p data-reveal className="mt-[22px] max-w-[42ch] text-dim">
            Tell me the goal and the deadline. I will tell you what is
            possible and send back a first cut fast.
          </p>

          <div data-reveal className="mt-[34px] flex flex-col">
            {links.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between border-t border-[color:var(--line)] py-[18px] font-mono text-[13px] tracking-[0.04em] text-text transition-colors hover:text-accent last:border-b last:border-[color:var(--line)]"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-dim transition-colors group-hover:text-accent">
                  {c.label}
                </span>
                <span>{c.value}</span>
              </a>
            ))}
          </div>
        </div>

        <form
          data-reveal
          onSubmit={onSubmit}
          className="flex flex-col gap-[26px]"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="cname"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
            >
              Name
            </label>
            <Input
              id="cname"
              name="name"
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="cemail"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
            >
              Email
            </label>
            <Input
              id="cemail"
              name="email"
              type="email"
              placeholder="you@studio.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="cmsg"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
            >
              Project
            </label>
            <Textarea
              id="cmsg"
              name="message"
              rows={3}
              placeholder="What are we making?"
              required
            />
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-5">
            <Button type="submit" variant="primary" size="md">
              Send the brief
            </Button>
            <span
              className="font-mono text-xs text-accent"
              role="status"
              aria-live="polite"
            >
              {status}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
