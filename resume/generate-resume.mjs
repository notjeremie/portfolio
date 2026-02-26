import { Document, Packer, Paragraph, TextRun, AlignmentType, ExternalHyperlink, LevelFormat, TabStopType, TabStopPosition, BorderStyle } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── STYLING CONSTANTS ───────────────────────────────────────────────
const FONT = "Arial";
const COLOR = "000000";
const COLOR_GRAY = "555555";
const COLOR_ACCENT = "2B5797";
const SIZE_NAME = 36;
const SIZE_TITLE = 22;
const SIZE_SECTION = 22;
const SIZE_BODY = 20;
const SIZE_SMALL = 18;

// ─── BASE RESUME DATA ───────────────────────────────────────────────
const baseData = {
  name: "JEREMIE QUENET",
  title: "",

  contact: {
    phone: "052-8908857",
    email: "jeremiequenet@me.com",
    location: "Tel-Aviv, Israel",
    website: { text: "notjeremie.dev", link: "https://notjeremie.dev" },
    linkedin: { text: "LinkedIn", link: "https://www.linkedin.com/in/notjeremie/" },
    github: { text: "GitHub", link: "https://github.com/notjeremie" },
  },

  summary: "Self-taught developer with 9+ years in broadcast media at i24NEWS. Went from Google Sheets automation to shipping 8 production applications — including a mobile app on both App Stores. Builds everything using AI-assisted workflows with Claude Code, structured context files, and prompt chaining. Strong product sense from years of operational management. Native-level English and French, fluent Hebrew.",

  skills: [
    { label: "AI & Prompt Engineering", value: "Claude Code (structured CLAUDE.md context files, prompt chaining, iterative development), LLM-assisted development workflows, RAG patterns, few-shot prompting, AI agent design" },
    { label: "Workflow Automation", value: "AI-driven development pipelines, structured context management across 200+ components, automated data extraction pipelines, CI/CD workflows" },
    { label: "Frontend", value: "React 19, React Native, TypeScript, Next.js 15, Tailwind CSS, HTML/CSS" },
    { label: "Backend & Data", value: "Supabase (PostgreSQL, PostGIS, Auth, RLS), Node.js, REST APIs, Python" },
    { label: "Mobile", value: "Expo (EAS builds), iOS & Android deployment, PWA" },
    { label: "Broadcast", value: "VizRT Suite, Blackmagic ATEM, Sony XVS-G1, Dalet Galaxy" },
    { label: "Languages", value: "French (Native), English (Fluent), Hebrew (Fluent)" },
  ],

  experience: [
    {
      company: "Independent Developer",
      location: "Tel-Aviv",
      title: "Miklat",
      dates: "2024 – Present",
      bullets: [
        "Built and shipped a mobile-first shelter finder app with 15,266 mapped locations across Israel, live on both App Store and Google Play",
        "Built the entire app using Claude Code with structured CLAUDE.md context files — managing prompts, context, and iterating on features through AI-assisted development",
        "Implemented 5-language support with full RTL (Hebrew, Arabic), Google + Apple OAuth, and community shelter verification",
        "Built a Python data pipeline that extracted shelter data from GovMap via 6,500+ API queries across 14+ municipal layers",
      ],
    },
    {
      company: "i24NEWS",
      location: "Tel-Aviv",
      title: "Technical Manager & Control Room Manager",
      dates: "2021 – Present",
      bullets: [
        "Went from operational management to building all internal tools — designing, prototyping, and shipping production applications as the sole developer",
        "Built all apps using AI-assisted development with Claude Code, using structured CLAUDE.md context files to stay consistent across 200+ components",
        "Built i24 Shifts — a bilingual shift management platform for 100+ employees with role-based access, shift auctions, vacation management, cost analytics, and 76 Playwright E2E tests",
        "Developed Studio Countdown — a real-time broadcast timer with multi-display SSE sync, Stream Deck integration, and HTTP API for automation",
        "Created i24 Daily Pics — an internal branded image generator with multi-layer canvas compositing",
        "Built i24 Studio Schedule, i24 Maps, and i24 MCR Extension — solving production bottlenecks with custom web apps",
        "Built a WhatsApp-to-Telegram bridge that automatically downloads media from journalists' chats, cutting on-air turnaround from 15 minutes (manual) to under 1 minute",
      ],
    },
    {
      company: "i24NEWS",
      location: "Tel-Aviv",
      title: "Director",
      dates: "2019 – 2021",
      bullets: [
        "Executed live technical direction for high-pressure news broadcasts",
        "Optimized Vision Mixer workflow by pre-programming effects, reducing setup time for breaking news",
      ],
    },
    {
      company: "i24NEWS",
      location: "Tel-Aviv",
      title: "Assistant Director",
      dates: "2019 – 2021",
      bullets: [
        "Managed live rundown timing and coordination between news desk and technical crew",
        "Optimized Dalet Galaxy rundown workflow for precise editorial-technical synchronization",
      ],
    },
    {
      company: "i24NEWS",
      location: "Tel-Aviv",
      title: "CG Operator",
      dates: "2017 – 2019",
      bullets: [
        "Operated Viz Trio and Viz Director for live on-air graphics; troubleshot template issues in real-time",
        "Managed real-time graphics workflow during breaking news coverage",
      ],
    },
  ],

  projects: [],

  education: [],

  military: "Givati Brigade | Combat Soldier | 2010 – 2012. Reserve service at 8149 Brigade since 2012.",
};

