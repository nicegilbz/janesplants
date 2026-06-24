import Link from "next/link";

/**
 * Cinematic 404. Lives at the root (outside the (site) layout), so it is
 * self-contained: it uses the global font CSS variables but inlines its own
 * dark glasshouse styling rather than the .cine class system.
 */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        background:
          "radial-gradient(120% 90% at 50% 8%, #16271b 0%, #0c1410 55%, #060c08 100%)",
        color: "#f4efe3",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          fontSize: "0.78rem",
          color: "#9fd15b",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-serif), serif",
          fontWeight: 300,
          fontSize: "clamp(2.4rem, 7vw, 5rem)",
          letterSpacing: "-0.02em",
          margin: "1.1rem 0 0.6rem",
        }}
      >
        Lost in the foliage.
      </h1>
      <p style={{ color: "#a9b5a3", maxWidth: "30rem", lineHeight: 1.6 }}>
        That page has wandered off somewhere green. Let us walk you back to the
        glasshouse.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "2rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.78rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "0.95rem 1.8rem",
          borderRadius: "999px",
          color: "#f4efe3",
          background: "linear-gradient(135deg, #c0613b, #9c4a2c)",
          textDecoration: "none",
        }}
      >
        Back to the glasshouse
      </Link>
    </main>
  );
}
