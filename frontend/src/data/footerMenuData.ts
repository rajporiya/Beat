export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About BeatMusic", href: "/about" },
      { label: "Jobs", href: "/info/jobs" },
      { label: "For the Record", href: "/info/newsroom" },
    ],
  },
  {
    title: "Communities",
    links: [
      { label: "For Artists", href: "/info/for-artists" },
      { label: "For Creators", href: "/info/for-creators" },
      { label: "For Podcasters", href: "/info/for-podcasters" },
      { label: "For Developers", href: "/info/for-developers" },
      { label: "Advertising", href: "/info/advertising" },
      { label: "Investors", href: "/info/investors" },
      { label: "Vendors", href: "/info/vendors" },
    ],
  },
  {
    title: "Useful links",
    links: [
      { label: "Support", href: "/info/support" },
      { label: "Free Mobile App", href: "/info/download" },
      { label: "Popular by Country", href: "/info/charts" },
      { label: "Top Song Lyrics", href: "/info/lyrics" },
      { label: "Import your music", href: "/info/import" },
    ],
  },
  {
    title: "BeatMusic Plans",
    links: [
      { label: "Premium Standard", href: "/info/premium" },
      { label: "Premium Platinum", href: "/info/premium-platinum" },
      { label: "Premium Student", href: "/info/premium-student" },
      { label: "BeatMusic Free", href: "/info/free" },
    ],
  },
];

export const BOTTOM_LINKS: FooterLink[] = [
  { label: "Legal", href: "/info/legal" },
  { label: "Safety & Privacy Center", href: "/info/safety" },
  { label: "Menu", href: "/menu" },
  { label: "Privacy Policy", href: "/info/privacy" },
  { label: "Cookies", href: "/info/cookies" },
  { label: "About Ads", href: "/info/ads" },
  { label: "Accessibility", href: "/info/accessibility" },
];
