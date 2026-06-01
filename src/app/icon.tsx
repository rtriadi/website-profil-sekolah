import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#2563eb",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 30 L50 25 L80 30 L80 75 L50 70 L20 75 Z"
            fill="white"
            opacity="0.95"
          />
          <path d="M50 25 L50 70" fill="#2563eb" opacity="0.3" />
          <path
            d="M50 18 L28 32 L50 42 L72 32 Z"
            fill="#fbbf24"
            stroke="#d97706"
            stroke-width="1.5"
          />
          <path d="M50 42 L50 52" stroke="#fbbf24" stroke-width="2.5" />
          <path
            d="M50 52 C45 52, 42 55, 42 58 C42 61, 50 62, 50 62 C50 62, 58 61, 58 58 C58 55, 55 52, 50 52"
            fill="#fbbf24"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
