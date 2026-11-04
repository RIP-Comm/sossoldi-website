#!/usr/bin/env python3
"""Optimise the raster assets the pages actually load.

Screenshots and blog covers are re-encoded as WebP; the PNG/JPG originals stay
in place as the full-resolution originals. Idempotent: skips files whose
WebP is newer than the source.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"


def convert(source: Path, target: Path, width: int, quality: int = 82):
    if target.exists() and target.stat().st_mtime > source.stat().st_mtime:
        return target
    with Image.open(source) as image:
        image = image.convert("RGB") if target.suffix == ".webp" else image
        if image.width > width:
            height = round(image.height * width / image.width)
            image = image.resize((width, height), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=quality, method=6)
    return target


if __name__ == "__main__":
    for index in range(1, 6):
        src = ASSETS / "img" / "screens" / f"0{index}.png"
        print(convert(src, src.with_suffix(".webp"), 671))
    for name in ("etf-slop", "launching-sossoldi"):
        src = ASSETS / "img" / "blog" / f"{name}.jpg"
        print(convert(src, src.with_suffix(".webp"), 1200))
