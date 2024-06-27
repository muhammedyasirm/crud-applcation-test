import axios from 'axios';
import { API_URL } from './apiConstants';

export const getEmployees = async () => {
    try {
        let response = await axios.get(API_URL);
        return response;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(API_URL, employeeData);
        console.log('Employee created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

export const deleteEmployee = (id) => {
    try {
        return axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};