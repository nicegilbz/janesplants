import { ImageResponse } from "next/og";

export const alt = "Jane's Plants - a stylish houseplant shop in Hertford";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background:
            "radial-gradient(120% 90% at 30% 0%, #1f5f3f 0%, #16271b 45%, #0c1410 100%)",
          color: "#f4efe3",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#9fd15b",
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#9fd15b",
            }}
          />
          The Hertford glasshouse
        </div>
        <div style={{ fontSize: 132, marginTop: 28, lineHeight: 1 }}>
          Jane&apos;s Plants
        </div>
        <div style={{ fontSize: 52, color: "#c8d2c0", marginTop: 26 }}>
          Plants with presence.
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 30,
            color: "#a9b5a3",
            maxWidth: 900,
          }}
        >
          Hand-picked houseplants, pots worth showing off, and plant hire for
          the rooms that want to feel alive.
        </div>
      </div>
    ),
    { ...size },
  );
}
