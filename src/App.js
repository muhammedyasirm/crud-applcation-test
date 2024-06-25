import './App.css';
import HomePage from './components/Home';
import React, { useState, useEffect } from "react";
import Header from './components/partials/Header';
import { getEmployees } from './services/api';

function App() {  
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees(); // Fetch employees data from API
        setEmployees(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching employees:', error);
        // Handle error fetching employees
      }
    };

    fetchEmployees();
  }, []);
  return (
    <div className="App">
      <Header />
      <HomePage employees={employees}/>
    </div>
  );
}

export default App;
