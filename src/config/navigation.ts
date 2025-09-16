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
  // Main navigation items (used in sidebar and mobile menu)
  main: [
    {
      href: "/",
      label: "Home",
      description: "Welcome to JPMC Workers Alliance"
    },
    {
      href: "/news",
      label: "News & Announcements",
      description: "Latest updates and organizing news"
    },
    {
      href: "/mission",
      label: "Our Mission",
      description: "Learn about our goals and values"
    },
    {
      href: "/join-us",
      label: "Join the Alliance",
      description: "Get involved in our organizing efforts"
    }
  ],

  // Issues & Resources section
  issues: [
    {
      href: "/issues-and-resources",
      label: "Issues & Resources",
      description: "Workplace issues and helpful resources",
      skipMobile: true
    }
  ],

  // Content section
  content: [
    {
      href: "/content",
      label: "Guides & Resources",
      description: "Educational materials and guides"
    },
    {
      href: "/image",
      label: "Images & Materials",
      description: "Visual resources and materials"
    },
    {
      href: "/booklet",
      label: "Booklets",
      description: "Printable booklets for organizing"
    }
    // Commented out bingo card generator
    // {
    //   href: "/bingo",
    //   label: "Bingo Card Generator",
    //   description: "Generate bingo cards for events"
    // }
  ],

  // Footer quick links (subset of main navigation)
  footer: [
    {
      href: "/mission",
      label: "Our Mission",
      skipMobile: true
    },
    {
      href: "/news",
      label: "Latest News",
      skipMobile: true
    },
    {
      href: "/join-us",
      label: "Join the Alliance",
      skipMobile: true
    },
    {
      href: "/content",
      label: "Content",
      skipMobile: true
    }
  ],
} satisfies Record<string, NavigationItem[]>;

// Helper function to get all navigation sections for sidebar
export function getSidebarNavigation(): NavigationSection[] {
  return [
    {
      title: "Main",
      items: navigationConfig.main,
      color: "jpmc-blue"
    },
    {
      title: "Issues & Resources",
      items: navigationConfig.issues,
      color: "jpmc-gold"
    },
    {
      title: "Content",
      items: navigationConfig.content,
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
