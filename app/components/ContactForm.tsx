"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";

const inputClass =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[15px] text-frost placeholder:text-frost/35 focus:border-mint/60 focus:outline-none";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      String(data.get("subject") || t("subjectDefault"))
    );
    const body = encodeURIComponent(
      `${t("bodyName")}: ${data.get("name")}\n${t("bodyEmail")}: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:info@fortis-inkasso.de?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder={t("name")}
          aria-label={t("name")}
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          placeholder={t("email")}
          aria-label={t("email")}
          className={inputClass}
        />
      </div>
      <input
        name="subject"
        required
        placeholder={t("subject")}
        aria-label={t("subject")}
        className={inputClass}
      />
      <textarea
        name="message"
        required
        rows={6}
        placeholder={t("message")}
        aria-label={t("message")}
        className={inputClass}
      />
      <label className="flex items-start gap-3 text-[13px] font-light text-frost/55">
        <input type="checkbox" required className="mt-0.5 accent-mint" />
        <span>
          {t.rich("consent", {
            link: (chunks) => (
              <Link
                href="/datenschutzerklaerung"
                className="text-mint underline-offset-4 hover:underline"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-mint px-8 py-3.5 text-[15px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
      >
        {t("submit")} <PaperPlaneTilt size={17} weight="bold" />
      </button>
      {sent && (
        <p className="text-[14px] text-mint" role="status">
          {t("sentNote")}
        </p>
      )}
    </form>
  );
}
