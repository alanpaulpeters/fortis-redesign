import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Seiten",
    links: [
      { name: "Inkassobeauftragung", href: "/inkassobeauftragung" },
      { name: "Mahnbescheid", href: "/mahnbescheid" },
      { name: "Auslandsinkasso", href: "/auslandsinkasso" },
      { name: "Schuldner", href: "/schuldner" },
      { name: "Blog", href: "/blog" },
      { name: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { name: "Impressum", href: "/impressum" },
      { name: "Datenschutzerklärung", href: "/datenschutzerklaerung" },
      { name: "AGB", href: "/allgemeine-geschaftsbedingungen" },
      { name: "Widerrufsbelehrung", href: "/widerrufsbelehrung" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label="Fortis Startseite">
            <Image
              src="/media/logo-white.png"
              alt="Fortis"
              width={100}
              height={28}
              className="h-6 w-auto"
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
        ))}

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-frost/90">Kontakt</h3>
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
            © {new Date().getFullYear()} Fortis Inkasso GmbH &amp; Co. KG. Alle
            Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
