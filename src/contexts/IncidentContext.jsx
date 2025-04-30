import React, { createContext, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const IncidentContext = createContext();

export const useIncidents = () => useContext(IncidentContext);

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([
    // Sample initial data (optional)
    { 
      id: uuidv4(), 
      type: 'Suspicious Activity', 
      location: 'Corner of Main St and Park Ave', 
      dateTime: new Date('2025-04-29T10:30:00').toISOString(), 
      description: 'Person looking into car windows.', 
      reporter: 'Jane D.', // In a real app, this would likely be a user ID
      status: 'New', 
      submittedAt: new Date().toISOString() 
    },
    { 
      id: uuidv4(), 
      type: 'Vandalism', 
      location: 'Community Park fence', 
      dateTime: new Date('2025-04-28T18:00:00').toISOString(), 
      description: 'Graffiti on the park fence near the entrance.', 
      reporter: 'John S.', 
      status: 'Investigating', 
      submittedAt: new Date(Date.now() - 86400000).toISOString() // Submitted yesterday
    },
  ]);

  const addIncident = useCallback((incidentData) => {
    const newIncident = {
      ...incidentData,
      id: uuidv4(),
      status: 'New', // Default status for new reports
      submittedAt: new Date().toISOString(),
      // reporter: // Get current user info here in a real app
    };
    setIncidents(prevIncidents => [newIncident, ...prevIncidents]);
    console.log("Incident submitted:", newIncident);
    // TODO: Add API call here to persist the incident
  }, []);

  const updateIncidentStatus = useCallback((incidentId, newStatus) => {
    setIncidents(prevIncidents => 
      prevIncidents.map(inc => 
        inc.id === incidentId ? { ...inc, status: newStatus } : inc
      )
    );
    console.log(`Incident ${incidentId} status updated to ${newStatus}`);
    // TODO: Add API call here to update status
  }, []);
  
  const deleteIncident = useCallback((incidentId) => {
    setIncidents(prevIncidents => prevIncidents.filter(inc => inc.id !== incidentId));
    console.log(`Incident ${incidentId} deleted`);
    // TODO: Add API call here to delete incident
  }, []);


  return (
    <IncidentContext.Provider value={{ incidents, addIncident, updateIncidentStatus, deleteIncident }}>
      {children}
    </IncidentContext.Provider>
  );
};
