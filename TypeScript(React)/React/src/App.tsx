import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import FormComponent from './FormComponent';
import TodoApp from './TodoApp';
import CheckForm from './CheckForm';
import { fetchData } from './api';
import './assets/css/style.css';
import './assets/css/style2.css';
import skyImage from './assets/images/Sky1.png';

interface ApiResponse {
  message: string;
}

const App: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

    const fetchApiData = async () => {
      try {
        const response = await fetchData();
        setData(response);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      }
    };

    fetchApiData();
  }, []);

  const showFormComponent = location.pathname !== '/check';

  return (
    <div className="App">
      <div className="background-image-container">
        <img src={skyImage} alt="Sky" className="background-image" />
      </div>
      <div className="container" id="main-container">
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/check" element={<CheckForm />} />
        </Routes>
      </div>
      {showFormComponent && (
        <div id="sidefrom" className="form-container">
          <FormComponent />
        </div>
      )}
      <div className="data-container">
        {error ? <p>{error}</p> : data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading data...</p>}
      </div>
    </div>
  );
};

export default App;
