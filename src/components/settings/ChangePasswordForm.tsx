import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import React, { ChangeEvent, memo, useState } from "react";
import toast from "react-simple-toasts";

const ChangePassworForm = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
  };
  const handleChangeEmail = async (e: any) => {
    try {
      e.preventDefault();
    } catch (error) {
      toast(GetApiErrorMessage(error));
    }
  };

  return (
    <form
      className="md:w-8/12 xl:w-5/12 flex flex-col gap-2"
      onSubmit={handleChangeEmail}
    >
      <Flex mb={"4"} direction={"column"} gap={"2"}>
        <Heading size={"4"}>Change Password</Heading>
      </Flex>

      <TextField.Root
        placeholder="Current Password"
        value={form.currentPassword}
        name="currentPassword"
        onChange={handleOnChange}
        required={true}
      />
      <TextField.Root
        placeholder="New Password"
        value={form.newPassword}
        name="newPassword"
        onChange={handleOnChange}
        required={true}
      />
      <Button type="submit" size={"3"} className="!bg-btnPrimary">
        Update
      </Button>
    </form>
  );
};

export default memo(ChangePassworForm);
