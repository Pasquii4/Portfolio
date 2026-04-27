import { ImageResponse } from "next/og";

export const runtime = "edge";

function clampText(input: string, maxLen: number) {
  const trimmed = input.trim().replace(/\s+/g, " ");
  return trimmed.length > maxLen ? `${trimmed.slice(0, maxLen - 1)}…` : trimmed;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = clampText(
    searchParams.get("title") ?? "Pau Pascual — Product Builder",
    90,
  );

  const desc = clampText(
    searchParams.get("desc") ?? "Trading · IA · Webs a medida · Barcelona",
    120,
  );

  try {
    const fontRes = await fetch(
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
    );
    if (!fontRes.ok) throw new Error(`Font fetch failed: ${fontRes.status}`);
    const fontData = await fontRes.arrayBuffer();

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            position: "relative",
            backgroundColor: "#0f0e0c",
            fontFamily: "Inter",
            color: "#e8e6e1",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              padding: "60px",
              position: "relative",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "28px",
                paddingRight: "120px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "#6b7280",
                  letterSpacing: "0.2px",
                }}
              >
                paupascual.dev
              </div>

              <div
                style={{
                  fontSize: "64px",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  color: "#e8e6e1",
                  maxWidth: "760px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {title}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "#9ca3af",
                    lineHeight: 1.35,
                    maxWidth: "760px",
                  }}
                >
                  {desc}
                </div>

                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                  {[
                    "Python · FastAPI",
                    "AI Agents",
                    "Next.js · Cloudflare",
                  ].map((pill) => (
                    <div
                      key={pill}
                      style={{
                        backgroundColor: "#1c1b19",
                        border: "1px solid #2a2928",
                        color: "#e8e6e1",
                        borderRadius: "9999px",
                        padding: "6px 16px",
                        fontSize: "16px",
                        fontWeight: 400,
                        display: "flex",
                        alignItems: "center",
                        height: "34px",
                      }}
                    >
                      {pill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                right: "-40px",
                bottom: "-80px",
                fontSize: "180px",
                fontWeight: 700,
                color: "#1c1b19",
                lineHeight: 1,
                letterSpacing: "-6px",
                userSelect: "none",
              }}
            >
              PP
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "1200px",
              height: "2px",
              backgroundColor: "#4f98a3",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            weight: 700,
          },
        ],
      },
    );
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f0e0c",
            color: "#e8e6e1",
            fontSize: "64px",
            fontWeight: 700,
            padding: "60px",
            textAlign: "center",
            lineHeight: 1.12,
          }}
        >
          {title}
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }
}

