import fs from "node:fs";
import path from "node:path";

/**
 * Read the palette straight from the generated tokens stylesheet, so the
 * press page cannot drift from the design system.
 */
export default function () {
  const file = path.join(import.meta.dirname, "../assets/css/tokens.css");
  const css = fs.readFileSync(file, "utf8");
  const colors = [];
  const re = /--sos-([a-z0-9-]+)\s*:\s*(#[0-9A-Fa-f]{6})/g;
  let match;
  while ((match = re.exec(css)) !== null) {
    const [, name, hex] = match;
    if (name.startsWith("t-") || name.startsWith("w-") || name.startsWith("h-")) continue;
    const label = name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    colors.push({ name, label, hex });
  }
  return { colors };
}
