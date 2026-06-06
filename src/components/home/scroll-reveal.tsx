"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Additional class names to apply when visible */
  className?: string;
  /** Base class names always applied */
  baseClassName?: string;
  /** Delay in ms before the animation starts */
  delay?: number;
  /** Direction: "up" | "left" | "right" | "none" */
  direction?: "up" | "left" | "right" | "none";
  /** Threshold 0–1 for IntersectionObserver */
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  baseClassName = "",
  delay = 0,
  direction = "up",
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const directionClass = {
    up: "translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    none: "",
  }[direction];

  return (
    <div
      ref={ref}
      className={`${baseClassName} transition-all duration-700 ease-out ${
        visible
          ? `opacity-100 translate-y-0 translate-x-0 ${className}`
          : `opacity-0 ${directionClass}`
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  baseDelay?: number;
  staggerMs?: number;
  direction?: "up" | "left" | "right" | "none";
  threshold?: number;
}

/**
 * Wraps children with staggered ScrollReveal animations.
 * Each direct child gets an increasing delay.
 */
export function StaggerReveal({
  children,
  className = "",
  baseDelay = 0,
  staggerMs = 80,
  direction = "up",
  threshold = 0.05,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const directionClass = {
    up: "translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    none: "",
  }[direction];

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, i) => (
        <div
          key={i}
          className={`transition-all duration-700 ease-out ${
            visible
              ? "opacity-100 translate-y-0 translate-x-0"
              : `opacity-0 ${directionClass}`
          }`}
          style={{ transitionDelay: visible ? `${baseDelay + i * staggerMs}ms` : "0ms" }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
