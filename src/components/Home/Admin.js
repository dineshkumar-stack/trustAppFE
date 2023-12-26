import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { RiFileExcel2Line } from "react-icons/ri";
import { MdBloodtype } from "react-icons/md";
import { MdOutlineContactPage } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
// import Spinner from "react-bootstrap/Spinner";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://trustappbe.onrender.com/api/DonationFroms"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
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
    return `${day}/${month}/${year}`;
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
    <div fluid className="table-section">
      <div>
        <div className="container mt-4">
          <Row>
            <h1 className="mt-3">Donor Information</h1>
            <Col>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Col>
            <Col>
              <button className="btn btn-primary mb-3" onClick={downloadExcel}>
                Download <RiFileExcel2Line style={{ marginBottom: "2px" }} />
              </button>
            </Col>
          </Row>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Contact No</th>
                  <th>Donor_Name</th>
                  <th>Age</th>
                  <th>
                    <MdBloodtype style={{ marginBottom: "2px" }} />
                  </th>
                  <th>Gender</th>
                  <th>Last Donate</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Added On</th>

                  {/* Add more table headers based on your data */}
                </tr>
              </thead>
              {loading ? (
                <tr>
                  <td colspan="9">
                    <div class="text-center">
                      <div class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colspan="9">Error: {error.message}</td>
                </tr>
              ) : (
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <MdOutlineContactPage style={{ marginBottom: "2px" }} />
                        {item.contact}
                      </td>
                      <td>
                        <IoMdContact style={{ marginBottom: "2px" }} />{" "}
                        {item.name}
                      </td>
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
              )}
            </table>
          </div>
          {/* Pagination */}
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
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
                  {currentPage}
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
