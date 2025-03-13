'use client';
import { useState } from 'react';
import Map from '../../components/Map';

interface Memory {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
}

const Dashboard = () => {
  // Static test data
  const testMemories: Memory[] = [
    {
      id: '1',
      latitude: 51.505,
      longitude: -0.09,
      title: 'London Memory'
    },
    {
      id: '2',
      latitude: 40.7128,
      longitude: -74.0060,
      title: 'New York Memory'
    },
    {
      id: '3',
      latitude: 35.6762,
      longitude: 139.6503,
      title: 'Tokyo Memory'
    }
  ];

  const handlePinClick = (id: string) => {
    console.log(`Memory ${id} clicked`);
  };

  return (
    <div className="dashboard">
      <h1>AR TimeCapsule Map</h1>
      <Map memories={testMemories} onPinClick={handlePinClick} />
    </div>
  );
};

export default Dashboard;
