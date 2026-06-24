"""Generate accessory product photos (pots / care / tools) via Gemini Imagen 4.

GEMINI_KEY=... python3 scripts/gen-accessories.py   -> public/media/accessories/<slug>.png (1:1)
"""

import base64, json, os, ssl, sys, time, urllib.request

try:
    import certifi
    SSL_CTX = ssl.create_default_context(cafile=certifi.where())
except Exception:  # noqa: BLE001
    SSL_CTX = ssl.create_default_context()

KEY = os.environ.get("GEMINI_KEY", "").strip()
if not KEY:
    sys.exit("GEMINI_KEY not set")

MODEL = "imagen-4.0-generate-001"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "media", "accessories")
os.makedirs(OUT, exist_ok=True)

STYLE = (
    " A single object, centered, on a seamless near-black background, soft studio "
    "rim light, gentle volumetric haze, deep forest-green and aged-brass palette, "
    "shot on Arri Alexa, 85mm, shallow depth of field, photoreal, premium editorial "
    "product photography, no plant, no people, no text, no hands."
)

ITEMS = {
    "stoneware-pot": "An empty hand-thrown matte stoneware plant pot in a tonal grey-green glaze.",
    "terracotta-pot": "An empty aged terracotta plant pot, weathered natural clay with subtle patina.",
    "fluted-planter": "An empty fluted ribbed ceramic planter in soft cream, catching ribbed shadows.",
    "plant-food": "A small elegant amber glass bottle of slow-release liquid plant food with a minimal label.",
    "leaf-cloth": "A neatly folded stack of soft sage-green microfibre leaf-care cloths.",
    "brass-mister": "An elegant antique solid-brass plant mister spray bottle.",
    "moisture-meter": "A simple elegant brass and cream soil moisture meter with a probe.",
    "copper-snips": "A pair of elegant copper plant snips, small pruning scissors.",
}


def generate(slug, desc):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={KEY}"
    body = {
        "instances": [{"prompt": desc + STYLE}],
        "parameters": {"sampleCount": 1, "aspectRatio": "1:1", "personGeneration": "dont_allow"},
    }
    req = urllib.request.Request(url, data=json.dumps(body).encode(),
                                headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=120, context=SSL_CTX) as resp:
        data = json.loads(resp.read())
    preds = data.get("predictions") or []
    if not preds:
        raise RuntimeError(f"no predictions: {json.dumps(data)[:160]}")
    b64 = preds[0].get("bytesBase64Encoded") or preds[0].get("image", {}).get("imageBytes")
    path = os.path.join(OUT, f"{slug}.png")
    open(path, "wb").write(base64.b64decode(b64))
    return os.path.getsize(path)


def main():
    only = set(sys.argv[1:])
    for slug, desc in ITEMS.items():
        if only and slug not in only:
            continue
        for attempt in range(1, 5):
            try:
                size = generate(slug, desc)
                print(f"OK  {slug:18} -> {size//1024} KB")
                break
            except Exception as exc:  # noqa: BLE001
                msg = str(exc)
                if hasattr(exc, "read"):
                    try:
                        msg = exc.read().decode()[:160]
                    except Exception:
                        pass
                print(f"  attempt {attempt} {slug}: {msg[:120]}")
                time.sleep(6)
        else:
            print(f"FAIL {slug}")


if __name__ == "__main__":
    main()
