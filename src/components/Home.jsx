import React, { useState, useEffect } from "react";
import EmployeeModal from "./partials/EmployeeModal/EmployeeModal";
import { getEmployees } from "../services/api";

const HomePage = ({ employees }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);

//   useEffect(() => {
//     console.log("Initially called the useEffect");
//     const fetchData = async () => {
//       try {
//         const employees = await getEmployees();
//         console.log("Employees = > ", employees);
//         setData(employees);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//         // Handle error fetching employees
//       }
//     };

//     fetchData();
//   }, []);

useEffect(() => {
    setData(employees);
  }, [employees]);

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditMode(true);
      setEditedItemId(id);
      setShowModal(true);
    } else {
      console.error(`Item with ID ${id} not found.`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditedItemId(null);
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleSave = (updatedData) => {
    const updatedList = data.map((item) =>
      item.id === updatedData.id
        ? { ...item, name: updatedData.name, salary: updatedData.salary }
        : item
    );
    setData(updatedList);
    handleCloseModal();
  };

  return (
    <div className="flex justify-center">
      <table className="table-auto w-2/3 mt-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Salary</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log("Data:", data)}
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.salary}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmployeeModal
        showModal={showModal}
        onClose={handleCloseModal}
        isEditMode={editMode}
        initialData={data.find((item) => item.id === editedItemId)}
        onSave={handleSave}
      />
    </div>
  );
};

export default HomePage;
