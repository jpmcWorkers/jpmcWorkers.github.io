export interface ExternalNewsItem {
  url: string;
  title?: string;
  description?: string;
  publishedDate?: string;
  featured?: boolean;
}

// External news articles featuring JPMC Workers Alliance
export const externalNewsItems: ExternalNewsItem[] = [
  {
    url: "https://nonprofitquarterly.org/bank-worker-organizing-gains-ground/",
    featured: true,
    publishedDate: "2025-10-23",
    title: "Bank Worker Organizing Gains Ground",
    description:
      "NPQ reports growing union momentum in U.S. banking: Wells Fargo branch employees continue voting to join CWA, citing understaffing, pay disparities, and declining benefits. The piece also highlights JP Morgan Chase workers forming the JPMC Workers Alliance amid backlash to return-to-office mandates and rising workplace inequality.",
  },
  {
    url: "https://www.reuters.com/business/finance/jpmorgan-ceo-dimon-derides-in-office-work-pushback-demands-efficiency-2025-02-13/",
    featured: true,
    publishedDate: "2025-02-13",
    title:
      "Exclusive: JPMorgan CEO Dimon derides in-office work pushback, demands efficiency",
    description:
      "Leaked town hall audio shows Jamie Dimon dismissing a petition against 5-day RTO and urging 10% efficiency gains; Reuters notes some employees sought union advice from CWA.",
  },
  {
    url: "https://www.reuters.com/business/finance/jpmorgan-executive-calls-more-hustle-after-return-office-mandate-2025-02-24/",
    featured: true,
    publishedDate: "2025-02-24",
    title:
      "Exclusive: JPMorgan executive calls for 'more hustle' after return to office mandate",
    description:
      "Rohan Amin told 25k+ staff to show 'more hustle' days after Dimon’s remarks; report references a petition and employees exploring unionization.",
  },
  {
    url: "https://www.barrons.com/articles/jpmorgan-chase-union-ffd01326",
    featured: true,
    publishedDate: "2025-08-21",
    title:
      "A Union Push at JPMorgan Reveals Tensions Inside America’s Largest Bank",
    description:
      "Deep dive on the JPMC Workers Alliance—its goals, odds of recognition, and how five-day RTO and DEI shifts catalyzed organizing.",
  },
  {
    url: "https://www.barrons.com/articles/jpmorgan-return-to-office-battle-7206610b",
    featured: true,
    publishedDate: "2025-01-17",
    title:
      "Inside JPMorgan’s Return-to-Office Battle: A Secret Survey, Quiet Quitting, and More Microwaves",
    description:
      "Internal docs and a staff survey show broad opposition to full-time RTO; employees discuss forming a union to gain leverage on working conditions.",
  },
  {
    url: "https://www.barrons.com/articles/jpmorgan-back-to-office-mandate-union-4206af78",
    featured: false,
    publishedDate: "2025-01-12",
    title: "JPMorgan Workers Ponder Union in Wake of Return-to-Office Mandate",
    description:
      "Following the five-day RTO memo, staff reactions include early talk of unionizing and concerns about work-life impacts.",
  },
  {
    url: "https://fortune.com/2025/01/14/jpmorgan-internal-revolt-rto-mandate-wells-fargo-labor-union/",
    featured: false,
    publishedDate: "2025-01-14",
    title:
      "JPMorgan faces internal revolt over RTO mandate—now talk of a Wells Fargo-style labor union is reportedly spreading",
    description:
      "Fortune reports that RTO backlash is fueling union talk, citing Wells Fargo’s organizing as a template.",
  },
  {
    url: "https://www.msn.com/en-us/money/companies/inside-jpmorgan-employee-backlash-over-5-day-rto-mandate-gains-steam/ar-AA1xojN0",
    featured: false,
    publishedDate: "2025-01-17",
    title:
      "Inside JPMorgan, employee backlash over 5-day RTO mandate gains steam",
    description:
      "Continuing coverage of staff anger and outreach to labor groups as employees push back on the mandate.",
  },
  {
    url: "https://fortune.com/2025/02/11/jpmorgan-chase-workers-launch-petition-to-halt-5-day-back-to-office-rule/",
    featured: false,
    publishedDate: "2025-02-11",
    title:
      "JPMorgan Chase workers launch petition to halt 5-day back-to-office rule",
    description:
      "Article details the petition effort urging Dimon to retain hybrid work—part of broader organizing energy.",
  },
  {
    url: "https://fortune.com/2025/03/06/jpmorgan-chase-jamie-dimon-union-rto-wall-street/",
    featured: false,
    publishedDate: "2025-03-06",
    title:
      "As JPMorgan Chase enforces a 5-day RTO, staffers complain about too few desks, spotty Wi-Fi, and sneezing, sick coworkers",
    description:
      "On-the-ground RTO fallout that helped sustain employee discontent and union discussions.",
  },
  {
    url: "https://www.wsj.com/business/jpmorgan-chase-disables-employee-comments-after-return-to-office-backlash-19199a4a",
    featured: true,
    publishedDate: "2025-01-11",
    title:
      "JPMorgan Chase Disables Employee Comments After Return-to-Office Backlash",
    description:
      "WSJ reports the company shut down comments on the RTO announcement after critical posts—including one suggesting unionizing.",
  },
  {
    url: "https://www.businessinsider.com/jpmorgan-chase-union-drive-workers-alliance-wells-fargo-pizza-parties-2025-6",
    featured: true,
    publishedDate: "2025-06-07",
    title:
      "Can JPMorgan be unionized? Employees turn to their peers at Wells Fargo for advice.",
    description:
      "Profiles the JPMC Workers Alliance, organizer tactics (including events at Columbus/Polaris), and lessons from Wells Fargo’s effort.",
  },
  {
    url: "https://finance.yahoo.com/news/angry-jpmorgan-chase-workers-consider-153000030.html",
    featured: false,
    publishedDate: "2025-01-13",
    title:
      "JPMorgan Chase is axing remote work — and angry employees might unionize",
    description:
      "Yahoo Finance roundup on the mandate and growing union talk among staff.",
  },
  {
    url: "https://www.hrgrapevine.com/us/content/article/2025-02-14-jpmorgan-ceo-jamie-dimon-defends-mandatory-return-to-office-policy",
    featured: false,
    publishedDate: "2025-02-14",
    title:
      "'That F***ing petition'! | JPMorgan CEO Jamie Dimon defends RTO mandate amid office capacity woes",
    description:
      "HR Grapevine recaps Dimon’s remarks and the employee petition, noting continued unrest and organizing chatter.",
  },
  {
    url: "https://www.cnbc.com/2024/12/01/jpmorgan-chase-workers-union-efforts",
    publishedDate: "2024-12-01",
  },
  {
    url: "https://www.instagram.com/barrons/reel/DOOzF7XimbZ/?hl=en",
    featured: true,
    publishedDate: "2025-09-05",
    title: "Inside JPMorgan's Union Push",
    description:
      "After a seven-year build costing about $3 billion, JPMorgan Chase’s Midtown Manhattan headquarters nears completion — but some workers aren’t enthusiastic about the forced return-to-office mandate accompanying the move.",
  },
];

// Sort by date (newest first)
export const sortedExternalNews = externalNewsItems.sort((a, b) => {
  if (!a.publishedDate || !b.publishedDate) return 0;
  return (
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
});

// Get featured items
export const featuredExternalNews = sortedExternalNews.filter(
  (item) => item.featured
);
