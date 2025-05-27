import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import Select from "react-select";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import Head from "next/head";

// URLs for topology data
const STATES_TOPO_JSON =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const COUNTIES_TOPO_JSON =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

// Custom styles for react-select
const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "0.375rem",
    borderColor: "#2563EB",
    boxShadow: "none",
    "&:hover": { borderColor: "#1E40AF" },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#DBEAFE" : "#ccc",
    color: "#1F2937",
  }),
};

interface FeatureCollection {
  type: string;
  features: any[];
}

function Map() {
  const [statesGeo, setStatesGeo] = useState<FeatureCollection | null>(null);
  const [countiesGeo, setCountiesGeo] = useState<FeatureCollection | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [displayedCounties, setDisplayedCounties] = useState<string[]>([]);
  const [ownerCounts, setOwnerCounts] = useState<Record<string, number>>({});
  const [stateIdToName, setStateIdToName] = useState<Record<string, string>>(
    {}
  );
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [countySearch, setCountySearch] = useState("");

  useEffect(() => {
    try {
      fetch(STATES_TOPO_JSON)
        .then((res) => res.json())
        .then((topology) => {
          const geo = feature(
            topology,
            topology.objects.states
          ) as FeatureCollection;
          setStatesGeo(geo);

          const stateIdMap: Record<string, string> = {};
          for (const feature of geo.features) {
            stateIdMap[feature.id] = feature.properties.name;
          }
          setStateIdToName(stateIdMap);
        });

      fetch(COUNTIES_TOPO_JSON)
        .then((res) => res.json())
        .then((topology) => {
          const geo = feature(topology, topology.objects.counties);
          setCountiesGeo(geo as FeatureCollection);
        });

      const mockCounts: Record<string, number> = {
        "Adair County": 45,
        "Adams County": 32,
      };
      setOwnerCounts(mockCounts);
    } catch (error) {
      console.log(error, "map data error");
    }
  }, []);

  useEffect(() => {
    if (!selectedState || !countiesGeo || !stateIdToName) {
      setDisplayedCounties([]);
      return;
    }

    const stateFips = Object.entries(stateIdToName).find(
      ([, name]) => name === selectedState
    )?.[0];

    if (!stateFips) {
      setDisplayedCounties([]);
      return;
    }

    const counties = countiesGeo.features.filter((c) =>
      c.id?.toString().startsWith(stateFips)
    );

    const names = counties.map((c) => c.properties.name + " County");
    setDisplayedCounties(names);
  }, [selectedState, countiesGeo, stateIdToName]);

  if (!statesGeo) return <div>Loading map...</div>;

  const stateOptions = statesGeo.features.map((f) => ({
    value: f.properties.name,
    label: f.properties.name,
  }));

  return (
    <div>
      <Head>
        <title>Owners</title>
      </Head>
      <SiteHeader />
      <div className="max-w-screen-lg mx-auto px-6 pt-10 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          U.S. Mineral Ownership Explorer
        </h1>
        <p className="text-lg text-gray-600">
          Explore mineral ownership data across the United States. Select a
          state to view its counties and see the number of registered mineral
          owners per county. Hover over the map to view state names for easy
          navigation.
        </p>
      </div>

      <div className="max-w-screen-lg mx-auto p-6 grid grid-cols-3 gap-4">
        {/* State selector & map */}
        <div className="col-span-1 bg-white shadow rounded-lg p-4 border-2 border-gray-400 relative">
          <h2 className="text-lg font-semibold mb-2">Select a State</h2>
          <Select
            options={stateOptions}
            styles={selectStyles}
            placeholder="Select state..."
            onChange={(opt) => setSelectedState(opt ? opt.value : null)}
          />

          <div
            className="mt-4 relative"
            onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
          >
            <ComposableMap projection="geoAlbersUsa" width={1000} height={1000}>
              <Geographies geography={statesGeo}>
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

            {/* Tooltip */}
            {tooltipContent && (
              <div
                className="absolute z-10 bg-white border border-gray-300 text-sm text-gray-800 px-2 py-1 rounded shadow pointer-events-none"
                style={{
                  top: mousePos.y - 350,
                  left: mousePos.x - 350,
                }}
              >
                {tooltipContent}
              </div>
            )}
          </div>
        </div>

        {/* Counties list */}
        <div className="col-span-1 bg-white shadow rounded-lg p-4 border-2 border-gray-400">
          <h2 className="text-lg font-semibold mb-2">Counties</h2>

          <input
            type="text"
            placeholder="Search counties..."
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={countySearch}
            onChange={(e) => setCountySearch(e.target.value)}
          />

          <ul className="space-y-1 max-h-[350px] overflow-auto">
            {displayedCounties
              .filter((name) =>
                name.toLowerCase().includes(countySearch.toLowerCase())
              )
              .map((name) => (
                <li key={name} className="text-gray-700">
                  {name}
                </li>
              ))}
          </ul>
        </div>

        {/* Owners count */}
        <div className="col-span-1 bg-white shadow rounded-lg p-4 border-2 border-gray-400">
          <h2 className="text-lg font-semibold mb-2">No. of Mineral Owners</h2>
          <ul className="space-y-1">
            {displayedCounties.map((name) => (
              <li key={name} className="text-gray-700">
                {/* {ownerCounts[name] ?? 0} */}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Map;
