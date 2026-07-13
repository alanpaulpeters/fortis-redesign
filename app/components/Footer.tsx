import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getDict, localePrefix, type Locale } from "@/content/locales";

const legalLinks = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutzerklärung", href: "/datenschutzerklaerung" },
  { name: "AGB", href: "/allgemeine-geschaftsbedingungen" },
  { name: "Widerrufsbelehrung", href: "/widerrufsbelehrung" },
];

export function Footer({ locale = "de" }: { locale?: Locale }) {
  const t = getDict(locale).footer;
  const home = localePrefix[locale] || "/";

  return (
    <footer className="border-t border-line/[0.06]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link href={home} aria-label="Fortis">
            <Logo className="h-6 w-auto" />
          </Link>
          <address className="text-sm font-light not-italic leading-relaxed text-frost/50">
            Fortis Inkasso GmbH &amp; Co. KG
            <br />
            Gehrtsstraße 16
            <br />
            40235 Düsseldorf
          </address>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-frost/90">{t.pages}</h3>
          <ul className="flex flex-col gap-3">
            {t.pageLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-light text-frost/50 transition-colors hover:text-frost"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-frost/90">{t.legal}</h3>
          <ul className="flex flex-col gap-3">
            {legalLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-light text-frost/50 transition-colors hover:text-frost"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-frost/90">{t.contact}</h3>
          <ul className="flex flex-col gap-3 text-sm font-light text-frost/50">
            <li>
              <a href="tel:+4921115856110" className="transition-colors hover:text-frost">
                +49 211 15856110
              </a>
            </li>
            <li>
              <a
                href="mailto:info@fortis-inkasso.de"
                className="transition-colors hover:text-frost"
              >
                info@fortis-inkasso.de
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/[0.06]">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="text-[13px] font-light text-frost/40">
            © {new Date().getFullYear()} Fortis Inkasso GmbH &amp; Co. KG.{" "}
            {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
