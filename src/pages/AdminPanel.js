import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersTable.css';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('https://localhost:7073/api/Porudzbina', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        console.log('Fetched orders:', response.data); // Check the structure of the data
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="orders-table-container">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Delivery Address</th>
            <th>Payment Date</th>
            <th>Customer ID</th>
   
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.datumPorudzbine}</td>
              <td>{order.adresaPorudzbine}</td>
              <td>{order.datumPlacanja}</td>
              <td>{order.kupacId}</td> {/* Check if kupac exists */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
