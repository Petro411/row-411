import React, { useCallback, useEffect, useState } from "react";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Faqs from "@/components/home/Faqs";
import NewsLetter from "@/components/NewsLetter";
import PageHeader from "@/components/PageHeader";
import SiteHeader from "@/components/SiteHeader";
import { useMutation } from "@/hooks/useMutation";
import baseApi, { endpoints } from "@/services/api";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import { GetStaticProps } from "next";
import Head from "next/head";
import toast from "react-simple-toasts";
import { useQuery } from "@/hooks/useQuery";

const ContactPage = () => {
  const [faqs, setFaqs] = useState([]);

  const getFaqsApi = useQuery(endpoints.getFaqs);

  console.log(getFaqsApi.data);

  const { request, loading } = useMutation(endpoints.contact);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await request(form);
      toast("Message submitted!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast(GetApiErrorMessage(error));
      console.error("Error submitting form:", error);
    }
  };

  const fetchFaqs = useCallback(async () => {
    try {
      const res = await baseApi.get(endpoints.getFaqs);
      setFaqs(res?.data?.faqs ?? []);
    } catch (error) {}
  }, [faqs]);
  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <>
      <Head>
        <title>Services</title>
      </Head>
      <SiteHeader />
      <PageHeader
        title="Contact Us"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaque."
        className="!min-h-[40vh]"
        containerClassname="!min-h-[40vh]"
      />
      <Container>
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border mt-16 md:mt-0 md:-translate-y-12 w-full lg:w-8/12 2xl:w-6/12 mx-auto">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <TextField.Root
              size="3"
              placeholder="Name"
              required
              name="name"
              type="text"
              minLength={3}
              value={form.name}
              onChange={handleChange}
            />
            <TextField.Root
              size="3"
              type="email"
              placeholder="Email address"
              required
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <TextField.Root
              size="3"
              required
              placeholder="Phone number"
              type="tel"
              name="phone"
              minLength={10}
              value={form.phone}
              onChange={handleChange}
            />
            <TextArea
              size="3"
              required
              placeholder="Message"
              rows={8}
              name="message"
              maxLength={2000}
              value={form.message}
              onChange={handleChange}
            />
            <Button
              loading={loading}
              disabled={loading}
              size="3"
              className="!self-start !bg-btnPrimary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>

      <Flex direction="column" gap="9" className="pt-20">
        <NewsLetter />
        <Faqs faqs={faqs} />
      </Flex>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  try {
    const res = await baseApi.get(endpoints.getFaqs);
    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default ContactPage;
