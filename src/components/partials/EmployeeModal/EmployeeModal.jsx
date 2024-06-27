import React, { useState, useEffect } from "react";
import "./styles.css";
import { createEmployee, updateEmployee } from "../../../services/api";

const EmployeeModal = ({
  showModal,
  onClose,
  isEditMode,
  initialData,
  onSave,
}) => {
  const [fullName, setFullName] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName || '');
      setSalary(initialData.salary || '');
    } else {
      setFullName('');
      setSalary('');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = { fullName, salary };

    try {
      if (isEditMode) {
        await updateEmployee(initialData.id, employeeData);
        onSave({ ...initialData, fullName, salary });
      } else {
        const createdEmployee = await createEmployee(employeeData);
        onSave(createdEmployee);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save employee:', error);
      // Optionally, handle error state here
    }
  };

  const handleCancel = () => {
    // Reset form fields if needed
    setFullName("");
    setSalary("");
    // Close the modal on cancel
    onClose();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{isEditMode ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Enter Employee Name
            </label>
            <input
              className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none 
      focus:shadow-outline"
              type="text"
              placeholder="Employee Name"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="Salary"
            >
              Enter Salary
            </label>
            <input
              className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none 
      focus:shadow-outline"
              id="salary"
              value={salary}
              type="text"
              placeholder="Salary"
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <br />
          <br />

          <button className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-full w-36 h-9">
            {isEditMode ? "Update" : "Submit"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded-full w-36 h-9"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div >
    </div >
  );
};

export default EmployeeModal;
