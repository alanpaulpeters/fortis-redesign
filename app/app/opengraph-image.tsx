import { ImageResponse } from "next/og";

// Native OG-Bild für alle Routen (Next verdrahtet og:image + twitter:image automatisch)
export const runtime = "edge";
export const alt = "Fortis Inkasso – Konsequent in der Sache. Persönlich im Kontakt.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060b16",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#f4f7fb" }}>
          Fortis<span style={{ color: "#06d6a0" }}>Inkasso</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#f4f7fb", lineHeight: 1.1 }}>
            Konsequent in der Sache.
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#06d6a0", lineHeight: 1.1 }}>
            Persönlich im Kontakt.
          </div>
          <div style={{ fontSize: 30, color: "rgba(244,247,251,0.65)", marginTop: 16 }}>
            Digitales Forderungsmanagement auf Erfolgsbasis.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
