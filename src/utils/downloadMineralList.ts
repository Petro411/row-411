type Item = {
  _id: string;
  name: string;
  emails: string[];
  numbers: string[];
  addresses: string[];
  counties: string[];
  zipcode: string;
  description: string;
  state: {
    name: string;
    code: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const downloadMineralList = (data: Item[], filename = "data.csv") => {
  const headers = [
    "ID",
    "Name",
    "Emails",
    "Numbers",
    "Addresses",
    "Counties",
    "Zip Code",
    "Description",
    "State Name",
    "State Code",
    "Created At",
    "Updated At"
  ];

  const rows = data.map(item => [
    item._id,
    item.name,
    item.emails.join(", "),
    item.numbers.join(", "),
    item.addresses.join(", "),
    item.counties.join(", "),
    item.zipcode,
    item.description,
    item.state.name,
    item.state.code,
    new Date(item.createdAt).toLocaleString(),
    new Date(item.updatedAt).toLocaleString(),
  ]);

  const csvContent =
    [headers, ...rows]
      .map(row =>
        row.map(field =>
          `"${String(field).replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
