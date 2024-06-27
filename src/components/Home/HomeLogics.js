// useHomePageLogic.js
import { useState, useEffect } from "react";
import { getEmployees, deleteEmployee } from "../../services/api";

const useHomePageLogic = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedItemId, setEditedItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employees = await getEmployees();
                setData(employees.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchData();
    }, []);

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

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            const newData = data.filter((item) => item.id !== id);
            setData(newData);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const openModal = (employee) => {
        setEmployeeToDelete(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEmployeeToDelete(null);
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            handleDelete(employeeToDelete.id);
        }
    };

    const handleSave = (updatedData) => {
        if (editMode) {
            const updatedList = data.map((item) =>
                item.id === updatedData.id ? updatedData : item
            );
            setData(updatedList);
        } else {
            setData([...data, updatedData]);
        }
        handleCloseModal();
    };

    return {
        data,
        showModal,
        editMode,
        editedItemId,
        isModalOpen,
        employeeToDelete,
        handleEdit,
        handleCloseModal,
        handleDelete,
        openModal,
        closeModal,
        confirmDelete,
        handleSave,
    };
};

export default useHomePageLogic;
