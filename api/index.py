"""Jane's Plants - Flask backend.

Runs as a single Vercel Python serverless function. vercel.json rewrites every
/api/* request to this file, and Flask routes on the original path.

Responsibilities (a brand site, not a shop): handle the enquiry and hire forms.
If an email provider key is present in the environment it forwards the enquiry
to the shop inbox; otherwise it validates and acknowledges so the form always
works. No personal data is stored.
"""

import json
import os
import re
import urllib.request

from flask import Flask, jsonify, request

app = Flask(__name__)

INBOX = "hello@janesplants.com"
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
VALID_KINDS = {"general", "plant", "hire", "visit"}


def _forward_email(payload: dict) -> bool:
    """Best-effort forward via Resend if RESEND_API_KEY is set. Returns sent?."""
    key = os.environ.get("RESEND_API_KEY")
    sender = os.environ.get("ENQUIRY_FROM", "Jane's Plants <onboarding@resend.dev>")
    if not key:
        return False

    kind = payload.get("kind", "general")
    lines = [
        f"Kind: {kind}",
        f"Name: {payload.get('name', '')}",
        f"Email: {payload.get('email', '')}",
        f"Phone: {payload.get('phone', '')}",
        f"Subject: {payload.get('subject', '')}",
        "",
        payload.get("message", ""),
    ]
    body = {
        "from": sender,
        "to": [INBOX],
        "reply_to": payload.get("email", INBOX),
        "subject": f"[{kind}] enquiry from {payload.get('name', 'website')}",
        "text": "\n".join(lines),
    }
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            return 200 <= resp.status < 300
    except Exception as exc:  # noqa: BLE001 - never fail the request on email
        print(f"enquiry email forward failed: {exc}")
        return False


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify(ok=True, service="janesplants-api")


@app.route("/api/enquiry", methods=["POST"])
def enquiry():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()
    kind = str(data.get("kind", "general")).strip().lower()
    if kind not in VALID_KINDS:
        kind = "general"

    errors = {}
    if len(name) < 2:
        errors["name"] = "Please tell us your name."
    if not EMAIL_RE.match(email):
        errors["email"] = "Please enter a valid email address."
    if len(message) < 5:
        errors["message"] = "A few words about what you are after, please."

    # Honeypot: bots fill hidden fields. Pretend success, do nothing.
    if str(data.get("company", "")).strip():
        return jsonify(ok=True, message="Thanks, we will be in touch.")

    if errors:
        return jsonify(ok=False, errors=errors), 422

    payload = {
        "kind": kind,
        "name": name,
        "email": email,
        "phone": str(data.get("phone", "")).strip(),
        "subject": str(data.get("subject", "")).strip(),
        "message": message,
    }
    forwarded = _forward_email(payload)
    print(f"enquiry received kind={kind} forwarded={forwarded}")

    return jsonify(
        ok=True,
        forwarded=forwarded,
        message="Thanks, that has landed with us. We will reply soon.",
    )


# Local debugging only; on Vercel the platform serves the `app` WSGI callable.
if __name__ == "__main__":
    app.run(port=5328, debug=True)
