export type StitchSignature =
  | "architectural-home"
  | "about-refined-grey-mastery"
  | "about-our-vision"
  | "case-studies-proven-scale"
  | "contact-strategy-brief";

export type NavIdentity = "architectural" | "systems" | "inquiry";
export type NavTarget = "projects" | "services" | "about" | "solutions" | "case-studies" | "certification";

export type FooterIdentity = "dark-grid" | "light-grid" | "minimal-bar";

export type NavItem = {
  id: NavTarget;
  label: string;
  to: string;
};

export type FooterLinkGroup = {
  heading: string;
  links: { label: string; to: string }[];
};

export type FooterContract = {
  identity: FooterIdentity;
  brand: string;
  description: string;
  groups: FooterLinkGroup[];
  copy: string;
};

export type StitchContract = {
  signature: StitchSignature;
  route: string;
  nav: {
    identity: NavIdentity;
    active: NavTarget | null;
    ctaLabel: string;
    ctaTo: string;
  };
  footer: FooterContract;
};

const architecturalNav: NavItem[] = [
  { id: "services", label: "Services", to: "/services" },
];

const systemsNav: NavItem[] = [
  { id: "solutions", label: "Solutions", to: "/solutions" },
  { id: "case-studies", label: "Case Studies", to: "/case-studies" },
  { id: "certification", label: "Certification", to: "/certification" },
];

const inquiryNav: NavItem[] = [
  { id: "services", label: "Services", to: "/services" },
];

const darkGridFooter: FooterContract = {
  identity: "dark-grid",
  brand: "RASA",
  description:
    "Architectural rigor meets hospitality soul. Defining the physical and operational landscape of modern dining.",
  groups: [
    {
      heading: "Global Offices",
      links: [
        { label: "Stockholm, SE", to: "#" },
        { label: "Brooklyn, NY", to: "#" },
        { label: "Tokyo, JP", to: "#" },
      ],
    },
    {
      heading: "Navigation",
      links: [
        { label: "Sustainability", to: "#" },
        { label: "Career", to: "#" },
        { label: "Legal", to: "#" },
        { label: "Contact", to: "/contact/strategy-brief" },
      ],
    },
    {
      heading: "Insights",
      links: [
        { label: "Subscribe to our quarterly journal on spatial psychology.", to: "#" },
      ],
    },
  ],
  copy: "© 2026 RASA. The Architectural Standard.",
};

const lightGridFooter: FooterContract = {
  identity: "light-grid",
  brand: "RASA",
  description:
    "Precision operations consultancy for the modern hospitality landscape.",
  groups: [
    {
      heading: "Inquiries",
      links: [
        { label: "Global Offices", to: "#" },
        { label: "Newsletter Signup", to: "#" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", to: "#" },
        { label: "Terms of Service", to: "#" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "Share", to: "#" },
        { label: "Language", to: "#" },
      ],
    },
  ],
  copy: "© 2026 RASA Operations Consultancy. All rights reserved.",
};

const minimalBarFooter: FooterContract = {
  identity: "minimal-bar",
  brand: "RASA ENGINEERING",
  description: "",
  groups: [],
  copy: "© 2026 RASA Systems. All Rights Reserved. Engineered Excellence.",
};

export const navSets: Record<NavIdentity, NavItem[]> = {
  architectural: architecturalNav,
  systems: systemsNav,
  inquiry: inquiryNav,
};

export const stitchContracts: Record<StitchSignature, StitchContract> = {
  "architectural-home": {
    signature: "architectural-home",
    route: "/",
    nav: {
      identity: "architectural",
      active: "services",
      ctaLabel: "Get Started",
      ctaTo: "/contact/strategy-brief",
    },
    footer: darkGridFooter,
  },
  "about-refined-grey-mastery": {
    signature: "about-refined-grey-mastery",
    route: "/about/refined-grey-mastery",
    nav: {
      identity: "architectural",
      active: "about",
      ctaLabel: "Get Started",
      ctaTo: "/contact/strategy-brief",
    },
    footer: minimalBarFooter,
  },
  "about-our-vision": {
    signature: "about-our-vision",
    route: "/about/our-vision",
    nav: {
      identity: "architectural",
      active: "about",
      ctaLabel: "Get Started",
      ctaTo: "/contact/strategy-brief",
    },
    footer: lightGridFooter,
  },
  "case-studies-proven-scale": {
    signature: "case-studies-proven-scale",
    route: "/case-studies/proven-scale",
    nav: {
      identity: "architectural",
      active: "services",
      ctaLabel: "Get Started",
      ctaTo: "/contact/strategy-brief",
    },
    footer: lightGridFooter,
  },
  "contact-strategy-brief": {
    signature: "contact-strategy-brief",
    route: "/contact/strategy-brief",
    nav: {
      identity: "architectural",
      active: "services",
      ctaLabel: "Get Started",
      ctaTo: "/contact/strategy-brief",
    },
    footer: lightGridFooter,
  },
};

const routeLenses: Array<{ match: RegExp; signature: StitchSignature }> = [
  { match: /^\/about\/refined-grey-mastery/, signature: "about-refined-grey-mastery" },
  { match: /^\/about\/our-vision/, signature: "about-our-vision" },
  { match: /^\/case-studies\/proven-scale/, signature: "case-studies-proven-scale" },
  { match: /^\/contact\/strategy-brief/, signature: "contact-strategy-brief" },
  { match: /^\/$/, signature: "architectural-home" },
];

export function resolveStitchSignature(pathname: string): StitchSignature {
  return routeLenses.find((lens) => lens.match.test(pathname))?.signature ?? "architectural-home";
}

export function resolveStitchContract(pathname: string) {
  return stitchContracts[resolveStitchSignature(pathname)];
}
