import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);

const requiredFiles = [
  "dist/index.js",
  "dist/index.d.ts",
  "docs/showcasehero-preview.png",
  "src/ShowcaseHero.tsx",
  "src/styles.css.d.ts",
  "src/styles.css",
  "src/demo/App.tsx",
  "src/demo/demo-data.ts",
  "README.md",
  "CHANGELOG.md",
  "Makefile",
  "package.json",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const readSourceFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const target = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return readSourceFiles(target);
    }

    if (/\.(ts|tsx|css)$/.test(entry.name)) {
      return fs.readFileSync(target, "utf8");
    }

    return [];
  });
};
const source = [
  ...readSourceFiles(path.join(root, "src")),
  read("README.md"),
  read("CHANGELOG.md"),
].join("\n");

const releaseText = [
  source,
  read("index.html"),
  read("CHANGELOG.md"),
  read("package-lock.json"),
  read("package.json"),
  read("tsconfig.build.json"),
  read("tsconfig.json"),
  read("vite.config.ts"),
].join("\n");

for (const text of [
  "@petesmithofficial/showcase-hero",
  "https://www.npmjs.com/package/@petesmithofficial/showcase-hero",
  "ShowcaseHero",
  "ShowcaseHeroProps",
  "ShowcaseHeroWorkbench",
  "ShowcaseHeroItem",
  "showcase-hero",
  "orbitTiles",
  "workbench",
  "items",
  "details",
  "metadata",
  "destination",
  "prefers-reduced-motion",
  "Selectable showcase items",
  "Open case study ->",
  "npm install @petesmithofficial/showcase-hero",
  "workbench.motion.maxTiltDegrees",
  "workbench.motion.touchReleaseReturn",
  "Touch release return",
  "Pointer tracking is smoothed",
  "motion: { maxTiltDegrees: 12 }",
  "## 0.2.0 - 2026-05-25",
  "No breaking changes",
  "The package owns the motion transform",
  "Consumer styles should not apply transforms",
  "--accent-electric",
]) {
  if (!source.includes(text)) {
    throw new Error(`Missing expected package contract text: ${text}`);
  }
}

if (pkg.private !== false) {
  throw new Error("Package must be public-ready, not private.");
}

if (pkg.exports?.["./styles.css"]?.default !== "./src/styles.css") {
  throw new Error("Package must expose the component stylesheet.");
}

if (pkg.exports?.["./styles.css"]?.types !== "./src/styles.css.d.ts") {
  throw new Error("Package must expose TypeScript declarations for the stylesheet export.");
}

if (pkg.publishConfig?.access !== "public") {
  throw new Error("Scoped npm package must publish with public access.");
}

if (pkg.types !== "./dist/index.d.ts") {
  throw new Error("Package must expose top-level TypeScript declarations.");
}

if (!pkg.files?.includes("docs")) {
  throw new Error("Package must include docs assets referenced by README.");
}

if (!pkg.files?.includes("CHANGELOG.md")) {
  throw new Error("Package must include release notes.");
}

const retiredPrefix = "source";
const retiredPascalPrefix = "Source";

for (const text of [
  `${retiredPascalPrefix}Hero`,
  `${retiredPrefix}hero`,
  `${retiredPrefix}-hero`,
  `@petesmithofficial/${retiredPrefix}hero`,
  "archive/main",
  "tar.gz",
  `${retiredPascalPrefix}HeroProps`,
  `${retiredPascalPrefix}HeroProject`,
  "Public project index",
  "Selectable public projects",
  "selected repo",
  "Scope</dt>",
  "Implementation</dt>",
  "constraints",
]) {
  if (releaseText.includes(text)) {
    throw new Error(`Repo-specific copy or API name found: ${text}`);
  }
}

console.log("showcase-hero verification passed.");
