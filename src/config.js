const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const SITE = {
  name: "Laish Glenberg",
  location: "Tempe, Arizona",
  github: "https://github.com/LaishGlenberg",
  linkedin: "https://www.linkedin.com/in/laish-glenberg/",
  portrait: asset("assets/images/profile-placeholder.JPG"),
};

export const HERO = {
  lines: ["Laish", "Glenberg"],
  support: "Developer tools, MCP servers and web experiments.",
  action: { label: "See the work", href: "#work" },
};

export const SELECTED_WORK = [
  {
    name: "exa-cli",
    kind: "TypeScript CLI",
    description: "Web search for agents, from the terminal.",
    href: "https://github.com/LaishGlenberg/exa-cli",
    image: asset("assets/images/work/exa-cli.png"),
    note:
      "Wraps the Exa MCP server so search, fetch and deep search run from one command, without leaving the shell.",
    stack: ["TypeScript", "MCP", "Node"],
  },
  {
    name: "pi-command-cli",
    kind: "TypeScript CLI",
    description: "Saved startup profiles for pi, without the typing.",
    href: "https://github.com/LaishGlenberg/pi-command-cli",
    image: asset("assets/images/work/pi-command-cli.png"),
    note:
      "Saves startup flags and prompts as named profiles, so a session starts with one short command instead of a long one.",
    stack: ["TypeScript", "Node", "CLI"],
  },
  {
    name: "firebase-emulator-mcp",
    kind: "Node MCP server",
    description: "Firebase emulators as tools for AI agents.",
    href: "https://github.com/LaishGlenberg/firebase-emulator-mcp",
    image: asset("assets/images/work/firebase-emulator-mcp.png"),
    note:
      "Starts the Firebase emulator suite and exposes each emulator as a tool an agent can call while it works.",
    stack: ["TypeScript", "MCP", "Firebase"],
  },
  {
    name: "find-open-seats-python",
    kind: "Python",
    description: "Watches ASU class seats and sends a notification when one opens.",
    href: "https://github.com/LaishGlenberg/find-open-seats-python",
    image: asset("assets/images/work/find-open-seats-python.png"),
    note:
      "Polls ASU class sections every ten minutes and sends a notification the moment a seat frees up.",
    stack: ["Python", "REST API", "Notifications"],
  },
  {
    name: "termai",
    kind: "TypeScript TUI",
    description: "Keeps command output in context for in-terminal agents.",
    href: "https://github.com/LaishGlenberg/termai",
    image: asset("assets/images/work/termai.png"),
    note:
      "Keeps recent command output in a context window, so an agent working in the terminal can read what just happened.",
    stack: ["TypeScript", "TUI", "Node"],
  },
];

export const ABOUT = {
  highlights: [
    "Arizona State University",
    "fullstack web development",
    "AI engineering",
    "CLIs, MCP servers and npm packages",
    "genuinely useful",
  ],
};

export const FOOTER = {
  note: "Open to interesting problems and good tools.",
  links: [
    { label: "GitHub", href: SITE.github },
    { label: "LinkedIn", href: SITE.linkedin },
  ],
};