// ─── DEEP MERGE UTILITY ─────────────────────────────────────────────
function deepMerge(base, overrides) {
  const result = { ...base };
  for (const key of Object.keys(overrides)) {
    if (Array.isArray(overrides[key])) {
      result[key] = overrides[key]; // arrays are replaced, not merged
    } else if (overrides[key] && typeof overrides[key] === 'object' && !Array.isArray(base[key])) {
      result[key] = deepMerge(base[key] || {}, overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

// ─── LAYOUT FUNCTIONS ────────────────────────────────────────────────
function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_ACCENT } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: SIZE_SECTION, font: FONT, color: COLOR_ACCENT })]
  });
}

function bulletItem(texts, ref = "bullets") {
  const children = texts.map(t => {
    if (typeof t === 'string') return new TextRun({ text: t, size: SIZE_BODY, font: FONT });
    return new TextRun({ text: t.text, bold: t.bold, size: SIZE_BODY, font: FONT, color: t.color });
  });
  return new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { after: 30 }, children });
}

function jobHeader(company, location, title, dates) {
  return new Paragraph({
    spacing: { before: 160, after: 50 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: company, bold: true, size: SIZE_BODY, font: FONT }),
      new TextRun({ text: ` | ${location} | `, size: SIZE_BODY, font: FONT, color: COLOR_GRAY }),
      new TextRun({ text: title, bold: true, size: SIZE_BODY, font: FONT }),
      new TextRun({ text: `\t${dates}`, size: SIZE_SMALL, font: FONT, color: COLOR_GRAY })
    ]
  });
}

function bodyText(text) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text, size: SIZE_BODY, font: FONT })]
  });
}

function skillLine(label, value) {
  return new Paragraph({
    spacing: { after: 30 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: SIZE_BODY, font: FONT }),
      new TextRun({ text: value, size: SIZE_BODY, font: FONT, color: COLOR_GRAY })
    ]
  });
}

function contactLine(items) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: items.flatMap((item, i) => {
      const parts = [];
      if (i > 0) parts.push(new TextRun({ text: "   |   ", size: SIZE_SMALL, font: FONT, color: COLOR_GRAY }));
      if (item.link) {
        parts.push(new ExternalHyperlink({
          children: [new TextRun({ text: item.text, style: "Hyperlink", size: SIZE_SMALL, font: FONT })],
          link: item.link
        }));
      } else {
        parts.push(new TextRun({ text: item.text, size: SIZE_SMALL, font: FONT, color: COLOR_GRAY }));
      }
      return parts;
    })
  });
}

function techLine(tech) {
  return new Paragraph({
    spacing: { after: 40 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: "Technologies: ", bold: true, size: SIZE_SMALL, font: FONT, color: COLOR_GRAY }),
      new TextRun({ text: tech, size: SIZE_SMALL, font: FONT, color: COLOR_GRAY })
    ]
  });
}

