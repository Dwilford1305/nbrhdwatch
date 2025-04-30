import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Box, Typography, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { useIncidents } from '../contexts/IncidentContext';
import { useAuth } from '../contexts/AuthContext';

const incidentTypes = [
  'Suspicious Activity',
  'Theft/Burglary',
  'Vandalism',
  'Noise Complaint',
  'Traffic/Parking Issue',
  'Lost/Found Pet',
  'Safety Hazard',
  'Other',
];

function IncidentReportForm({ open, handleClose }) {
  const { addIncident } = useIncidents();
  const { currentUser } = useAuth();
  const [incidentType, setIncidentType] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!incidentType) newErrors.incidentType = 'Incident type is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!dateTime) newErrors.dateTime = 'Date and time are required';
    if (!description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const incidentData = {
      type: incidentType,
      location: location.trim(),
      dateTime,
      description: description.trim(),
      reporter: currentUser?.username || 'Anonymous',
    };

    addIncident(incidentData);
    handleClose();
    setIncidentType('');
    setLocation('');
    setDateTime(new Date().toISOString().slice(0, 16));
    setDescription('');
    setErrors({});
  };

  const handleCancel = () => {
    handleClose();
    setIncidentType('');
    setLocation('');
    setDateTime(new Date().toISOString().slice(0, 16));
    setDescription('');
    setErrors({});
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Report an Incident</DialogTitle>
      <DialogContent>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          Please provide as much detail as possible. Remember to call 911 for emergencies.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal" required error={!!errors.incidentType}>
            <InputLabel id="incident-type-label">Type of Incident</InputLabel>
            <Select
              labelId="incident-type-label"
              id="incidentType"
              value={incidentType}
              label="Type of Incident"
              onChange={(e) => setIncidentType(e.target.value)}
            >
              {incidentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.incidentType && <Typography color="error" variant="caption">{errors.incidentType}</Typography>}
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location of Incident"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={!!errors.location}
            helperText={errors.location}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dateTime"
            label="Date and Time of Incident"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dateTime}
            helperText={errors.dateTime}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description of Incident"
            name="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit Report</Button>
      </DialogActions>
    </Dialog>
  );
}

export default IncidentReportForm;
