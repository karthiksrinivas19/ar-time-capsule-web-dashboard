'use client';
import { useState, useEffect } from 'react';
import Map from '../../components/Map';

interface Memory {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  // Add other memory properties as needed
}

const Dashboard = () => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    // Replace this with actual API call to your backend
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setMemories(data);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  const handlePinClick = (id: string) => {
    // Handle pin click - show memory details
    console.log(`Memory ${id} clicked`);
  };

  return (
    <div className="dashboard">
      <h1>AR TimeCapsule Map</h1>
      <Map memories={memories} onPinClick={handlePinClick} />
    </div>
  );
};

export default Dashboard;
