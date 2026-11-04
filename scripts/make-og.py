#!/usr/bin/env python3
"""Generate the static OpenGraph images (1200×630) with PIL.

    python3 scripts/make-og.py

One image per section and language, plus one per blog post. No runtime
generation: the files are committed and served as plain PNGs.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "og"
FONT_DIR = ROOT.parent / "sossoldi-social-kit" / "design" / "fonts"

INK = (0, 21, 45)
PAPER = (241, 245, 249)
MUTED = (125, 161, 196)
RULE = (201, 214, 228)

W, H = 1200, 630
MARGIN = 80

PAGES = [
    ("home-en", "Your money, in one place.", "Free · open source · local-first"),
    ("home-it", "I tuoi soldi, in un posto solo.", "Gratis · open source · local-first"),
    ("docs-en", "Documentation", "Setup, contributing, roadmap"),
    ("docs-it", "Documentazione", "Setup, contribuire, roadmap"),
    ("changelog-en", "Changelog", "Every release, from GitHub"),
    ("changelog-it", "Changelog", "Ogni release, da GitHub"),
    ("blog-en", "Blog", "Notes from the people building Sossoldi"),
    ("blog-it", "Blog", "Appunti di chi costruisce Sossoldi"),
    (
        "post-etf-slop-en",
        "Will 2026 be the year of ETF slop?",
        "Marco Perugini · Personal finance",
    ),
    (
        "post-etf-slop-it",
        "Il 2026 sarà l'anno degli ETF slop?",
        "Marco Perugini · Finanza personale",
    ),
    (
        "post-launching-sossoldi-en",
        "Launching an open source app",
        "Marco Perugini · Open source",
    ),
    (
        "post-launching-sossoldi-it",
        "Lanciare un'app open source",
        "Marco Perugini · Open source",
    ),
]


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / name), size)


def wrap(draw: ImageDraw.ImageDraw, text: str, face, max_width: int):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=face) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def render(slug: str, title: str, eyebrow: str):
    image = Image.new("RGB", (W, H), INK)
    draw = ImageDraw.Draw(image)

    # A single 1px rule, per the design system: no shadows, no gradients.
    draw.line([(MARGIN, H - 96), (W - MARGIN, H - 96)], fill=(70, 96, 126), width=1)

    label = font("NunitoSans-Bold.ttf", 20)
    spaced = " ".join("SOSSOLDI")
    draw.text((MARGIN, 72), spaced, font=label, fill=MUTED)

    title_face = font("NunitoSans-Black.ttf", 68 if len(title) < 30 else 58)
    lines = wrap(draw, title, title_face, W - 2 * MARGIN)
    y = 150
    for line in lines[:4]:
        draw.text((MARGIN, y), line, font=title_face, fill=PAPER)
        y += title_face.size + 10

    sub = font("NunitoSans-Medium.ttf", 26)
    draw.text((MARGIN, H - 74), eyebrow, font=sub, fill=MUTED)

    right = font("NunitoSans-Bold.ttf", 20)
    tag = "sossoldi.com"
    draw.text((W - MARGIN - draw.textlength(tag, font=right), H - 70), tag, font=right, fill=PAPER)

    # Small app icon, top-right, as a mark rather than decoration.
    icon = Image.open(ROOT / "src/assets/img/sossoldi-icon.png").convert("RGBA").resize((56, 56))
    image.paste(icon, (W - MARGIN - 56, 64), icon)

    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / f"{slug}.png"
    image.save(target, optimize=True)
    return target


if __name__ == "__main__":
    for slug, title, eyebrow in PAGES:
        print(render(slug, title, eyebrow).relative_to(ROOT))
