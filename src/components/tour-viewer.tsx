"use client";

import { useRef, useState, useCallback } from "react";

interface Props {
  imageUrl: string;
  title: string;
}

export function TourViewer({ imageUrl, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const lastX = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    lastX.current = e.clientX;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      setPosition((prev) => prev + dx * 0.5);
    },
    [dragging],
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative cursor-grab overflow-hidden rounded-xl border border-slate-200 bg-slate-900 select-none"
      style={{ paddingBottom: "50%" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "auto 100%",
          backgroundPosition: `${position}px center`,
          backgroundRepeat: "repeat-x",
          transition: dragging ? "none" : "background-position 0.3s ease",
        }}
      />
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white/70">
        {title} &mdash; Seret untuk melihat 360&deg;
      </div>
    </div>
  );
}
