import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersTable.css';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const userRole = localStorage.getItem('userRole'); // Dohvat uloge iz localStorage
  const isAuthenticated = localStorage.getItem('jwtToken'); // Dohvat statusa prijave

  useEffect(() => {
      async function fetchOrders() {
          try {
              const response = await axios.get('https://localhost:7073/api/Porudzbina', {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                  }
              });
              console.log('Fetched orders:', response.data);
              setOrders(response.data);
          } catch (error) {
              console.error('Error fetching orders:', error);
          }
      }

      async function fetchTransactions() {
          try {
              const response = await axios.get('https://localhost:7073/api/Payments/transactions', {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                  }
              });
              console.log('Fetched transactions:', response.data);
              setTransactions(response.data);
          } catch (error) {
              console.error('Error fetching transactions:', error);
          }
      }

      if (isAuthenticated && userRole === 'Admin') {
          fetchOrders();
          fetchTransactions();
      }
  }, [isAuthenticated, userRole]);

  const formatDate = (isoString) => {
      const date = new Date(isoString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('sr-RS', options);
  };

  // Provjera prijave i uloge prije renderiranja sadržaja
  if (!isAuthenticated) {
      return <p className="text-center mt-4">You have no access to this page.</p>;
  }

  if (userRole !== 'Admin') {
      return <p className="text-center mt-4">Unauthorized access. Only admins can view this page.</p>;
  }

  // Prikaz sadržaja za admina
  return (
      <div className="admin-panel">
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
                              <td>{order.kupacId}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          <div className="orders-table-container">
              <h2>Transactions</h2>
              <table className="orders-table">
                  <thead>
                      <tr>
                          <th>Transaction ID</th>
                          <th>Amount</th>
                          <th>Currency</th>
                          <th>Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      {transactions.map((transaction, index) => (
                          <tr key={index}>
                              <td>{transaction.id}</td>
                              <td>{transaction.amount}</td>
                              <td>{transaction.currency}</td>
                              <td>{formatDate(transaction.date)}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
};

export default OrdersTable;
