export const philippinesBoundary = [
  [4.277256, 122.416079],
  [21.33895, 121.721292],
  [3.086835, 116.133513],
  [13.5145, 127.301521],
];

export const philippinesCenter = [12.8797, 121.774];

// Styles Settings
export const mapBackgroundColor = "#74ccf4";

// Default
export const hoveredColor = "#37cc37";
export const selectedColor = "#26a326";

export const defaultStyles = {
  color: "#6e6e6e",
  fillColor: "white",
  fillOpacity: 1,
  dashArray: "",
  weight: 1,
  zIndex: 10,
};

export const hoverStyles = {
  ...defaultStyles,
  fillColor: hoveredColor,
};

export const selectedStyles = {
  ...defaultStyles,
  fillColor: selectedColor,
};
