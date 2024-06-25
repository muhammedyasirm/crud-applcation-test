import { CREATE_EMPLOYEE, GET_EMPLOYEES } from "./apiConstants";
import axios from 'axios';

export const  createEmployee = async (data) => {
    return axios.post(CREATE_EMPLOYEE,data);
}

export const getEmployees = async () => {
    console.log("Get Employees called");
    return axios.get(GET_EMPLOYEES);
}