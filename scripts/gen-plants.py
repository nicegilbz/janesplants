"""Generate a cohesive specimen photo for every plant via Gemini Imagen 4.

Reads GEMINI_KEY from the environment. Writes public/media/plants/<slug>.png
(3:4), one consistent studio look so the shop grid reads as one set.

Usage:  GEMINI_KEY=... python3 scripts/gen-plants.py [only_slug ...]
"""

import base64
import json
import os
import ssl
import sys
import time
import urllib.request

try:
    import certifi

    SSL_CTX = ssl.create_default_context(cafile=certifi.where())
except Exception:  # noqa: BLE001
    SSL_CTX = ssl.create_default_context()

KEY = os.environ.get("GEMINI_KEY", "").strip()
if not KEY:
    sys.exit("GEMINI_KEY not set")

MODEL = "imagen-4.0-generate-001"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "media", "plants")
os.makedirs(OUT, exist_ok=True)

STYLE = (
    " Single specimen plant, centered, in a simple hand-thrown matte stoneware "
    "pot, dramatic studio rim light, soft volumetric backlight, near-black "
    "background, fine mist, dew on the leaves, shot on Arri Alexa, 85mm, shallow "
    "depth of field, deep forest-green and aged-brass palette, photoreal, premium "
    "editorial product photography, no people, no text, no hands."
)

# slug -> visual descriptor
PLANTS = {
    "monstera-deliciosa": "A large glossy Monstera deliciosa with dramatic split, fenestrated leaves.",
    "bird-of-paradise": "A tall Strelitzia nicolai bird of paradise with broad architectural paddle-shaped leaves.",
    "fiddle-leaf-fig": "A Ficus lyrata fiddle leaf fig, upright tree form with large glossy violin-shaped leaves.",
    "pink-princess-philodendron": "A Philodendron Pink Princess with dark chocolate-green leaves splashed with bright bubblegum-pink variegation.",
    "calathea-orbifolia": "A Calathea orbifolia with large round leaves striped in silver and green.",
    "string-of-pearls": "A Senecio string of pearls in a raised pot, long strands of small round green beads cascading over the edge.",
    "zz-plant": "A Zamioculcas ZZ plant with upright stems of glossy waxy dark-green oval leaves.",
    "snake-plant": "A Sansevieria snake plant with tall upright sword-like leaves edged in yellow.",
    "alocasia-zebrina": "An Alocasia zebrina with arrow-shaped leaves held up on striking zebra-striped stems.",
    "marble-queen-pothos": "A marble queen pothos with heart-shaped cream-and-green marbled leaves trailing over the pot.",
    "rubber-plant": "A Ficus elastica rubber plant with large glossy deep burgundy-green leaves.",
    "hoya-kerrii": "A Hoya kerrii, a single plump heart-shaped succulent leaf in a small pot.",
}


def generate(slug, desc):
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{MODEL}:predict?key={KEY}"
    )
    body = {
        "instances": [{"prompt": desc + STYLE}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "3:4",
            "personGeneration": "dont_allow",
        },
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120, context=SSL_CTX) as resp:
        data = json.loads(resp.read())
    preds = data.get("predictions") or []
    if not preds:
        raise RuntimeError(f"no predictions: {json.dumps(data)[:160]}")
    b64 = preds[0].get("bytesBase64Encoded") or preds[0].get("image", {}).get(
        "imageBytes"
    )
    path = os.path.join(OUT, f"{slug}.png")
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    return path, os.path.getsize(path)


def main():
    only = set(sys.argv[1:])
    for slug, desc in PLANTS.items():
        if only and slug not in only:
            continue
        for attempt in range(1, 4):
            try:
                path, size = generate(slug, desc)
                print(f"OK  {slug:30} -> {size//1024} KB")
                break
            except Exception as exc:  # noqa: BLE001
                msg = str(exc)
                if hasattr(exc, "read"):
                    try:
                        msg = exc.read().decode()[:200]
                    except Exception:
                        pass
                print(f"  attempt {attempt} {slug}: {msg[:160]}")
                time.sleep(4)
        else:
            print(f"FAIL {slug}")


if __name__ == "__main__":
    main()
