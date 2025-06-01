import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { feature } from "topojson-client";
import Select from "react-select";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import Head from "next/head";
import Container from "@/components/Container";
import { Flex, Heading, Text, TextField, Tooltip } from "@radix-ui/themes";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
// import { geoCentroid } from "d3-geo";

// URLs for topology data
const STATES_TOPO_JSON =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const COUNTIES_TOPO_JSON =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

interface FeatureCollection {
  type: string;
  features: any[];
}

function Map() {
  const [statesGeo, setStatesGeo] = useState<any>(null);
  const [countiesGeo, setCountiesGeo] = useState<FeatureCollection | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [displayedCounties, setDisplayedCounties] = useState<string[]>([]);
  const [ownerCounts, setOwnerCounts] = useState<Record<string, number>>({});
  const [stateIdToName, setStateIdToName] = useState<Record<string, string>>(
    {}
  );

  const [countySearch, setCountySearch] = useState("");

  useEffect(() => {
    try {
      fetch(STATES_TOPO_JSON)
        .then((res) => res.json())
        .then((topology) => {
          const geo = feature(topology, topology.objects.states) as any;
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
          setCountiesGeo(geo as any);
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

  return (
    <div>
      <Head>
        <title>Owners</title>
      </Head>
      <SiteHeader />
      {!statesGeo && (
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          className="min-h-[70vh]"
        >
          <ReloadIcon
            className="animate-spin"
            height={25}
            width={25}
            color="gray"
          />
          <Text size={"3"} color="gray" mt={"3"}>
            Loading...
          </Text>
        </Flex>
      )}
      {statesGeo && (
        <Container className="my-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1 bg-white rounded-xl p-5 shadow-md border relative">
              <div className="flex flex-row items-center justify-between">
                <Heading size={"4"} className="text-heading">
                  Select State
                </Heading>

                {selectedState && (
                  <Text size={"2"} color="gray">
                    {selectedState}
                  </Text>
                )}
              </div>
              <div className="relative">
                <ComposableMap
                  projection="geoAlbersUsa"
                  className=""
                  width={900}
                  height={900}
                >
                  <Geographies geography={statesGeo}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const name = geo.properties.name;
                        const isSelected = name === selectedState;
                        return (
                          <Tooltip content={name}>
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onClick={() => {
                                console.log(geo)
                                setSelectedState(name);
                              }}
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
                          </Tooltip>
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
              </div>
            </div>

            {/* Counties list */}
            <div className="col-span-1 rounded-xl p-5 shadow-md border bg-white h-fit">
              <Heading size={"4"} className="text-heading">
                Counties
              </Heading>

              <TextField.Root
                className="mt-3"
                placeholder="Search counties"
                radius="large"
                value={countySearch}
                onChange={(e) => setCountySearch(e.target.value)}
              />

              {!selectedState ? (
                <Flex
                  direction={"column"}
                  align={"center"}
                  justify={"center"}
                  className="min-h-[200px]"
                >
                  <Text size={"2"} color="gray" align={"center"}>
                    No state selected!
                    <br /> Select a state to see the counties.
                  </Text>
                </Flex>
              ) : (
                <ul className="mt-3 min-h-[200px] max-h-[250px] overflow-auto">
                  {displayedCounties
                    .filter((name) =>
                      name?.toLowerCase()?.includes(countySearch?.toLowerCase())
                    )
                    .map((name, index) => (
                      <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-lg"
                      >
                        <Text size={"2"} color="gray">
                          {name}
                        </Text>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Owners count */}
          </div>
          <Flex direction={"column"} gap={"2"} mt={"8"}>
            <Flex
              className="border-b"
              direction={"row"}
              align={"center"}
              justify={"between"}
            >
              <h2 className="text-lg font-semibold mb-2">
                No. of Mineral Owners
              </h2>
              <Flex
                direction={"row"}
                align={"center"}
                justify={"end"}
                gap={"4"}
              >
                <ReloadIcon height={18} width={18} color="gray" />
                <DownloadIcon height={20} width={20} color="gray" />
              </Flex>
            </Flex>
            <ul className="space-y-1">
              {displayedCounties.map((name) => (
                <li key={name} className="text-gray-700">
                  {/* {ownerCounts[name] ?? 0} */}
                </li>
              ))}
            </ul>
          </Flex>
        </Container>
      )}
      <Footer />
    </div>
  );
}

export default Map;
