import { useQuery } from "@/hooks/useQuery";
import { endpoints } from "@/services/api";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  Flex,
  Heading,
  IconButton,
  Separator,
  Spinner,
  Text,
} from "@radix-ui/themes";
import React, { memo, useCallback, useEffect } from "react";
import _ from "lodash";

type Props = {
  id: string | null;
  setSelectedId: (id: string | null) => void;
};

const OwnerDetails = ({ id, setSelectedId }: Props) => {
  const { data, loading, error, request, abort } = useQuery();

  useEffect(() => {
    if (id) {
      request(`${endpoints.ownerDetails}?id=${id}`);
    }
    return () => {
      abort();
    };
  }, [id]);

  const renderFieldsValues = useCallback(() => {
    const a = _.omit(data?.owner, [
      "_id",
      "__v",
      "updatedAt",
      "numbers",
      "emails",
      "createdAt"
    ]);
    console.log(a);
    return Object.entries(a).map(([key, value]) => (
      <Flex direction={"column"} className="mt-4">
        <Text size={"3"} weight={"medium"}>
          {key[0]?.toUpperCase()}
          {key?.slice(1, key?.length)}
        </Text>
        <Separator size={"4"} orientation={"horizontal"} my={"1"} />
        {typeof value === "string" || typeof value === "number" ? (
          <Text size="3" color="gray">
            {value}
          </Text>
        ) : key === "state" ? (
          <Text size="3" color="gray">
            {value?.name}
          </Text>
        ) : key === "counties" ? (
          <Flex
            direction={"row"}
            align={"center"}
            justify={"start"}
            gap={"1"}
            wrap="wrap"
          >
            {value?.map((county: string, id: number) => (
              <Text key={id} size="3" color="gray">
                {county}
                {value?.length > 1 ? "," : ""}
              </Text>
            ))}
          </Flex>
        ) : key === "addresses" ? (
          <Flex direction={"column"} gap={"1"}>
            {value?.map((addr: string, id: number) => (
              <Text key={id} size="3" color="gray">
                {addr}
              </Text>
            ))}
          </Flex>
        ) : (
          ""
        )}
      </Flex>
    ));
  }, [data, id]);

  return (
    <Dialog.Root open={id ? true : false}>
      <Dialog.Content className="max-h-[90vh] overflow-y-auto ">
        <Flex direction={"row"} justify={"end"}>
          <IconButton
            size={"1"}
            onClick={() => setSelectedId(null)}
            radius="large"
            className="!bg-primary !outline-none"
          >
            <Cross1Icon height={16} width={16} />
          </IconButton>
          <br />
        </Flex>
        {loading && (
          <Flex className="!min-h-[10vh]" align={"center"} justify={"center"}>
            <Spinner size={"3"} />
          </Flex>
        )}
        {error && (
          <Flex p={"8"} direction={"column"} justify={"center"} gap={"3"}>
            <Heading size={"5"} align={"center"} className="text-heading">
              Unexpected Error :(
            </Heading>
            <Text size={"3"} className="text-center" color="gray">
              An unexpected error occurred while processing your request. Please
              try again later or contact support if the issue persists.
            </Text>
          </Flex>
        )}
        {data && (
          <Flex direction={"column"}>
            <Heading size={"4"} className="!max-w-[90%]">
              {data?.owner?.Name}
            </Heading>
            <Flex direction={"column"} className="mt-4">
              {renderFieldsValues()}
            </Flex>
          </Flex>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default memo(OwnerDetails);