// ─── BUILD DOCUMENT FROM DATA ────────────────────────────────────────
function buildDocument(data) {
  const children = [];

  // Header
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: data.name, bold: true, size: SIZE_NAME, font: FONT, color: COLOR })]
  }));
  if (data.title) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: data.title, size: SIZE_TITLE, font: FONT, color: COLOR_ACCENT })]
    }));
  }

  // Contact
  const c = data.contact;
  children.push(contactLine([
    { text: c.phone },
    { text: c.email, link: `mailto:${c.email}` },
    { text: c.location },
  ]));
  children.push(contactLine([
    c.website,
    c.linkedin,
    c.github,
  ]));

  // Summary
  children.push(sectionHeading("Professional Summary"));
  children.push(bodyText(data.summary));

  // Skills
  children.push(sectionHeading("Technical Skills"));
  for (const skill of data.skills) {
    children.push(skillLine(skill.label, skill.value));
  }

  // Experience
  children.push(sectionHeading("Professional Experience"));
  // Each job needs a unique bullet reference to avoid docx numbering bugs
  const bulletRefs = ["bullets", "bullets2", "bullets3", "bullets4", "bullets5"];
  data.experience.forEach((job, i) => {
    const ref = bulletRefs[i] || `bullets${i + 1}`;
    children.push(jobHeader(job.company, job.location, job.title, job.dates));
    for (const bullet of job.bullets) {
      children.push(bulletItem([{ text: bullet }], ref));
    }
    if (job.tech) {
      children.push(techLine(job.tech));
    }
  });

  // Projects (skip if empty)
  if (data.projects.length > 0) {
    children.push(sectionHeading("Technical Projects"));
    for (const proj of data.projects) {
      children.push(bulletItem([{ text: `${proj.name}: `, bold: true }, { text: proj.desc }], "bullets"));
    }
  }

  // Education (skip if empty)
  if (data.education.length > 0) {
    children.push(sectionHeading("Education"));
    for (const edu of data.education) {
      children.push(new Paragraph({
        spacing: { before: 60, after: 20 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: edu.degree, bold: true, size: SIZE_BODY, font: FONT }),
          new TextRun({ text: ` | ${edu.school}`, size: SIZE_BODY, font: FONT, color: COLOR_GRAY }),
          new TextRun({ text: `\t${edu.dates}`, size: SIZE_SMALL, font: FONT, color: COLOR_GRAY })
        ]
      }));
    }
  }

  // Military
  children.push(sectionHeading("Military Service"));
  children.push(new Paragraph({
    spacing: { before: 60, after: 20 },
    children: [
      new TextRun({ text: data.military.split(" | ")[0], bold: true, size: SIZE_BODY, font: FONT }),
      new TextRun({ text: ` | ${data.military.split(" | ").slice(1).join(" | ")}`, size: SIZE_BODY, font: FONT, color: COLOR_GRAY })
    ]
  }));

  return new Document({
    styles: {
      default: { document: { run: { font: FONT, size: SIZE_BODY } } }
    },
    numbering: {
      config: bulletRefs.map(ref => ({
        reference: ref,
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 200 } } }
        }]
      }))
    },
    sections: [{
      properties: {
        page: { margin: { top: 580, right: 780, bottom: 580, left: 780 } }
      },
      children
    }]
  });
}

// ─── CLI & PROFILE LOADING ───────────────────────────────────────────
const args = process.argv.slice(2);
let profileName = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--profile' && args[i + 1]) {
    profileName = args[i + 1];
    break;
  }
}

let data = baseData;

if (profileName) {
  const profilePath = path.join(__dirname, 'profiles', `${profileName}.mjs`);
  if (!fs.existsSync(profilePath)) {
    console.error(`Profile not found: ${profilePath}`);
    process.exit(1);
  }
  const profileModule = await import(profilePath);
  const overrides = profileModule.default;
  data = deepMerge(baseData, overrides);
  console.log(`Loaded profile: ${profileName}`);
}

const doc = buildDocument(data);
const buffer = await Packer.toBuffer(doc);

const outputName = profileName ? `resume-${profileName}.docx` : 'resume.docx';
const outputPath = path.join(__dirname, outputName);
fs.writeFileSync(outputPath, buffer);
console.log(`Resume saved to resume/${outputName}`);
