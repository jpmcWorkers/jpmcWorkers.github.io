export interface NavigationItem {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
  disabled?: boolean;
  skipMobile?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
  color?: string;
}

export const navigationConfig = {
  // Reorganized navigation to match requested structure. Existing hrefs/labels preserved where available.
  startHere: [
    {
      href: "/",
      label: "Start Here",
      description: "60-second explainer: what a union is, wins so far, how to get involved."
    }
  ],

  join: [
    {
      href: "/join-us",
      label: "Join / Get Involved",
      description: "Join form • Volunteer roles • Become a Workplace Contact • Donate • Subscribe"
    }
  ],

  events: [
    {
      href: "/news",
      label: "Events & News",
      description: "Upcoming actions & trainings • News/press releases • Recaps"
    }
  ],

  learn: [
    {
      href: "/issues-and-resources",
      label: "Learn the Issues",
      description: "Pay • Scheduling • Healthcare • Safety • Remote Work • AI/Automation",
      skipMobile: true
    }
  ],

  toolkit: [
    {
      href: "/content",
      label: "Organizer Toolkit",
      description: "Practical how-tos for talking with coworkers, mapping your workplace, meeting scripts, legal rights."
    }
  ],

  media: [
    {
      href: "/image",
      label: "Media Library",
      description: "Brand Guide • Posters • Business/Trading Cards • Booklets & Template • Social Graphics • Logos"
    },
    {
      href: "/booklet",
      label: "Booklets & Templates",
      description: "Printable booklets for organizing"
    }
  ],

  myth: [
    // If a dedicated myth-busting page doesn't exist yet, this is a placeholder href that can be created later.
    {
      href: "/myth-busting",
      label: "Myth Busting",
      description: "Single page of myths/facts with a table of contents linking to each myth header.",
      disabled: true
    }
  ],

  about: [
    {
      href: "/mission",
      label: "About Us",
      description: "Mission • Who we are • Contact & Social"
    }
  ],

  // Footer quick links (subset of primary sections)
  footer: [
    {
      href: "/mission",
      label: "About Us",
      skipMobile: true
    },
    {
      href: "/news",
      label: "Latest News",
      skipMobile: true
    },
    {
      href: "/join-us",
      label: "Join / Get Involved",
      skipMobile: true
    },
    {
      href: "/content",
      label: "Organizer Toolkit",
      skipMobile: true
    }
  ],
} satisfies Record<string, NavigationItem[]>;

// Backwards-compatible aliases for code that expects the old keys
// Keep these so existing imports/usages don't break; remove when callers are updated.
(navigationConfig as any).main = navigationConfig.startHere;
(navigationConfig as any).issues = navigationConfig.learn;
(navigationConfig as any).content = navigationConfig.toolkit;

// Helper function to get all navigation sections for sidebar
export function getSidebarNavigation(): NavigationSection[] {
  // Flattened single navigation section (no headers) — preserve requested order
  const items: NavigationItem[] = [
    ...navigationConfig.startHere,
    ...navigationConfig.join,
    ...navigationConfig.events,
    ...navigationConfig.learn,
    ...navigationConfig.toolkit,
    ...navigationConfig.media,
    ...navigationConfig.myth,
    ...navigationConfig.about,
  ];

  return [
    {
      title: "Navigation",
      items,
      color: "jpmc-blue"
    }
  ];
}

// Helper function to check if a link is active
export function isActiveLink(currentPath: string, linkHref: string): boolean {
  if (linkHref === "/") {
    return currentPath === "/";
  }
  return currentPath.startsWith(linkHref);
}
