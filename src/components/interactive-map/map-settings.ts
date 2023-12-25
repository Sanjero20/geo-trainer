export const philippinesBoundary = [
  [4.277256, 122.416079],
  [21.33895, 121.721292],
  [3.086835, 116.133513],
  [13.5145, 127.301521],
];

export const philippinesCenter = [12.8797, 121.774];

// Styles Settings
export const mapBackgroundColor = "#74ccf4";

// Learning Page colors
export const hoveredColor = "#37cc37";
export const selectedColor = "#26a326";
export const selectedHoveredColor = "green";

// Play page colors
export const hoverColorPlay = "#d4d4d4";
export const correctColor = "#26a326";
export const wrongColor = "#dc2626";

export const defaultStyles = {
  color: "#16161a",
  fillColor: "white",
  fillOpacity: 1,
  dashArray: "",
  weight: 1,
  zIndex: 10,
};

// Learn page styles
export const hoverStyles = {
  ...defaultStyles,
  fillColor: hoveredColor,
};

export const selectedStyles = {
  ...defaultStyles,
  fillColor: selectedColor,
};

export const selectedHoverStyles = {
  ...defaultStyles,
  fillColor: selectedHoveredColor,
};
