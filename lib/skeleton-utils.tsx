import type React from "react"
// Helper function to generate skeleton loading components
export function generateSkeletons(count: number, component: React.ReactNode) {
  return Array.from({ length: count }).map((_, i) => <div key={i}>{component}</div>)
}

// Array generator for specific counts
export const SKELETON_COUNTS = {
  NEWS: 3,
  STAFF: 6,
  FACILITIES: 4,
  CURRICULUM_ROWS: 8,
}
