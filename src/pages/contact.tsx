"use client";
import React, { useRef, useState } from "react";
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

import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type Props = {
  faqs: any[] | [];
};

interface ContactRow {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactPage = ({ faqs }: Props) => {
  const gridRef = useRef<AgGridReact<ContactRow>>(null);

  const [rowData] = useState<ContactRow[]>([
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      message: "I'm interested in your services.",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "234-567-8901",
      message: "Can I schedule a meeting?",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "345-678-9012",
      message: "Please send me a quote.",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phone: "456-789-0123",
      message: "Do you offer custom solutions?",
    },
    {
      name: "Carol White",
      email: "carol.white@example.com",
      phone: "567-890-1234",
      message: "I have a question about pricing.",
    },
    {
      name: "David Black",
      email: "david.black@example.com",
      phone: "678-901-2345",
      message: "I'm looking for a consultation.",
    },
    {
      name: "Emma Stone",
      email: "emma.stone@example.com",
      phone: "789-012-3456",
      message: "Please call me back soon.",
    },
    {
      name: "Frank Green",
      email: "frank.green@example.com",
      phone: "890-123-4567",
      message: "I would like to discuss a project.",
    },
    {
      name: "Grace Lee",
      email: "grace.lee@example.com",
      phone: "901-234-5678",
      message: "Can I get more information?",
    },
    {
      name: "Henry Kim",
      email: "henry.kim@example.com",
      phone: "012-345-6789",
      message: "Do you have availability this week?",
    },
    {
      name: "Isla Scott",
      email: "isla.scott@example.com",
      phone: "111-222-3333",
      message: "I’m interested in a demo.",
    },
    {
      name: "Jack Hall",
      email: "jack.hall@example.com",
      phone: "222-333-4444",
      message: "Do you provide support services?",
    },
    {
      name: "Kathy Young",
      email: "kathy.young@example.com",
      phone: "333-444-5555",
      message: "Please follow up via email.",
    },
    {
      name: "Leo Adams",
      email: "leo.adams@example.com",
      phone: "444-555-6666",
      message: "I’d like to request a callback.",
    },
    {
      name: "Mia Evans",
      email: "mia.evans@example.com",
      phone: "555-666-7777",
      message: "How long does onboarding take?",
    },
    {
      name: "Noah Harris",
      email: "noah.harris@example.com",
      phone: "666-777-8888",
      message: "What are your working hours?",
    },
    {
      name: "Olivia Martin",
      email: "olivia.martin@example.com",
      phone: "777-888-9999",
      message: "I need urgent support.",
    },
    {
      name: "Paul Walker",
      email: "paul.walker@example.com",
      phone: "888-999-0000",
      message: "I’m exploring vendors.",
    },
    {
      name: "Quinn Lewis",
      email: "quinn.lewis@example.com",
      phone: "999-000-1111",
      message: "How can I get started?",
    },
    {
      name: "Ruby Clark",
      email: "ruby.clark@example.com",
      phone: "000-111-2222",
      message: "Please share documentation.",
    },
    {
      name: "Steve Wright",
      email: "steve.wright@example.com",
      phone: "101-202-3030",
      message: "Need help with setup.",
    },
    {
      name: "Tina Baker",
      email: "tina.baker@example.com",
      phone: "202-303-4040",
      message: "Can we collaborate?",
    },
    {
      name: "Umar Reed",
      email: "umar.reed@example.com",
      phone: "303-404-5050",
      message: "I’m interested in a free trial.",
    },
    {
      name: "Vera Long",
      email: "vera.long@example.com",
      phone: "404-505-6060",
      message: "Let’s arrange a meeting.",
    },
    {
      name: "Will Torres",
      email: "will.torres@example.com",
      phone: "505-606-7070",
      message: "Looking for pricing plans.",
    },
    {
      name: "Xena Ross",
      email: "xena.ross@example.com",
      phone: "606-707-8080",
      message: "Do you work internationally?",
    },
    {
      name: "Yuri Diaz",
      email: "yuri.diaz@example.com",
      phone: "707-808-9090",
      message: "Please send the PDF brochure.",
    },
    {
      name: "Zara Patel",
      email: "zara.patel@example.com",
      phone: "808-909-0101",
      message: "We’re considering your product.",
    },
    {
      name: "Andy Miles",
      email: "andy.miles@example.com",
      phone: "909-010-1212",
      message: "I need onboarding instructions.",
    },
    {
      name: "Bella Knox",
      email: "bella.knox@example.com",
      phone: "010-121-2323",
      message: "Is training included?",
    },
  ]);

  const [columnDefs] = useState<ColDef<Contact>[]>([
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
      flex: 1,
    },
    {
      field: "message",
      headerName: "Message",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
      flex: 1,
    },
  ]);

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

      {/* ✅ Table now BEFORE <Flex> section */}
      <div className="ag-theme-alpine mt-16 mx-auto w-[90%] h-[500px]">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
        />
      </div>

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
      props: {
        faqs: res?.data?.faqs ?? [],
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        faqs: [],
      },
      revalidate: 60,
    };
  }
};

export default ContactPage;
