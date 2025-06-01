import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
interface FeatureCollection {
  type: string;
  features: any[];
}
const MapLocationSelector = () => {
  const [statesGeo, setStatesGeo] = useState<FeatureCollection | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  return (
    <div
      className="mt-4 relative"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <ComposableMap projection="geoAlbersUsa" width={1000} height={1000}>
        <Geographies geography={[]}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const isSelected = name === selectedState;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => setSelectedState(name)}
                  onMouseEnter={() => setTooltipContent(name)}
                  onMouseLeave={() => setTooltipContent(null)}
                  style={{
                    default: {
                      fill: isSelected ? "#2563EB" : "#93C5FD",
                      outline: "none",
                    },
                    hover: {
                      fill: "#1E40AF",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#1E3A8A",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapLocationSelector;
