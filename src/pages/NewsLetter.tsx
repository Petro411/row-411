import React, { useState, useMemo, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import NewsLetter from "@/components/NewsLetter";
import SiteHeader from "@/components/SiteHeader";
import PageHeader from "@/components/PageHeader";
import Head from "next/head";
import Footer from "@/components/Footer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface Contact {
  name: string;
  email: string;
}

const News: React.FC = () => {
  const gridRef = useRef<AgGridReact<Contact>>(null);

  const [rowData] = useState<Contact[]>([
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
    { name: "Bob Brown", email: "bob.brown@example.com" },
    { name: "Carol White", email: "carol.white@example.com" },
    { name: "David Black", email: "david.black@example.com" },
    { name: "Emma Stone", email: "emma.stone@example.com" },
    { name: "Frank Green", email: "frank.green@example.com" },
    { name: "Grace Lee", email: "grace.lee@example.com" },
    { name: "Henry Kim", email: "henry.kim@example.com" },
    { name: "Isla Scott", email: "isla.scott@example.com" },
    { name: "Jack Hall", email: "jack.hall@example.com" },
    { name: "Kathy Young", email: "kathy.young@example.com" },
    { name: "Leo Adams", email: "leo.adams@example.com" },
    { name: "Mia Evans", email: "mia.evans@example.com" },
    { name: "Noah Harris", email: "noah.harris@example.com" },
    { name: "Olivia Martin", email: "olivia.martin@example.com" },
    { name: "Paul Walker", email: "paul.walker@example.com" },
    { name: "Quinn Lewis", email: "quinn.lewis@example.com" },
    { name: "Ruby Clark", email: "ruby.clark@example.com" },
    { name: "Steve Wright", email: "steve.wright@example.com" },
    { name: "Tina Baker", email: "tina.baker@example.com" },
    { name: "Umar Reed", email: "umar.reed@example.com" },
    { name: "Vera Long", email: "vera.long@example.com" },
    { name: "Will Torres", email: "will.torres@example.com" },
    { name: "Xena Ross", email: "xena.ross@example.com" },
    { name: "Yuri Diaz", email: "yuri.diaz@example.com" },
    { name: "Zara Patel", email: "zara.patel@example.com" },
    { name: "Andy Miles", email: "andy.miles@example.com" },
    { name: "Bella Knox", email: "bella.knox@example.com" },
  ]);
  const [columnDefs] = useState<ColDef<ContactRow>[]>([
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
    },
  ]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      flex: 1,
      minWidth: 100,
      resizable: true,
      filter: true,
      sortable: true,
    }),
    []
  );

  const onGridReady = useCallback(() => {
    // optional: auto-size columns
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  return (
    <div>
      <Head>
        <title>News Lasters</title>
      </Head>
      <SiteHeader />
      <PageHeader
        title="News Lasters"
        description="Choose the plan that fits your needs. Petro411 offers flexible pricing with access to accurate mineral owner data to streamline your land acquisition process."
      />
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:justify-between mb-4 gap-2 ml-10 ">
          <h2 className="text-3xl font-bold pt-4">Client Data Table</h2>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-3 w-full sm:w-2/3"
            placeholder="Search all columns..."
          />
        </div>

        <div className="mx-6 mb-8 bg-white rounded-xl shadow-lg p-4">
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact<Contact>
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              onGridReady={onGridReady}
            />
          </div>
        </div>

        <NewsLetter />
      </div>
      <Footer />
    </div>
  );
};

export default News;
