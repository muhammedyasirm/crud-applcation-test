import axios from 'axios';

export const getEmployees = async () => {
    let response = await axios.get('/api/employees');
    return response;
}

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post('/api/employees', employeeData);
        console.log('Employee created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await axios.put(`/api/employees/${id}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

export const deleteEmployee = (id) => {
    return axios.delete(`/api/employees/${id}`);
};