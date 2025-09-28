// Export all 3D icons from a single entry point
export { default as AiDataIcon3D } from "./AiDataIcon3D";
export { default as CloudDevOpsIcon3D } from "./CloudDevOpsIcon3D";
export { default as ApisAutomationIcon3D } from "./ApisAutomationIcon3D";
export { default as UxUiIcon3D } from "./UxUiIcon3D";
export { default as BackendIcon3D } from "./BackendIcon3D";
export { default as FrontendIcon3D } from "./FrontendIcon3D";
export { default as SecurityIcon3D } from "./SecurityIcon3D";

// Export technology logos
export { default as WordPressLogo } from "./WordPressLogo.jsx";
export { default as ReactLogo } from "./ReactLogo.jsx";

// Export types
export type { PlanetIconProps } from "./AiDataIcon3D";

// Export default colors for each icon
export const ICON_COLORS = {
  AiData: "#7C6FF0", // Violet
  CloudDevOps: "#3BA3FF", // Blue
  ApisAutomation: "#5CE1E6", // Turquoise
  UxUi: "#2EE6C5", // Green-aqua
  Backend: "#93A5FD", // Lavender
  Frontend: "#9AE6FF", // Sky blue
  Security: "#3D5A80", // Dark blue
} as const;

// Export icon names for iteration
export const ICON_NAMES = [
  "AiData",
  "CloudDevOps",
  "ApisAutomation",
  "UxUi",
  "Backend",
  "Frontend",
  "Security",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
