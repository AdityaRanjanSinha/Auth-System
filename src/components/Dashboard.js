// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>Welcome, {data.username}</h1>
      <p>Email: {data.email}</p>
    </div>
  );
};

export default Dashboard;
