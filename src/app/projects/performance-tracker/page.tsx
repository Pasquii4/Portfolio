import type { Metadata } from "next";
import PerformanceTrackerClient from "@/components/tracker/PerformanceTrackerClient";

export const metadata: Metadata = {
  title: "Performance Tracker · ROI Social | Pau Pascual",
  description:
    "Red social de rendimiento deportivo con ROI verificado, Kelly Criterion y rankings públicos.",
  openGraph: {
    title: "Performance Tracker · ROI Social | Pau Pascual",
    description:
      "Red social de rendimiento deportivo con ROI verificado, Kelly Criterion y rankings públicos.",
    url: "https://portfolio-seven-wine-63.vercel.app/projects/performance-tracker",
    siteName: "Pau Pascual",
    type: "website",
  },
};

export default function PerformanceTrackerPage() {
  return <PerformanceTrackerClient />;
}
