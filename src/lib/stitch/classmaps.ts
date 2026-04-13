import { type FooterIdentity, type NavIdentity } from "@/lib/stitch/contracts";

type NavSkin = {
  shell: string;
  inner: string;
  logo: string;
  links: string;
  activeLink: string;
  idleLink: string;
  cta: string;
};

type FooterSkin = {
  shell: string;
  grid: string;
  brand: string;
  heading: string;
  body: string;
  copy: string;
  divider: string;
  iconBox: string;
};

const navSkinRegistry: Record<NavIdentity, NavSkin> = {
  architectural: {
    shell: "fixed top-0 w-full z-50 bg-stone-100/90 backdrop-blur-xl border-b border-stone-200",
    inner: "flex justify-between items-center w-full px-4 sm:px-6 md:px-12 py-3 max-w-[1920px] mx-auto",
    logo: "text-2xl font-black tracking-tighter text-stone-900",
    links: "hidden md:flex items-center gap-10",
    activeLink:
      "font-headline font-bold tracking-tight text-sm uppercase text-stone-900 border-b-2 border-stone-900 pb-1",
    idleLink:
      "font-headline font-bold tracking-tight text-sm uppercase text-stone-500 hover:text-stone-900 transition-colors duration-300",
    cta: "bg-stone-800 text-stone-50 px-8 py-3 text-sm font-bold tracking-tight uppercase hover:bg-stone-700 transition-all duration-300 active:scale-95",
  },
  systems: {
    shell: "fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/10 bg-surface/80 backdrop-blur-md px-6 md:px-20 py-2.5",
    inner: "max-w-[1440px] mx-auto flex items-center justify-between",
    logo: "text-on-surface text-xl font-bold tracking-tight",
    links: "hidden md:flex items-center gap-12",
    activeLink: "text-on-surface text-sm font-bold border-b border-primary",
    idleLink: "text-on-surface/80 text-sm font-medium hover:text-primary transition-colors",
    cta: "bg-primary text-on-primary px-6 py-2.5 text-sm font-bold tracking-wide rounded-sm hover:bg-primary-dim transition-all",
  },
  inquiry: {
    shell: "fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md",
    inner: "flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3",
    logo: "text-2xl font-black tracking-tighter text-stone-900",
    links: "hidden md:flex items-center space-x-12",
    activeLink:
      "font-headline uppercase tracking-widest text-[11px] font-bold text-stone-900 border-b-2 border-stone-900 pb-1",
    idleLink:
      "font-headline uppercase tracking-widest text-[11px] font-bold text-stone-500 hover:text-stone-900 transition-colors",
    cta: "font-headline uppercase tracking-widest text-[11px] font-bold px-6 py-2 bg-stone-900 text-white hover:opacity-80 transition-all duration-300 active:scale-[0.99]",
  },
};

const footerSkinRegistry: Record<FooterIdentity, FooterSkin> = {
  "dark-grid": {
    shell: "bg-stone-950 w-full rounded-none border-t border-stone-800/50",
    grid: "grid grid-cols-1 md:grid-cols-4 gap-12 px-5 sm:px-8 md:px-12 py-20 w-full max-w-[1920px] mx-auto",
    brand: "text-xl font-bold tracking-widest text-white uppercase",
    heading: "text-stone-50 font-bold uppercase text-xs tracking-widest",
    body: "font-body text-sm leading-relaxed tracking-wide text-stone-500",
    copy: "font-body text-xs tracking-wide text-stone-600",
    divider: "px-5 sm:px-8 md:px-12 py-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4",
    iconBox: "w-10 h-10 border border-stone-800 flex items-center justify-center hover:bg-stone-50 hover:text-stone-950 transition-all text-stone-500",
  },
  "light-grid": {
    shell: "w-full border-t border-stone-200 bg-stone-100",
    grid: "grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-20",
    brand: "font-headline font-bold text-lg tracking-tighter text-stone-900 uppercase",
    heading: "font-headline uppercase tracking-widest text-[11px] font-bold text-stone-900",
    body: "font-body text-sm leading-relaxed text-stone-500",
    copy: "font-body text-[10px] leading-relaxed text-stone-400",
    divider: "max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-8 border-t border-stone-200/50",
    iconBox: "w-8 h-8 flex items-center justify-center border border-stone-300 hover:border-stone-900 transition-colors text-stone-500",
  },
  "minimal-bar": {
    shell: "bg-surface py-12 px-6 md:px-20 border-t border-outline-variant/10",
    grid: "max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8",
    brand: "text-on-surface text-sm font-bold tracking-tight",
    heading: "",
    body: "",
    copy: "text-xs text-on-surface-variant font-medium",
    divider: "",
    iconBox: "",
  },
};

export function pullNavSkin(identity: NavIdentity) {
  return navSkinRegistry[identity];
}

export function pullFooterSkin(identity: FooterIdentity) {
  return footerSkinRegistry[identity];
}
