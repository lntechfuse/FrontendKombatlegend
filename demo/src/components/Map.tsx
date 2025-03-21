import React from "react";
import SVGComponent from "./SVGComponent"; // นำเข้า SVG

const Map: React.FC = () => {
  return (
    <div>
      <SVGComponent width={500} height={500} /> {/* ปรับขนาด SVG */}
    </div>
  );
};

export default Map;
