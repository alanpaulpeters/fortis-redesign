export type LegalSection = { h: string; p: string[] };

export type LegalContent = {
  impressum: LegalSection[];
  agb: LegalSection[];
  datenschutz: LegalSection[];
  widerruf: LegalSection[];
};
