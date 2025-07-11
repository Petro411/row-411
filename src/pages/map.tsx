import { Flex, Heading, Table, Text, TextField, Tooltip, } from "@radix-ui/themes";
import React, { memo, ReactNode, useCallback, useEffect, useState, } from "react";
import { ComposableMap, Geographies, Geography, Marker, } from "react-simple-maps";
import { DownloadIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { downloadMineralList } from "@/utils/downloadMineralList";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import OwnerDetails from "@/components/OwnerDetails";
import baseApi, { endpoints } from "@/services/api";
import SiteHeader from "@/components/SiteHeader";
import { getUser } from "@/context/AuthContext";
import Container from "@/components/Container";
import { useQuery } from "@/hooks/useQuery";
import { feature } from "topojson-client";
import Footer from "@/components/Footer";
import toast from "react-simple-toasts";
import { useRouter } from "next/router";
import Select from "react-select";
import Head from "next/head";


const STATES_TOPO_JSON =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

function Map() {
  const user = getUser()?.user;
  const router = useRouter();
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [statesGeo, setStatesGeo] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [displayedCounties, setDisplayedCounties] = useState<string[]>([]);

  const [countySearch, setCountySearch] = useState("");
  const { request, loading } = useQuery();
  const getMineralsApi = useQuery();

  const getCountiesByState = useCallback(async () => {
    try {
      const res = await request(
        `${endpoints.getCountiesByState}?name=${selectedState}`
      );
      setDisplayedCounties(res.locations);
    } catch (error) {
      setDisplayedCounties([]);
      toast(GetApiErrorMessage(error));
    }
  }, [selectedState]);

  const handleDownload = useCallback(() => {
    try {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const data = getMineralsApi.data?.minerals;

      const headers = Object.keys(data[0]);

      const csvRows = [
        headers.join(","), // Header row
        ...data.map((row: any) =>
          headers
            .map((field) => {
              const value = row[field];

              if (Array.isArray(value)) {
                return `"${value.join("; ")}"`; // Join array values with ;
              }

              if (field === "state" && value?.name && value?.code) {
                return `"${value.name}, ${value.code}"`; // Format state
              }

              return `"${value ?? ""}"`; // Default case
            })
            .join(",")
        ),
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "minerals.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {}
  }, [getMineralsApi.data?.minerals]);

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
        });
    } catch (error) {
      console.log(error, "map data error");
    }
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setDisplayedCounties([]);
      return;
    }
    getCountiesByState();
  }, [selectedState]);

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
          <div className="grid md:grid-cols-2 gap-8">
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
                <ListEmpty
                  description={`No state selected!\nSelect a state to see the counties.`}
                />
              ) : !loading && displayedCounties?.length ? (
                <ul className="mt-3 min-h-[200px] max-h-[250px] overflow-auto">
                  {displayedCounties
                    ?.filter((item: any) =>
                      item?.name
                        ?.toLowerCase()
                        ?.includes(countySearch?.toLowerCase())
                    )
                    ?.map((item: any, index: number) => (
                      <li
                        onClick={(e) => setSelectedCounty(item?.name)}
                        key={index}
                        value={item?.name}
                        className="cursor-pointer hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 px-3 py-2 rounded-lg text-sm"
                      >
                        {item?.name}
                      </li>
                    ))}
                </ul>
              ) : (
                <ListEmpty
                  description={
                    loading
                      ? "loading counties..."
                      : `No counties listed below this state!`
                  }
                />
              )}
            </div>

            {/* Owners count */}
          </div>
          <MineralsTable state={selectedCounty ?? ""} />
        </Container>
      )}
      <Footer />
    </div>
  );
}

type ListEmptyProps = {
  description?: string;
  children?: ReactNode;
};

const ListEmpty = memo(({ description, children }: ListEmptyProps) => {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      className="min-h-[200px]"
    >
      {description && (
        <Text size={"2"} color="gray" align={"center"}>
          {description}
        </Text>
      )}
      {children && children}
    </Flex>
  );
});

type MineralsTableProps = {
  state: string;
};

const MineralsTable = memo(({ state }: MineralsTableProps) => {
  const { request, data, loading } = useQuery(
    `${endpoints.getOwnersByCounty}?name=${state}`
  );
  const [selectedMineral, setSelectedMineral] = useState<string | null>(null);

  const handleDownload = useCallback(() => {
    if (data?.minerals?.length) {
      downloadMineralList(data?.minerals);
      toast("Mineral list has been downloaded.")
    }
  }, [data?.minerals]);

  useEffect(() => {
    if (state?.trim()?.length) {
      request();
    }
  }, [state]);

  return (
    <>
      <Flex direction={"column"} gap={"2"} mt={"8"}>
        <Flex
          className="border-b"
          direction={"row"}
          align={"center"}
          justify={"between"}
        >
          <h2 className="text-lg font-semibold mb-2">Mineral Owners</h2>
          <Flex direction={"row"} align={"center"} justify={"end"} gap={"4"}>
            <ReloadIcon
              height={18}
              width={18}
              color="gray"
              onClick={() => request()}
            />
            {data?.minerals?.length ? (
              <DownloadIcon
                className="cursor-pointer"
                onClick={handleDownload}
                height={20}
                width={20}
                color="gray"
              />
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
        {loading ? (
          <ListEmpty>
            <ReloadIcon className="animate-spin" height={20} width={20} />
          </ListEmpty>
        ) : data?.minerals?.length ? (
          <div className="overflow-x-auto lg:overflow-x-visible">
            <Table.Root className="min-w-[1000px]">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>State</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Zipcode</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>County</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.minerals?.map((item: any, index: number) => (
                  <Table.Row key={index}>
                    <Table.Cell>{item?.name}</Table.Cell>
                    <Table.Cell>{item?.state?.name}</Table.Cell>
                    <Table.Cell>{item?.zipcode}</Table.Cell>
                    <Table.Cell className="!w-[400px]">
                      <ul className="flex flex-col gap-2">
                        {item?.addresses
                          ?.slice(0, 2)
                          ?.map((addr: string, id: number) => (
                            <li className="!line-clamp-2" key={id}>
                              {addr}
                            </li>
                          ))}
                      </ul>
                    </Table.Cell>
                    <Table.Cell className="!w-[200px]">
                      <ul className="flex flex-row items-center gap-1 justify-start flex-wrap">
                        {item?.counties?.map((county: string, id: number) => (
                          <li className="!line-clamp-1" key={id}>
                            {county}
                            {item?.counties?.length > 1 ? "," : ""}
                          </li>
                        ))}
                      </ul>
                    </Table.Cell>
                    <Table.Cell className="w-[30px]">
                      <EyeOpenIcon
                        onClick={() => setSelectedMineral(item?._id)}
                        className="cursor-pointer"
                        height={20}
                        width={20}
                        color="gray"
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        ) : (
          <ListEmpty description="No results found!" />
        )}
      </Flex>

      <OwnerDetails id={selectedMineral} setSelectedId={setSelectedMineral} />
    </>
  );
});

export default Map;
