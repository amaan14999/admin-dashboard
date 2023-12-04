import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import "./assets/DataTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faXmark,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editedRowData, setEditedRowData] = useState({});
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleBulkDelete = () => {
    const newData = data.filter((item) => !selectedRows[item.id]);
    setData(newData);
    setSelectedRows({});
  };

  const anyRowSelected = Object.values(selectedRows).some((value) => value);

  const handleEdit = (id) => {
    if (editRowId === id) {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, ...editedRowData[id] };
        }
        return item;
      });
      setData(updatedData);
      setEditRowId(null);
    } else {
      setEditRowId(id);
      setEditedRowData({ [id]: data.find((item) => item.id === id) });
    }
  };

  const handleFieldChange = (id, field, value) => {
    setEditedRowData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = () => {
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const newSelectedRows = { ...selectedRows };

    if (currentRows.every((item) => selectedRows[item.id])) {
      currentRows.forEach((item) => {
        newSelectedRows[item.id] = false;
      });
    } else {
      currentRows.forEach((item) => {
        newSelectedRows[item.id] = true;
      });
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    // setCurrentPage(1);
  };

  const filteredData = data.filter(
    (item) =>
      item.id.toString().toLowerCase().includes(searchQuery) ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery) ||
      item.role.toLowerCase().includes(searchQuery)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="data-table-container">
      <div className="search-delete-bar">
        <SearchBar onSearch={handleSearch} />
        <button
          onClick={handleBulkDelete}
          className="delete-bulk-btn"
          disabled={!anyRowSelected}
        >
          <FontAwesomeIcon icon={faTrashCan} className="" />
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item) => (
              <tr
                key={item.id}
                className={selectedRows[item.id] ? "highlighted-row" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={!!selectedRows[item.id]}
                    onChange={() => handleRowSelect(item.id)}
                  />
                </td>
                <td>{item.id}</td>
                <td>
                  {editRowId === item.id ? (
                    <input
                      className="edit-input"
                      type="text"
                      value={editedRowData[item.id]?.name || ""}
                      onChange={(e) =>
                        handleFieldChange(item.id, "name", e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleEdit(item.id)
                      }
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editRowId === item.id ? (
                    <input
                      className="edit-input"
                      type="email"
                      value={editedRowData[item.id]?.email || ""}
                      onChange={(e) =>
                        handleFieldChange(item.id, "email", e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleEdit(item.id)
                      }
                    />
                  ) : (
                    item.email
                  )}
                </td>
                <td>
                  {editRowId === item.id ? (
                    <input
                      className="edit-input"
                      type="text"
                      value={editedRowData[item.id]?.role || ""}
                      onChange={(e) =>
                        handleFieldChange(item.id, "role", e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleEdit(item.id)
                      }
                    />
                  ) : (
                    item.role
                  )}
                </td>
                <td>
                  {editRowId === item.id ? (
                    <>
                      <button
                        className="action-btn save-btn"
                        onClick={() => handleEdit(item.id)}
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} />
                      </button>
                      <button
                        className="action-btn cancel-btn"
                        onClick={() => setEditRowId(null)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(item.id)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="trash-icon"
                        />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <Pagination
          rowsPerPage={rowsPerPage}
          totalRows={filteredData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default DataTable;
