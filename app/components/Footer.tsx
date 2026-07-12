import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  const columns = [
    {
      title: t("colSeiten"),
      links: [
        { name: t("linkInkasso"), href: "/inkassobeauftragung" },
        { name: t("linkMahn"), href: "/mahnbescheid" },
        { name: t("linkAusland"), href: "/auslandsinkasso" },
        { name: t("linkSchuldner"), href: "/schuldner" },
        { name: t("linkKontakt"), href: "/kontakt" },
      ],
    },
    {
      title: t("colRechtliches"),
      links: [
        { name: t("legalImpressum"), href: "/impressum" },
        { name: t("legalDatenschutz"), href: "/datenschutzerklaerung" },
        { name: t("legalAgb"), href: "/allgemeine-geschaftsbedingungen" },
        { name: t("legalWiderruf"), href: "/widerrufsbelehrung" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label="Fortis">
            <Image
              src="/media/logo-white.png"
              alt="Fortis"
              width={126}
              height={36}
              className="h-8 w-auto"
            />
          </Link>
          <address className="text-sm font-light not-italic leading-relaxed text-frost/50">
            Fortis Inkasso GmbH &amp; Co. KG
            <br />
            Gehrtsstraße 16
            <br />
            40235 Düsseldorf
          </address>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-frost/90">{column.title}</h3>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-frost/50 transition-colors hover:text-frost"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-frost/90">{t("colKontakt")}</h3>
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

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="text-[13px] font-light text-frost/40">
            © {new Date().getFullYear()} Fortis Inkasso GmbH &amp; Co. KG.{" "}
            {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
