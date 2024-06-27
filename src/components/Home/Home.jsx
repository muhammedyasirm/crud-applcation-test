import React from "react";
import EmployeeModal from "../partials/EmployeeModal/EmployeeModal";
import Header from "../partials/Header";
import ConfirmDeleteModal from "../partials/EmployeeModal/ConfirmModal";
import useHomePageLogic from "./HomeLogics";

const HomePage = () => {
  const {
    data,
    showModal,
    editMode,
    editedItemId,
    isModalOpen,
    employeeToDelete,
    handleEdit,
    handleCloseModal,
    openModal,
    closeModal,
    confirmDelete,
    handleSave,
  } = useHomePageLogic();

  return (

    <div>
      <Header onSave={handleSave} />
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
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.fullName}</td>
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
                    onClick={() => openModal(item)}
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
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          employeeName={employeeToDelete?.fullName}
          onConfirm={confirmDelete}
          onCancel={closeModal}
        />
      </div>
    </div>
  );
};

export default HomePage;
