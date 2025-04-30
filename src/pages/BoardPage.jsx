import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography, Box, Paper, List, ListItem, ListItemText,
  Button, TextField, IconButton, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Divider, CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBoards } from '../contexts/BoardContext';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';

function BoardPage() {
  const { boardId } = useParams();
  const { boards, messages, addMessage, deleteMessage } = useBoards();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [newMessage, setNewMessage] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');

  const board = boards.find(b => b.id === boardId);
  const boardMessages = messages?.[boardId] || [];

  const handleAddMessage = () => {
    if (newMessage.trim() && boardId && isAuthenticated && user) {
      const messageData = {
        text: newMessage.trim(),
        author: user.name || user.nickname || user.email,
        authorId: user.sub,
      };
      addMessage(boardId, messageData);
      setNewMessage('');
    } else {
      console.error("Message cannot be empty or user not logged in.");
    }
  };

  const openDeleteConfirm = (message) => {
    setMessageToDelete(message);
    setDeleteReason('');
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setMessageToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleDeleteMessage = () => {
    if (messageToDelete && boardId && deleteReason.trim()) {
      // TODO: API call to delete message and notify user
      deleteMessage(boardId, messageToDelete.id, deleteReason.trim());
    }
    closeDeleteConfirm();
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading board...</Typography>
      </Container>
    );
  }

  if (!board) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5">Board not found.</Typography>
        <Button component={RouterLink} to="/members" startIcon={<ArrowBackIcon />}>
          Back to Member Area
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button component={RouterLink} to="/members" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back to Member Area
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        {board.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {board.description}
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Post a New Message</Typography>
        <TextField
          label="Your Message"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ mb: 2 }}
          disabled={!isAuthenticated}
        />
        <Button 
          variant="contained" 
          onClick={handleAddMessage} 
          disabled={!isAuthenticated || !newMessage.trim()}
        >
          Post Message
        </Button>
        {!isAuthenticated && <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}> (Log in to post)</Typography>}
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom>
        Messages
      </Typography>
      <Paper elevation={1} sx={{ p: 2 }}>
        {boardMessages.length === 0 ? (
          <Typography color="text.secondary">No messages yet. Be the first to post!</Typography>
        ) : (
          <List>
            {boardMessages.map((msg) => (
              <React.Fragment key={msg.id}>
                <ListItem 
                  alignItems="flex-start"
                  secondaryAction={
                    isAuthenticated && user && user.sub === msg.authorId && (
                      <IconButton edge="end" aria-label="delete" onClick={() => openDeleteConfirm(msg)}>
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemText
                    primary={msg.text}
                    secondary={`Posted by ${msg.author} on ${new Date(msg.timestamp).toLocaleString()}`}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      <Dialog
        open={deleteConfirmOpen}
        onClose={closeDeleteConfirm}
        aria-labelledby="delete-confirm-dialog-title"
      >
        <DialogTitle id="delete-confirm-dialog-title">
          {"Confirm Message Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to delete this message? Please provide a reason for deletion (this will be sent to the user).
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason for Deletion"
            type="text"
            fullWidth
            variant="standard"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm}>Cancel</Button>
          <Button
            onClick={handleDeleteMessage}
            color="error"
            disabled={!deleteReason.trim()}
          >
            Delete Message
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}

export default BoardPage;
