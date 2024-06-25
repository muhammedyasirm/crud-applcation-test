import React, {useState} from "react";
import EmployeeModal from "./EmployeeModal/EmployeeModal";

const Header = () => {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };
  return (
    <div className="h-16 w-full flex justify-between p-5">
      <h2 className="font-bold text-2xl">Employee Salary Details</h2>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-full w-36 h-9"
      onClick={openModal}>
        Add Employee
      </button>
      <EmployeeModal showModal={showModal} onClose={closeModal} />
    </div>
  );
};

export default Header;
