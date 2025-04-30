import React, { useState } from 'react';
import { 
  Container, Typography, Box, Tabs, Tab, Paper, 
  TextField, Switch, FormControlLabel, FormGroup, Button, 
  List, ListItem, ListItemText, ListItemIcon, IconButton, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, Divider, 
  Accordion, AccordionSummary, AccordionDetails, 
  Checkbox, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Select, MenuItem, FormControl, InputLabel,
  useMediaQuery, // Added
  Card, CardContent, CardActions, Grid // Added
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Added
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArticleIcon from '@mui/icons-material/Article';
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // Icon for incidents
import { useBoards } from '../contexts/BoardContext';
import { useAuth } from '../contexts/AuthContext';
import { useIncidents } from '../contexts/IncidentContext'; // Import useIncidents

// --- User Management Component ---
function UserManagement() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([
    { id: 'user123', username: 'Current User', email: 'current@example.com', role: 'Admin', status: 'Active', joined: '2025-01-15' },
    { id: 'user456', username: 'Jane D.', email: 'jane@example.com', role: 'Member', status: 'Active', joined: '2025-02-20' },
    { id: 'user789', username: 'John S.', email: 'john@example.com', role: 'Member', status: 'Suspended', joined: '2025-03-10' },
    { id: 'userABC', username: 'Newbie', email: 'new@example.com', role: 'Member', status: 'Active', joined: '2025-04-25' },
  ]);
  const [deleteUserConfirmOpen, setDeleteUserConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const theme = useTheme(); // Added
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Added

  const handleRoleChange = (userId, newRole) => {
    console.log(`Changing role for user ${userId} to ${newRole}`);
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
  };

  const handleStatusChange = (userId, newStatus) => {
    console.log(`Changing status for user ${userId} to ${newStatus}`);
    setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
  };

  const openDeleteUserConfirm = (user) => {
    setUserToDelete(user);
    setDeleteUserConfirmOpen(true);
  };

  const closeDeleteUserConfirm = () => {
    setUserToDelete(null);
    setDeleteUserConfirmOpen(false);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      console.log(`Deleting user ${userToDelete.username} (ID: ${userToDelete.id})`);
      setUsers(users.filter(user => user.id !== userToDelete.id));
    }
    closeDeleteUserConfirm();
  };

  if (currentUser?.role !== 'Admin') {
    return <Typography sx={{ p: 2 }}>Access Denied. You must be an admin to manage users.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h6" gutterBottom>Manage Users</Typography>

      {isMobile ? (
        <Grid container spacing={2} justifyContent="center"> {/* Center grid items */}
          {users.map((user) => (
            <Grid item xs={12} sm={8} md={6} key={user.id}> {/* Adjust item width and center */}
              <Card variant="outlined" sx={{ width: '100%' }}> {/* Ensure card takes item width */}
                <CardContent>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    {user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {user.email}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                    <FormControl size="small" variant="standard" sx={{ minWidth: 100 }}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={user.id === currentUser.id}
                        label="Role"
                      >
                        <MenuItem value="Member">Member</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        disabled={user.id === currentUser.id}
                        label="Status"
                      >
                        <MenuItem value="Active">
                          <CheckCircleIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} color="success" /> Active
                        </MenuItem>
                        <MenuItem value="Suspended">
                          <BlockIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} color="error" /> Suspended
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography variant="caption" display="block" color="text.secondary">
                    Joined: {user.joined}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton 
                    size="small" 
                    aria-label="delete user" 
                    color="error" 
                    onClick={() => openDeleteUserConfirm(user)}
                    disabled={user.id === currentUser.id}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} elevation={2} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="user management table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      size="small"
                      variant="standard"
                      disabled={user.id === currentUser.id}
                    >
                      <MenuItem value="Member">Member</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      size="small"
                      variant="standard"
                      disabled={user.id === currentUser.id}
                    >
                      <MenuItem value="Active">
                        <CheckCircleIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} color="success" /> Active
                      </MenuItem>
                      <MenuItem value="Suspended">
                        <BlockIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} color="error" /> Suspended
                      </MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      aria-label="delete user" 
                      color="error" 
                      onClick={() => openDeleteUserConfirm(user)}
                      disabled={user.id === currentUser.id}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={deleteUserConfirmOpen}
        onClose={closeDeleteUserConfirm}
        aria-labelledby="delete-user-dialog-title"
      >
        <DialogTitle id="delete-user-dialog-title">
          {"Confirm User Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user "{userToDelete?.username}"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteUserConfirm}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error" autoFocus>
            Delete User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
// --- End User Management Component ---

// --- Board Management Component ---
function BoardManagement() {
  const { boards, addBoard, deleteBoard, messages, deleteMessage } = useBoards();
  const { currentUser } = useAuth();
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');
  const [deleteBoardConfirmOpen, setDeleteBoardConfirmOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [deleteMessageConfirmOpen, setDeleteMessageConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [currentBoardIdForMessage, setCurrentBoardIdForMessage] = useState(null);

  const handleAddBoard = () => {
    if (newBoardName.trim() && newBoardDesc.trim()) {
      addBoard(newBoardName.trim(), newBoardDesc.trim());
      setNewBoardName('');
      setNewBoardDesc('');
    } else {
      console.error("Board name and description cannot be empty.");
    }
  };

  const openDeleteBoardConfirm = (board) => {
    setBoardToDelete(board);
    setDeleteBoardConfirmOpen(true);
  };

  const closeDeleteBoardConfirm = () => {
    setBoardToDelete(null);
    setDeleteBoardConfirmOpen(false);
  };

  const handleDeleteBoard = () => {
    if (boardToDelete) {
      deleteBoard(boardToDelete.id);
      console.log(`Board "${boardToDelete.name}" deleted.`);
    }
    closeDeleteBoardConfirm();
  };

  const openDeleteMessageConfirm = (message, boardId) => {
    setMessageToDelete(message);
    setCurrentBoardIdForMessage(boardId);
    setDeleteReason('');
    setDeleteMessageConfirmOpen(true);
  };

  const closeDeleteMessageConfirm = () => {
    setMessageToDelete(null);
    setCurrentBoardIdForMessage(null);
    setDeleteMessageConfirmOpen(false);
  };

  const handleDeleteMessage = () => {
    if (messageToDelete && currentBoardIdForMessage && deleteReason.trim()) {
      console.log(`Admin deleting message ID: ${messageToDelete.id} from board ID: ${currentBoardIdForMessage}`);
      console.log(`Reason: ${deleteReason}`);
      console.log(`(Placeholder) Emailing user ${messageToDelete.author} about deletion.`);
      deleteMessage(currentBoardIdForMessage, messageToDelete.id, deleteReason.trim());
    }
    closeDeleteMessageConfirm();
  };

  if (currentUser?.role !== 'Admin') {
    return <Typography sx={{ p: 2 }}>Access Denied. You must be an admin to manage boards and messages.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h6" gutterBottom>Manage Message Boards & Messages</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3, alignItems: 'stretch' }}>
        <TextField
          label="New Board Name"
          variant="outlined"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newBoardDesc}
          onChange={(e) => setNewBoardDesc(e.target.value)}
          size="small"
          sx={{ flexGrow: 2 }}
        />
        <Button 
          variant="contained" 
          onClick={handleAddBoard} 
          startIcon={<AddIcon />} 
          sx={{ height: { xs: 'auto', sm: '40px' }, mt: { xs: 1, sm: 0 } }}
        >
          Add Board
        </Button>
      </Box>

      <Typography variant="subtitle1" gutterBottom>Existing Boards & Messages</Typography>
      {boards.map((board) => (
        <Accordion key={board.id} sx={{ mb: 1 }}>
          <AccordionSummary
            component="div" // Add this to render as a div
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${board.id}-content`}
            id={`panel-${board.id}-header`}
            // Add sx for cursor pointer to maintain click affordance
            sx={{ 
              '& .MuiAccordionSummary-content': { alignItems: 'center' }, // Align items vertically
              cursor: 'pointer' // Keep the pointer cursor
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Use Box for text content to allow clicking the whole summary to expand */}
              <Box 
                onClick={(event) => {
                  // Find the button element within the summary and click it programmatically
                  // This is a workaround to trigger the expand/collapse when clicking the text area
                  const summaryButton = event.currentTarget.closest('.MuiAccordionSummary-root');
                  if (summaryButton && event.target === event.currentTarget) { // Only trigger if clicking the Box itself
                     // We need a way to trigger the accordion toggle. 
                     // Since AccordionSummary is now a div, we might need to manage the expanded state manually
                     // OR find the underlying button/mechanism if MUI still provides one.
                     // For now, let's just ensure the structure is valid.
                     // A better approach might involve controlling the Accordion's expanded state.
                  }
                }}
                sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }} // Allow text area to grow
              >
                <ListItemText primary={board.name} secondary={board.description} sx={{ mr: 2 }} />
              </Box>
              <IconButton 
                edge="end" 
                aria-label="delete board" 
                onClick={(event) => { 
                  event.stopPropagation(); // Keep this to prevent clicks on icon bubbling up
                  openDeleteBoardConfirm(board); 
                }}
                sx={{ ml: 'auto', flexShrink: 0 }} // Prevent icon from shrinking
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: { xs: 1, sm: 2 } }}>
            <List dense>
              {(messages[board.id] || []).length > 0 ? (
                (messages[board.id] || []).map((msg) => (
                  <React.Fragment key={msg.id}>
                    <ListItem
                      component="div" // Ensure ListItem renders as a div, not a button
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete message" onClick={() => openDeleteMessageConfirm(msg, board.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={msg.text}
                        secondary={`By ${msg.author} (${new Date(msg.timestamp).toLocaleString()})`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No messages on this board yet." />
                </ListItem>
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog
        open={deleteBoardConfirmOpen}
        onClose={closeDeleteBoardConfirm}
        aria-labelledby="delete-board-dialog-title"
      >
        <DialogTitle id="delete-board-dialog-title">
          {"Confirm Board Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the board "{boardToDelete?.name}"? 
            This action cannot be undone and will delete all associated messages.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteBoardConfirm}>Cancel</Button>
          <Button onClick={handleDeleteBoard} color="error" autoFocus>
            Delete Board
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteMessageConfirmOpen}
        onClose={closeDeleteMessageConfirm}
        aria-labelledby="delete-message-dialog-title"
      >
        <DialogTitle id="delete-message-dialog-title">
          {"Confirm Message Deletion (Admin)"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            You are deleting a message by "{messageToDelete?.author}". Please provide a reason for deletion (this will be sent to the user).
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason-admin"
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
          <Button onClick={closeDeleteMessageConfirm}>Cancel</Button>
          <Button
            onClick={handleDeleteMessage}
            color="error"
            disabled={!deleteReason.trim()}
          >
            Delete Message
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
// --- End Board Management Component ---

// --- Site Settings Component ---
function SiteSettings() {
  const [siteName, setSiteName] = useState('Neighborhood Watch');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistrations, setAllowRegistrations] = useState(true);

  const handleSaveSettings = () => {
    console.log('Saving settings:', { siteName, maintenanceMode, allowRegistrations });
    // TODO: Implement actual saving logic (e.g., API call)
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h6" gutterBottom>Site Configuration</Typography>
      <FormGroup sx={{ mb: 3 }}>
        <TextField
          label="Site Name"
          variant="outlined"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Switch checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} />}
          label="Enable Maintenance Mode"
        />
        <FormControlLabel
          control={<Switch checked={allowRegistrations} onChange={(e) => setAllowRegistrations(e.target.checked)} />}
          label="Allow New User Registrations"
        />
      </FormGroup>
      
      <Button variant="contained" onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </Box>
  );
}
// --- End Site Settings Component ---

// --- Activity & Alerts Management Component ---
function ActivityAlertsManagement() {
  const [alertText, setAlertText] = useState('');
  const [sendPush, setSendPush] = useState(false);
  const { alerts, addAlert } = useBoards();
  const { currentUser } = useAuth();

  const handlePostAlert = () => {
    if (!alertText.trim()) {
      console.error("Alert text cannot be empty.");
      return;
    }
    const alertData = {
      text: alertText.trim(),
      pushed: sendPush,
      author: currentUser?.username || 'Admin'
    };
    addAlert(alertData);
    console.log('Posting Alert via context:', alertData);
    setAlertText('');
    setSendPush(false);
    // TODO: Add API call here to persist alert
  };

  if (currentUser?.role !== 'Admin') {
    return <Typography sx={{ p: 2 }}>Access Denied. You must be an admin to manage alerts.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h6" gutterBottom>Post New Alert</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          label="Alert Message"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={alertText}
          onChange={(e) => setAlertText(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={sendPush} onChange={(e) => setSendPush(e.target.checked)} />}
          label="Send Push Notification to All Users"
        />
        <Button
          variant="contained"
          onClick={handlePostAlert}
          startIcon={<SendIcon />}
          disabled={!alertText.trim()}
          sx={{ alignSelf: 'flex-start' }}
        >
          Post Alert
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>Past Alerts & Notifications</Typography>
      <Paper elevation={1} sx={{ maxHeight: 400, overflow: 'auto', p: { xs: 1, sm: 2 } }}>
        <List dense>
          {alerts.length === 0 ? (
            <ListItem>
              <ListItemText primary="No past alerts found." />
            </ListItem>
          ) : (
            alerts.map((alert) => (
              <ListItem key={alert.id}>
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                  {alert.pushed ? <NotificationsIcon color="primary" /> : <HistoryIcon color="action" />}
                </ListItemIcon>
                <ListItemText
                  primary={alert.text}
                  secondary={`Posted by ${alert.author || 'Admin'} on ${new Date(alert.timestamp).toLocaleString()} ${alert.pushed ? '(Push Sent)' : '(No Push)'}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}
// --- End Activity & Alerts Management Component ---

// --- Blog Management Component ---
function BlogManagement() {
  const { blogPosts, addBlogPost, deleteBlogPost } = useBoards();
  const { currentUser } = useAuth();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImageUrl, setNewPostImageUrl] = useState('');
  const [deletePostConfirmOpen, setDeletePostConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleAddPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const postData = {
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
        author: currentUser?.username || 'Admin',
        imageUrl: newPostImageUrl.trim() || '/images/placeholder-default.jpg',
      };
      addBlogPost(postData);
      console.log('Adding blog post:', postData);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostImageUrl('');
      // TODO: Add API call here to persist blog post
    } else {
      console.error("Blog post title and content cannot be empty.");
    }
  };

  const openDeletePostConfirm = (post) => {
    setPostToDelete(post);
    setDeletePostConfirmOpen(true);
  };

  const closeDeletePostConfirm = () => {
    setPostToDelete(null);
    setDeletePostConfirmOpen(false);
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      deleteBlogPost(postToDelete.id);
      console.log(`Blog post "${postToDelete.title}" deleted.`);
      // TODO: Add API call here to delete blog post
    }
    closeDeletePostConfirm();
  };

  if (currentUser?.role !== 'Admin') {
    return <Typography sx={{ p: 2 }}>Access Denied. You must be an admin to manage blog posts.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h6" gutterBottom>Manage Blog Posts</Typography>
      
      <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Create New Post</Typography>
        <TextField
          label="Post Title"
          variant="outlined"
          fullWidth
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL (optional, e.g., /images/my-image.jpg)"
          variant="outlined"
          fullWidth
          value={newPostImageUrl}
          onChange={(e) => setNewPostImageUrl(e.target.value)}
          sx={{ mb: 2 }}
          placeholder="Defaults to /images/placeholder-default.jpg if left empty"
        />
        <TextField
          label="Post Content"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          onClick={handleAddPost} 
          startIcon={<AddIcon />} 
          disabled={!newPostTitle.trim() || !newPostContent.trim()}
        >
          Add Blog Post
        </Button>
      </Paper>

      <Typography variant="subtitle1" gutterBottom>Existing Posts</Typography>
      <Paper elevation={1} sx={{ maxHeight: 400, overflow: 'auto', p: { xs: 1, sm: 2 } }}>
        <List dense>
          {blogPosts.length === 0 ? (
            <ListItem>
              <ListItemText primary="No blog posts yet." />
            </ListItem>
          ) : (
            blogPosts.map((post) => (
              <React.Fragment key={post.id}>
                <ListItem
                  component="div" // Add this line to ensure ListItem renders as a div
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete post" onClick={() => openDeletePostConfirm(post)} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}><ArticleIcon /></ListItemIcon>
                  <ListItemText
                    primary={post.title}
                    secondary={`By ${post.author} on ${new Date(post.timestamp).toLocaleDateString()}`}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>

      <Dialog
        open={deletePostConfirmOpen}
        onClose={closeDeletePostConfirm}
        aria-labelledby="delete-post-dialog-title"
      >
        <DialogTitle id="delete-post-dialog-title">
          {"Confirm Blog Post Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the blog post "{postToDelete?.title}"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeletePostConfirm}>Cancel</Button>
          <Button onClick={handleDeletePost} color="error" autoFocus>
            Delete Post
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
// --- End Blog Management Component ---

// --- Incident Management Component ---
function IncidentManagement() {
  const { incidents, updateIncidentStatus, deleteIncident } = useIncidents();
  const { currentUser } = useAuth();
  const [deleteIncidentConfirmOpen, setDeleteIncidentConfirmOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);
  const theme = useTheme(); // Added
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Added

  const handleStatusChange = (incidentId, newStatus) => {
    updateIncidentStatus(incidentId, newStatus);
  };

  const openDeleteIncidentConfirm = (incident) => {
    setIncidentToDelete(incident);
    setDeleteIncidentConfirmOpen(true);
  };

  const closeDeleteIncidentConfirm = () => {
    setIncidentToDelete(null);
    setDeleteIncidentConfirmOpen(false);
  };

  const handleDeleteIncident = () => {
    if (incidentToDelete) {
      deleteIncident(incidentToDelete.id);
    }
    closeDeleteIncidentConfirm();
  };

  if (currentUser?.role !== 'Admin') {
    return <Typography sx={{ p: 2 }}>Access Denied. You must be an admin to manage incidents.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h6" gutterBottom>Manage Incident Reports</Typography>

      {isMobile ? (
        <Grid container spacing={2} justifyContent="center"> {/* Center grid items */}
          {incidents.map((incident) => (
            <Grid item xs={12} sm={8} md={6} key={incident.id}> {/* Adjust item width and center */}
              <Card variant="outlined" sx={{ width: '100%' }}> {/* Ensure card takes item width */}
                <CardContent>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    {incident.type} - {incident.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Reported by: {incident.reporter} on {new Date(incident.submittedAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Incident Time: {new Date(incident.dateTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Description: {incident.description}
                  </Typography>
                  <FormControl size="small" variant="standard" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={incident.status}
                      onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="Investigating">Investigating</MenuItem>
                      <MenuItem value="Resolved">Resolved</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton 
                    size="small" 
                    aria-label="delete incident" 
                    color="error" 
                    onClick={() => openDeleteIncidentConfirm(incident)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} elevation={2} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="incident management table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Date/Time</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Reporter</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow
                  key={incident.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>{new Date(incident.dateTime).toLocaleString()}</TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {incident.description}
                  </TableCell>
                  <TableCell>{incident.reporter}</TableCell>
                  <TableCell>{new Date(incident.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
                      <Select
                        value={incident.status}
                        onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Incident Status' }}
                      >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Investigating">Investigating</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      aria-label="delete incident" 
                      color="error" 
                      onClick={() => openDeleteIncidentConfirm(incident)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={deleteIncidentConfirmOpen}
        onClose={closeDeleteIncidentConfirm}
        aria-labelledby="delete-incident-dialog-title"
      >
        <DialogTitle id="delete-incident-dialog-title">
          {"Confirm Incident Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this incident report? <br />
            Type: {incidentToDelete?.type} <br />
            Location: {incidentToDelete?.location} <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteIncidentConfirm}>Cancel</Button>
          <Button onClick={handleDeleteIncident} color="error" autoFocus>
            Delete Incident
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
// --- End Incident Management Component ---

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

function AdminPage() {
  const [value, setValue] = useState(0);
  const { currentUser } = useAuth();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (currentUser?.role !== 'Admin') {
     return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography>You do not have permission to view the admin dashboard.</Typography>
      </Container>
     );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
        Admin Dashboard
      </Typography>
      
      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="Admin dashboard tabs" 
            variant="scrollable" 
            scrollButtons="auto" 
            allowScrollButtonsMobile
          >
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Boards" {...a11yProps(1)} />
            <Tab label="Incidents" {...a11yProps(2)} />
            <Tab label="Alerts" {...a11yProps(3)} />
            <Tab label="Blog" {...a11yProps(4)} />
            <Tab label="Settings" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{ p: { xs: 1, sm: 3 } }}>
          <UserManagement />
        </TabPanel>
        <TabPanel value={value} index={1} sx={{ p: { xs: 1, sm: 3 } }}>
          <BoardManagement />
        </TabPanel>
        <TabPanel value={value} index={2} sx={{ p: { xs: 1, sm: 3 } }}>
          <IncidentManagement />
        </TabPanel>
        <TabPanel value={value} index={3} sx={{ p: { xs: 1, sm: 3 } }}>
          <ActivityAlertsManagement />
        </TabPanel>
        <TabPanel value={value} index={4} sx={{ p: { xs: 1, sm: 3 } }}>
          <BlogManagement />
        </TabPanel>
        <TabPanel value={value} index={5} sx={{ p: { xs: 1, sm: 3 } }}>
          <SiteSettings />
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default AdminPage;
