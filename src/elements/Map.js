"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

const Map = (props) => {
  return (
    <div style={{ aspectRatio: 600 / 300 }}>
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
