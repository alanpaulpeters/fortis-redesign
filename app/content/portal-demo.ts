// Demo-Daten für den Portal-Klickdummy — keine echten Daten, kein Backend.

export const demoUser = {
  name: "Alan Paul Peters",
  initials: "AP",
  email: "hello@alan-paul.de",
  type: "Privatperson",
  country: "Deutschland",
  role: "User",
};

export type ClaimStatus =
  | "Eingereicht"
  | "Geprüft"
  | "Geltend gemacht"
  | "Abgeschlossen"
  | "Abgewiesen";

// Paletten je Theme validiert (dataviz-Skill, 6 Checks):
// dark gegen surface #0c1526, light gegen #ffffff
export const statusColors: Record<"light" | "dark", Record<ClaimStatus, string>> = {
  dark: {
    Eingereicht: "#3987e5",
    Geprüft: "#c98500",
    "Geltend gemacht": "#9085e9",
    Abgeschlossen: "#199e70",
    Abgewiesen: "#e66767",
  },
  light: {
    Eingereicht: "#2a78d6",
    Geprüft: "#eda100",
    "Geltend gemacht": "#4a3aa7",
    Abgeschlossen: "#1baf7a",
    Abgewiesen: "#e34948",
  },
};

export type Claim = {
  id: string;
  status: ClaimStatus;
  debtor: string;
  address: string;
  amount: number;
  contact: string;
  created: string;
  document: string;
};

export const demoClaims: Claim[] = [
  {
    id: "FI-2026-000341",
    status: "Geltend gemacht",
    debtor: "Herr M. Krause",
    address: "Gethsemanestr. 1, 10437 Berlin",
    amount: 29.85,
    contact: "m.krause@example.de",
    created: "2026-01-10",
    document: "rechnung_5149_2.pdf",
  },
  {
    id: "FI-2026-000352",
    status: "Eingereicht",
    debtor: "Weber Logistik GmbH",
    address: "Hafenstr. 12, 20457 Hamburg",
    amount: 1840.0,
    contact: "buchhaltung@weber-log.de",
    created: "2026-03-02",
    document: "rechnung_2026_118.pdf",
  },
  {
    id: "FI-2026-000367",
    status: "Geprüft",
    debtor: "Frau S. Lindner",
    address: "Kirchweg 8, 50667 Köln",
    amount: 245.5,
    contact: "+49 170 5551234",
    created: "2026-03-18",
    document: "mahnung_0322.pdf",
  },
  {
    id: "FI-2026-000371",
    status: "Abgeschlossen",
    debtor: "TechnoBau AG",
    address: "Industriering 44, 70565 Stuttgart",
    amount: 12400.0,
    contact: "finanzen@technobau.de",
    created: "2026-04-05",
    document: "schlussrechnung_88.pdf",
  },
  {
    id: "FI-2026-000389",
    status: "Geprüft",
    debtor: "Herr D. Okafor",
    address: "Lindenallee 23, 40235 Düsseldorf",
    amount: 89.9,
    contact: "d.okafor@example.de",
    created: "2026-05-12",
    document: "rechnung_7731.pdf",
  },
  {
    id: "FI-2026-000401",
    status: "Abgewiesen",
    debtor: "Café Morgenrot",
    address: "Marktplatz 3, 04109 Leipzig",
    amount: 320.75,
    contact: "info@cafe-morgenrot.de",
    created: "2026-06-01",
    document: "lieferschein_445.pdf",
  },
  {
    id: "FI-2026-000415",
    status: "Eingereicht",
    debtor: "Frau K. Yilmaz",
    address: "Bergstr. 17, 80331 München",
    amount: 560.0,
    contact: "k.yilmaz@example.de",
    created: "2026-06-24",
    document: "rechnung_2026_204.pdf",
  },
  {
    id: "FI-2026-000422",
    status: "Abgeschlossen",
    debtor: "Nordwind Media UG",
    address: "Speicherlinie 2, 24937 Flensburg",
    amount: 2150.0,
    contact: "hallo@nordwind-media.de",
    created: "2026-07-03",
    document: "projekt_final_09.pdf",
  },
];

export type Notification = {
  id: number;
  title: string;
  text: string;
  time: string;
  unread: boolean;
};

export const demoNotifications: Notification[] = [
  {
    id: 1,
    title: "Zahlung eingegangen",
    text: "TechnoBau AG hat 12.400,00 € vollständig beglichen.",
    time: "vor 2 Std.",
    unread: true,
  },
  {
    id: 2,
    title: "Statusänderung",
    text: "Forderung FI-2026-000341: Mahnbescheid wurde zugestellt.",
    time: "vor 5 Std.",
    unread: true,
  },
  {
    id: 3,
    title: "Neue Nachricht",
    text: "Ihr Sachbearbeiter hat auf Ihre Anfrage geantwortet.",
    time: "gestern",
    unread: true,
  },
  {
    id: 4,
    title: "Dokument geprüft",
    text: "rechnung_2026_204.pdf wurde erfolgreich verarbeitet.",
    time: "vor 2 Tagen",
    unread: false,
  },
  {
    id: 5,
    title: "Ratenzahlung vereinbart",
    text: "Frau S. Lindner zahlt in 6 Monatsraten à 40,92 €.",
    time: "vor 4 Tagen",
    unread: false,
  },
];

export type Message = {
  from: "me" | "them";
  text: string;
  time: string;
};

export type Conversation = {
  id: number;
  name: string;
  role: string;
  initials: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

export const demoConversations: Conversation[] = [
  {
    id: 1,
    name: "Julia Brandt",
    role: "Ihre Sachbearbeiterin",
    initials: "JB",
    unread: 2,
    online: true,
    messages: [
      {
        from: "them",
        text: "Guten Tag Herr Peters, zu Ihrer Forderung FI-2026-000341 gibt es Neuigkeiten: Der Mahnbescheid wurde gestern zugestellt.",
        time: "09:14",
      },
      {
        from: "me",
        text: "Danke für die Info! Wie lange hat der Schuldner jetzt Zeit zu reagieren?",
        time: "09:31",
      },
      {
        from: "them",
        text: "Ab Zustellung läuft eine zweiwöchige Widerspruchsfrist. Reagiert der Schuldner nicht, beantragen wir direkt den Vollstreckungsbescheid.",
        time: "09:47",
      },
      {
        from: "them",
        text: "Ich melde mich, sobald sich etwas tut – Sie müssen nichts weiter unternehmen.",
        time: "09:48",
      },
    ],
  },
  {
    id: 2,
    name: "Fortis Support",
    role: "Allgemeine Anfragen",
    initials: "FS",
    unread: 1,
    online: true,
    messages: [
      {
        from: "me",
        text: "Hallo, kann ich die Musterdatei für den Bulk-Upload auch als CSV bekommen?",
        time: "Mi. 14:02",
      },
      {
        from: "them",
        text: "Hallo Herr Peters! Ja, im Bereich Forderungsbestand finden Sie ab sofort beide Formate: XLSX und CSV.",
        time: "Mi. 15:20",
      },
    ],
  },
  {
    id: 3,
    name: "Buchhaltung",
    role: "Auszahlungen",
    initials: "BH",
    unread: 0,
    online: false,
    messages: [
      {
        from: "them",
        text: "Die Auszahlung von 12.400,00 € (TechnoBau AG) wurde auf Ihr hinterlegtes Konto überwiesen. Eingang: 1–2 Werktage.",
        time: "Mo. 11:05",
      },
      { from: "me", text: "Perfekt, vielen Dank!", time: "Mo. 11:40" },
    ],
  },
];
