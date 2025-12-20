"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Sample net worth data points
const dataPoints = [
  { month: "Jan", value: 85000 },
  { month: "Feb", value: 88000 },
  { month: "Mar", value: 87000 },
  { month: "Apr", value: 92000 },
  { month: "May", value: 95000 },
  { month: "Jun", value: 98000 },
  { month: "Jul", value: 102000 },
  { month: "Aug", value: 108000 },
  { month: "Sep", value: 112000 },
  { month: "Oct", value: 118000 },
  { month: "Nov", value: 122000 },
  { month: "Dec", value: 125000 },
];

export function AnimatedGraph() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const maxValue = Math.max(...dataPoints.map((d) => d.value));
  const minValue = Math.min(...dataPoints.map((d) => d.value));
  const range = maxValue - minValue;

  const width = 400;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Calculate points for the line
  const points = dataPoints.map((d, i) => {
    const x = padding.left + (i / (dataPoints.length - 1)) * graphWidth;
    const y =
      padding.top + graphHeight - ((d.value - minValue) / range) * graphHeight;
    return { x, y, ...d };
  });

  // Create SVG path
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Create area path (for gradient fill)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    height - padding.bottom
  } L ${padding.left} ${height - padding.bottom} Z`;

  return (
    <div className="relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--sossoldi-blue)" />
            <stop offset="100%" stopColor="var(--sossoldi-accent)" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--sossoldi-accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--sossoldi-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((fraction, i) => {
          const y = padding.top + graphHeight * (1 - fraction);
          const value = minValue + range * fraction;
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-muted-foreground text-[10px]"
              >
                €{(value / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {points.map((p, i) => (
          i % 2 === 0 && (
            <text
              key={i}
              x={p.x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {p.month}
            </text>
          )
        ))}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="var(--background)"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * i + 0.5 }}
          />
        ))}

        {/* Current value indicator */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <rect
            x={points[points.length - 1].x - 35}
            y={points[points.length - 1].y - 35}
            width={70}
            height={24}
            rx={6}
            fill="var(--primary)"
          />
          <text
            x={points[points.length - 1].x}
            y={points[points.length - 1].y - 19}
            textAnchor="middle"
            className="fill-primary-foreground text-[11px] font-semibold"
          >
            €125,000
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
