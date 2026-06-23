"""Generate cinematic still imagery for Jane's Plants via the Gemini Imagen API.

Reads the API key from the GEMINI_KEY environment variable (never hard-coded or
committed). Saves PNGs into public/media/. Re-run to regenerate.

Usage:  GEMINI_KEY=... python3 scripts/gen-media.py [only_id ...]
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
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "media")
os.makedirs(OUT, exist_ok=True)

STYLE = (
    "cinematic, shot on Arri Alexa, 85mm macro, shallow depth of field, "
    "volumetric backlight, soft mist and haze, dew droplets, deep forest-green "
    "and brass palette, ultra-detailed, photoreal, no text, no people, premium "
    "editorial"
)

JOBS = [
    {
        "id": "hero",
        "ar": "16:9",
        "prompt": (
            "Wide cinematic shot deep inside a dark humid glasshouse at golden "
            "hour. A giant Monstera deliciosa with dramatic split leaves is "
            "backlit by shafts of light cutting through drifting mist. Layers of "
            "lush foliage recede into near-black shadow. "
        ),
    },
    {
        "id": "monstera",
        "ar": "3:4",
        "prompt": (
            "A single magnificent Monstera deliciosa specimen plant in a "
            "hand-thrown stoneware pot, dramatic studio rim light, near-black "
            "background, glossy fenestrated leaves catching the light. "
        ),
    },
    {
        "id": "bird-of-paradise",
        "ar": "3:4",
        "prompt": (
            "A tall Strelitzia nicolai bird of paradise plant with broad paddle "
            "leaves, sculptural and architectural, dramatic side light, "
            "near-black background. "
        ),
    },
    {
        "id": "calathea",
        "ar": "3:4",
        "prompt": (
            "A Calathea orbifolia houseplant with large round silver-striped "
            "leaves, soft backlight revealing the leaf veins, near-black "
            "background, painterly. "
        ),
    },
    {
        "id": "glasshouse-day",
        "ar": "16:9",
        "prompt": (
            "Interior of a beautiful independent houseplant shop inside a "
            "Victorian glasshouse, soft bright morning daylight through misted "
            "glass, lush layered indoor plants, terracotta and stoneware pots, "
            "cream and green, airy and inviting. "
        ),
    },
    {
        "id": "glasshouse-night",
        "ar": "16:9",
        "prompt": (
            "Interior of the same Victorian glasshouse plant shop after dark, "
            "plants glowing under warm horticultural grow lights, moody and "
            "atmospheric, faint magenta and cyan light, mist in the air. "
        ),
    },
    {
        "id": "leaf-macro",
        "ar": "16:9",
        "prompt": (
            "Extreme macro photograph of a single Monstera leaf, a water droplet "
            "running along a glowing chartreuse-green vein, deep shadow, "
            "near-black background, jewel-like. "
        ),
    },
]


def generate(job):
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{MODEL}:predict?key={KEY}"
    )
    body = {
        "instances": [{"prompt": job["prompt"] + STYLE}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": job["ar"],
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
        raise RuntimeError(f"no predictions: {json.dumps(data)[:200]}")
    b64 = preds[0].get("bytesBase64Encoded") or preds[0].get("image", {}).get(
        "imageBytes"
    )
    if not b64:
        raise RuntimeError(f"no image bytes: {list(preds[0].keys())}")
    path = os.path.join(OUT, f"{job['id']}.png")
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    return path, os.path.getsize(path)


def main():
    only = set(sys.argv[1:])
    for job in JOBS:
        if only and job["id"] not in only:
            continue
        for attempt in range(1, 4):
            try:
                path, size = generate(job)
                print(f"OK  {job['id']:18} {job['ar']:5} -> {path}  ({size//1024} KB)")
                break
            except Exception as exc:  # noqa: BLE001
                msg = str(exc)
                if hasattr(exc, "read"):
                    try:
                        msg = exc.read().decode()[:300]
                    except Exception:
                        pass
                print(f"  attempt {attempt} failed for {job['id']}: {msg[:220]}")
                time.sleep(4)
        else:
            print(f"FAIL {job['id']}")


if __name__ == "__main__":
    main()
