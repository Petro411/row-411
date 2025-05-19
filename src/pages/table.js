'use client'
import React, { useMemo, useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import { AgGridReact } from 'ag-grid-react';

import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import SiteHeader from '@/components/SiteHeader';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Table = () => {
    const gridRef = useRef();

    const [rowData] = useState([
        { id: 1, name: "John Doe", age: 30, email: "john@example.com", country: "USA", active: true, salary: 55000 },
        { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com", country: "Canada", active: false, salary: 48000 },
        { id: 3, name: "Bob Johnson", age: 40, email: "bob@example.com", country: "UK", active: true, salary: 61000 },
        { id: 4, name: "Alice Brown", age: 22, email: "alice@example.com", country: "USA", active: true, salary: 52000 },
        { id: 5, name: "Tom White", age: 29, email: "tom@example.com", country: "Germany", active: false, salary: 46000 },
        { id: 6, name: "Sara Green", age: 31, email: "sara@example.com", country: "Canada", active: true, salary: 58000 },
        { id: 7, name: "Michael Black", age: 27, email: "michael@example.com", country: "UK", active: false, salary: 49000 },
        { id: 8, name: "Laura Blue", age: 35, email: "laura@example.com", country: "Australia", active: true, salary: 60000 },
        { id: 9, name: "Peter Parker", age: 28, email: "peter@example.com", country: "USA", active: true, salary: 53000 },
        { id: 10, name: "Nancy Drew", age: 26, email: "nancy@example.com", country: "Canada", active: false, salary: 47000 },
        { id: 11, name: "Clark Kent", age: 33, email: "clark@example.com", country: "USA", active: true, salary: 65000 },
        { id: 12, name: "Diana Prince", age: 29, email: "diana@example.com", country: "UK", active: true, salary: 62000 },
        { id: 13, name: "Bruce Wayne", age: 42, email: "bruce@example.com", country: "Germany", active: false, salary: 70000 },
        { id: 14, name: "Tony Stark", age: 38, email: "tony@example.com", country: "USA", active: true, salary: 80000 },
        { id: 15, name: "Steve Rogers", age: 36, email: "steve@example.com", country: "Canada", active: false, salary: 62000 },
        { id: 16, name: "Natasha Romanoff", age: 30, email: "natasha@example.com", country: "UK", active: true, salary: 59000 },
        { id: 17, name: "Bruce Banner", age: 35, email: "bruceb@example.com", country: "Germany", active: true, salary: 61000 },
        { id: 18, name: "Wanda Maximoff", age: 28, email: "wanda@example.com", country: "USA", active: false, salary: 54000 },
        { id: 19, name: "Vision", age: 31, email: "vision@example.com", country: "Canada", active: true, salary: 63000 },
        { id: 20, name: "Scott Lang", age: 27, email: "scott@example.com", country: "UK", active: false, salary: 48000 },
        { id: 21, name: "Peter Quill", age: 33, email: "peterq@example.com", country: "USA", active: true, salary: 57000 },
        { id: 22, name: "Gamora", age: 29, email: "gamora@example.com", country: "Germany", active: false, salary: 52000 },
        { id: 23, name: "Rocket Raccoon", age: 31, email: "rocket@example.com", country: "Canada", active: true, salary: 56000 },
        { id: 24, name: "Groot", age: 40, email: "groot@example.com", country: "USA", active: true, salary: 58000 },
        { id: 25, name: "Nebula", age: 34, email: "nebula@example.com", country: "UK", active: false, salary: 49000 },
        { id: 26, name: "Drax", age: 37, email: "drax@example.com", country: "Germany", active: true, salary: 60000 },
        { id: 27, name: "Mantis", age: 25, email: "mantis@example.com", country: "Canada", active: true, salary: 47000 },
        { id: 28, name: "Loki", age: 45, email: "loki@example.com", country: "USA", active: false, salary: 72000 },
        { id: 29, name: "Thor", age: 38, email: "thor@example.com", country: "UK", active: true, salary: 81000 },
        { id: 30, name: "Hulk", age: 36, email: "hulk@example.com", country: "Germany", active: true, salary: 67000 },
        { id: 31, name: "Black Widow", age: 29, email: "blackwidow@example.com", country: "Canada", active: true, salary: 59000 },
        { id: 32, name: "Captain Marvel", age: 33, email: "captainmarvel@example.com", country: "USA", active: false, salary: 78000 },
        { id: 33, name: "Falcon", age: 31, email: "falcon@example.com", country: "UK", active: true, salary: 60000 },
        { id: 34, name: "Winter Soldier", age: 35, email: "winter@example.com", country: "Germany", active: true, salary: 62000 },
        { id: 35, name: "Ant-Man", age: 28, email: "antman@example.com", country: "Canada", active: false, salary: 51000 },
        { id: 36, name: "Wasp", age: 27, email: "wasp@example.com", country: "USA", active: true, salary: 50000 },
        { id: 37, name: "Doctor Strange", age: 40, email: "strange@example.com", country: "UK", active: true, salary: 83000 },
        { id: 38, name: "Spider-Man", age: 26, email: "spiderman@example.com", country: "Germany", active: false, salary: 54000 },
        { id: 39, name: "Nick Fury", age: 45, email: "fury@example.com", country: "Canada", active: true, salary: 90000 },
        { id: 40, name: "Maria Hill", age: 34, email: "maria@example.com", country: "USA", active: false, salary: 68000 },
    ]);


    const [columnDefs] = useState([
        {
            headerName: 'Select',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 60,
            pinned: 'left',
            suppressMenu: true,
            sortable: false,
            filter: false,
        },
        { field: 'id', headerName: 'ID', sortable: true, filter: 'agNumberColumnFilter', resizable: true, maxWidth: 90 },
        { field: 'name', headerName: 'Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, resizable: true },
        { field: 'age', headerName: 'Age', sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true, resizable: true, maxWidth: 100 },
        { field: 'email', headerName: 'Email', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, resizable: true },
        {
            field: 'country',
            headerName: 'Country',
            sortable: true,
            filter: 'agSetColumnFilter',
            floatingFilter: true,
            resizable: true,
        },
        {
            field: 'active',
            headerName: 'Active',
            sortable: true,
            filter: 'agSetColumnFilter',
            floatingFilter: true,
            resizable: true,
            cellRenderer: (params) => (params.value ? '✅' : '❌'),
            maxWidth: 100,
        },
        {
            field: 'salary',
            headerName: 'Salary ($)',
            sortable: true,
            filter: 'agNumberColumnFilter',
            floatingFilter: true,
            resizable: true,
            aggFunc: 'sum',
            valueFormatter: (params) => params.value.toLocaleString(),
        },
    ]);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        floatingFilter: true,
        resizable: true,
    }), []);

    const [quickFilterText, setQuickFilterText] = useState('');

    // State for selected rows count
    const [selectedCount, setSelectedCount] = useState(0);

    // State for filtered rows count
    const [filteredCount, setFilteredCount] = useState(rowData.length);

    const onQuickFilterChange = useCallback((e) => {
        setQuickFilterText(e.target.value);
    }, []);

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        setSelectedCount(selectedRows.length);
    }, []);

    const onFilterChanged = useCallback(() => {
        const filteredRows = gridRef.current.api.getDisplayedRowCount();
        setFilteredCount(filteredRows);
    }, []);

    return (
        <main className="bg-gray-50 min-h-screen text-gray-800">
            <Head>
                <title>Table</title>
            </Head>
            <SiteHeader />
            <PageHeader
                title="Table"
                description="This Client Data Table provides an easy way to manage detailed client information with advanced filtering, sorting, and selection features."
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">



                <div className="flex flex-col  sm:justify-between mb-4 gap-2 px-6">
                    <h2 className="text-3xl font-bold">Client Data Table</h2>

                    {/* Quick filter input */}
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md p-4 w-full sm:w-2/3"
                        placeholder="Search all columns..."
                        value={quickFilterText}
                        onChange={onQuickFilterChange}
                    />
                </div>




                {/* AG Grid Table */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div
                        className="ag-theme-alpine"
                        style={{ height: 600, width: '100%' }}
                    >
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            quickFilterText={quickFilterText}
                            pagination={true}
                            paginationPageSize={10}
                            rowSelection="multiple"
                            suppressRowClickSelection={true}
                            animateRows={true}
                            groupIncludeFooter={true}
                            onSelectionChanged={onSelectionChanged}
                            onFilterChanged={onFilterChanged}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                    { statusPanel: 'agFilteredRowCountComponent' },
                                    { statusPanel: 'agSelectedRowCountComponent' },
                                    { statusPanel: 'agAggregationComponent' },
                                ],
                            }}
                            sideBar={{
                                toolPanels: ['columns', 'filters'],
                                defaultToolPanel: 'filters',
                            }}
                        />
                    </div>

                    {/* Summary Panel Below Table */}
                    <div className="mt-4 border-t pt-3 flex flex-wrap gap-6 text-gray-700 text-sm font-medium">
                        <div>Total Rows: <span className="font-semibold">{rowData.length}</span></div>
                        <div>Filtered Rows: <span className="font-semibold">{filteredCount}</span></div>
                        <div>Selected Rows: <span className="font-semibold">{selectedCount}</span></div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Table;
