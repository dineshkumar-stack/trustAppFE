import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://trustappbe.onrender.com/api/DonationFroms"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page when performing a search
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year} ${month} ${day}`;
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DonationData");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "donationData.xlsx");
  };

  return (
    <div fluid className="about-section">
      <div style={{ backgroundColor: "#ffff", color: "black" }}>
        <div className="container mt-4">
          <h1>Donation Forms</h1>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="btn btn-primary mb-3" onClick={downloadExcel}>
            Download Excel
          </button>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Contact No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Blood Type</th>
                <th>Gender</th>
                <th>Last Donate</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Added On</th>

                {/* Add more table headers based on your data */}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.contact}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.bloodType}</td>
                  <td>{item.gender}</td>
                  <td>{formatDate(item.lastDonationDate)}</td>
                  <td>{item.address.state}</td>
                  <td>{item.address.zipCode}</td>
                  <td>{formatDate(item.timeStamp)}</td>

                  {/* Add more table data cells based on your data */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" disabled>
                  Page {currentPage}
                </button>
              </li>
              <li
                className={`page-item ${
                  indexOfLastItem >= filteredData.length && "disabled"
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
