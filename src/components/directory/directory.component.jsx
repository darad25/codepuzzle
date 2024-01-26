// Install required packages: npm install react axios
import {DirectoryContainer } from './directory.styles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GasPriceTable() {
  const [gasPrices, setGasPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/gas-prices');
        setGasPrices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1800000); // Fetch data every half hour

    return () => clearInterval(interval);
  }, []);

  return (
    <DirectoryContainer>
      <h2>Gas Price Chronologically</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Med Gas Price</th>
          </tr>
        </thead>
        <tbody>
          {gasPrices.map((price) => (
            <tr key={price._id}>
              <td>{price.timestamp}</td>
              <td>{price.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ DirectoryContainer>
  );
}

export default GasPriceTable;
