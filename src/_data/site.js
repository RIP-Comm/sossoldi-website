/**
 * Site-wide constants. Everything that is a fact about the project lives here
 * or in the snapshots, never inline in a template.
 */
export default {
  url: process.env.SITE_URL || "https://sossoldi.com",
  name: "Sossoldi",
  repo: "https://github.com/RIP-Comm/sossoldi",
  org: "https://github.com/RIP-Comm",
  license: {
    id: "MIT",
    url: "https://github.com/RIP-Comm/sossoldi/blob/main/LICENSE",
  },
  links: {
    githubRepo: "https://github.com/RIP-Comm/sossoldi",
    githubIssues: "https://github.com/RIP-Comm/sossoldi/issues",
    githubDiscussions: "https://github.com/RIP-Comm/sossoldi/discussions",
    githubContributing:
      "https://github.com/RIP-Comm/sossoldi/blob/main/docs/contributing/PR-guide.md",
    discord: "https://discord.sossoldi.com",
    linkedin: "https://www.linkedin.com/company/sossoldi",
    fDroid: "https://f-droid.org/en/packages/com.ripster.sossoldi/",
    editDocsBase: "https://github.com/RIP-Comm/sossoldi-website/edit/main/src",
  },
  stores: {
    ios: "https://ios.sossoldi.com",
    android: "https://android.sossoldi.com",
    fDroid: "https://f-droid.org/en/packages/com.ripster.sossoldi/",
  },
  // Verified on the storefronts at the time of writing; the UI shows these as
  // plain text, never as a rating widget.
  appStoreId: "6477743066",
  androidPackage: "com.ripster.sossoldi",
  contacts: {
    press: "help.sossoldi@gmail.com",
    privacy: "help.sossoldi@gmail.com",
  },
  seo: {
    defaultDescription:
      "Sossoldi is a free, open source wealth management and net worth tracking app. Your data stays on your device.",
  },
  analytics: {
    // Cloudflare Web Analytics token is injected at deploy time (P8).
    cloudflareToken: process.env.CF_ANALYTICS_TOKEN || "",
  },
};
