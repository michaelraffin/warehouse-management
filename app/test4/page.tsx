"use client";
import React, { useRef } from "react";
import { FileText, Printer, Download } from "lucide-react";

const TableExportComponent = () => {
  const tableRef = useRef(null);

  // Sample data for demonstration
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      salary: "$75,000",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      salary: "$68,000",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Manager",
      salary: "$85,000",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Analyst",
      salary: "$62,000",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Developer",
      salary: "$72,000",
    },
  ];

  // Method 1: Browser Print (works great for printing)
  const handlePrint = () => {
    const printContent = tableRef.current;
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee Table</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            h1 {
              color: #333;
              margin-bottom: 20px;
            }
            @media print {
              body { margin: 0; }
              table { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <h1>Employee Information Report</h1>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Method 2: Generate PDF using jsPDF (client-side)
  const generatePDF = async () => {
    // This is a simplified version - you'd need to install jspdf and jspdf-autotable
    // For this demo, we'll create a downloadable HTML file that can be converted to PDF
    const tableHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee Table PDF</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            h1 {
              color: #333;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Employee Information Report</h1>
          ${tableRef.current.outerHTML}
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            Generated on: ${new Date().toLocaleString()}
          </p>
        </body>
      </html>
    `;

    const blob = new Blob([tableHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employee-table.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Method 3: Export as CSV
  const exportToCSV = () => {
    const headers = ["ID", "Name", "Email", "Role", "Salary"];
    const csvContent = [
      headers.join(","),
      ...sampleData.map((row) =>
        [
          row.id,
          `"${row.name}"`,
          `"${row.email}"`,
          `"${row.role}"`,
          `"${row.salary}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "employee-data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Employee Management
        </h1>

        {/* Export Controls */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Table
          </button>

          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            Export as HTML
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table ref={tableRef} className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                  {row.id}
                </td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                  {row.name}
                </td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                  {row.email}
                </td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                  {row.role}
                </td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">
                  {row.salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • <strong>Print Table:</strong> Opens a print-optimized version of
            the table
          </li>
          <li>
            • <strong>Export as HTML:</strong> Downloads an HTML file that can
            be opened in browser and saved as PDF
          </li>
          <li>
            • <strong>Export CSV:</strong> Downloads the table data as a CSV
            file for Excel/Sheets
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableExportComponent;
