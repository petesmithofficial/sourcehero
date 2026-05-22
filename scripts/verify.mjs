import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);

const requiredFiles = [
  "dist/index.js",
  "dist/index.d.ts",
  "src/SourceHero.tsx",
  "src/styles.css",
  "src/demo/App.tsx",
  "src/demo/demo-data.ts",
  "README.md",
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
].join("\n");

for (const text of [
  "@petesmithofficial/source-hero",
  "SourceHero",
  "SourceHeroProps",
  "SourceHeroWorkbench",
  "SourceHeroProject",
  "source-hero",
  "orbitTiles",
  "workbench",
  "metadata",
  "destination",
  "prefers-reduced-motion",
  "Selectable public projects",
  "Open repo ->",
]) {
  if (!source.includes(text)) {
    throw new Error(`Missing expected package contract text: ${text}`);
  }
}

if (pkg.private !== false) {
  throw new Error("Package must be public-ready, not private.");
}

if (pkg.exports?.["./styles.css"] !== "./src/styles.css") {
  throw new Error("Package must expose the component stylesheet.");
}

console.log("source-hero verification passed.");
