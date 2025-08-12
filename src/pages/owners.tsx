import MineralOwnerFilter from "@/components/home/MineralOwnerFilter";
import React, { useCallback, useState } from "react";
import OwnerDetails from "@/components/OwnerDetails";
import baseApi, { endpoints } from "@/services/api";
import SiteHeader from "@/components/SiteHeader";
import { Heading, Text } from "@radix-ui/themes";
import Container from "@/components/Container";
import ReactPaginate from "react-paginate";
import { GetServerSideProps } from "next";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Label from "@/config/Label";
import Link from "next/link";
import Head from "next/head";
import moment from "moment";


const itemsPerPage = 10;

const Owners = ({ owners, totalPages, currentPage, locations}: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();
  const handlePageClick = useCallback(
    (event: any) => {
      const selectedPage = event.selected + 1;

      router.push({
        pathname: "/owners",
        query: { ...router.query, page: selectedPage },
      });
    },
    [totalPages]
  );

  const handleShowDetails = useCallback(
    (id: string) => {
      setSelectedId(id);
    },
    [selectedId]
  );

  return (
    <>
      <Head>
        <title>Owners</title>
      </Head>
      <SiteHeader />
      <div className="gradientBg py-16 lg:py-0 min-h-[60vh] items-center justify-center flex flex-col ">
        <MineralOwnerFilter
          className="py-10 p-5 sm:p-8 md:p-10"
          title={Label.SearchMineralOwners}
          paragraph={Label.FindMineralOwners}
          dropDownClasses={"w-full lg:w-[180px]"}
          locations={locations}
          tabView={true}
        />
        <Link href={"/map"} className="mt-6 text-white underline">Search through map</Link>
      </div>

      <Container className="mt-5 mb-24">
        {owners?.length ? (
          <Text size={"2"} color="gray">
            Showing {owners?.length}
          </Text>
        ) : (
          ""
        )}
        {!owners?.length ? (
          <Heading className="py-20 text-center text-heading" size={"5"}>
            No results found!{" "}
          </Heading>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
            {owners?.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => handleShowDetails(item?._id)}
                className="cursor-pointer flex flex-col p-5 rounded-lg border hover:border-primary transition-all duration-300 hover:shadow-lg shadow-md"
              >
                <Heading size={"3"} className="text-heading !line-clamp-2">
                  {item?.names[0]}
                </Heading>
                {/* <div className="flex flex-col mt-1">
                  <Text size={"2"} color="gray">
                    {item?.addr_city}
                  </Text>
                  <Text size={"2"} color="gray">
                    {item?.addr_line1 ?? item?.addr_line2}
                  </Text>
                </div> */}
                <Text size={"1"} align={"right"} color="gray">
                  {moment(item?.createdAt).format("MMMM DD YYYY")}
                </Text>
              </div>
            ))}
          </div>
        )}

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          forcePage={currentPage - 1}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center mt-8 gap-2 flex-wrap"
          pageClassName="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
          activeClassName="bg-primary text-white border-primary hover:bg-primary"
          previousClassName="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
          nextClassName="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
          breakClassName="px-4 py-2 text-gray-500"
        />
      </Container>

     <OwnerDetails id={selectedId} setSelectedId={setSelectedId} />

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    name = "",
    ml = "",
    cityState = "",
    page = "1",
  } = context.query;

  try {
    const res = await baseApi.get(
      `${endpoints.queryOwners}?name=${name}&ml=${ml}&cityState=${cityState}&page=${page}&limit=${itemsPerPage}`
    );
    const { owners, totalPages } = res.data;
    const locsQuery = await baseApi.get(endpoints.getLocations);

    return {
      props: {
        owners,
        totalPages,
        currentPage: parseInt(page as string, 10),
        locations: locsQuery?.data?.locations ?? [],
      },
    };
  } catch (error) {
    return {
      props: {
        owners: [],
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
};

export default Owners;
