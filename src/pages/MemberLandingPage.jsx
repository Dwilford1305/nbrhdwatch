import React, { useMemo, useState, useEffect } from 'react'; // Import useEffect
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { Container, Typography, Box, Grid, Paper, Button, List, ListItem, ListItemText, ListItemIcon, Divider, Stack, CircularProgress } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import BlogSection from '../components/BlogSection';
import { useBoards } from '../contexts/BoardContext';
import IncidentReportForm from '../components/IncidentReportForm';
import { useAuth0 } from "@auth0/auth0-react";

const AUTH0_NAMESPACE = 'https://nbrhd-watch.com/roles';

const upcomingEvents = [
  { id: 1, name: 'Monthly Watch Meeting', date: 'May 15th, 7:00 PM' },
  { id: 2, name: 'Community BBQ', date: 'June 4th, 12:00 PM' },
];

const safetyTips = [
  { id: 1, title: 'Securing Your Home', link: '#' },
  { id: 2, title: 'Reporting Suspicious Activity Effectively', link: '#' },
];

function MemberLandingPage() {
  const { boards, messages, alerts, blogPosts } = useBoards();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get location object

  const isAdmin = isAuthenticated && user?.[AUTH0_NAMESPACE]?.includes('Admin');
  const cameFromLogin = location.state?.fromLogin; // Check for the state flag

  // Effect to redirect admin users to /admin ONLY after login
  useEffect(() => {
    // Only redirect if not loading, user is authenticated, is an admin, AND came directly from login
    if (!isLoading && isAuthenticated && isAdmin && cameFromLogin) {
      console.log("User is admin and came from login, redirecting to /admin..."); // Optional: for debugging
      // Clear the state flag after using it, so manual navigation doesn't re-trigger
      navigate('/admin', { replace: true, state: {} }); 
    }
    // Dependency array: run when loading state changes, auth state changes, isAdmin status changes, or location state changes
  }, [isLoading, isAuthenticated, isAdmin, navigate, cameFromLogin]); // Add cameFromLogin

  const combinedActivity = useMemo(() => {
    const allMessages = Object.entries(messages).flatMap(([boardId, boardMessages]) => {
      const board = boards.find(b => b.id === boardId);
      return boardMessages.map(msg => ({
        ...msg,
        type: 'post',
        boardName: board?.name || 'Unknown Board'
      }));
    });

    const typedAlerts = alerts.map(alert => ({
      ...alert,
      type: 'alert'
    }));

    return [...allMessages, ...typedAlerts]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 15);

  }, [messages, alerts, boards]);

  const handleReportIncident = () => {
    setIsReportFormOpen(true);
  };

  const handleCloseReportForm = () => {
    setIsReportFormOpen(false);
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  // Show loading state while Auth0 is initializing OR if we are about to redirect admin *after login*
  if (isLoading || (isAuthenticated && isAdmin && cameFromLogin)) { // Only show loading for redirect if cameFromLogin
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading user data...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome{user ? `, ${user.name || user.nickname || user.email}` : '!'}
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<AddAlertIcon />}
          onClick={handleReportIncident}
          size="large"
        >
          Report Incident To Admin
        </Button>
      </Box>
      <Typography variant="caption" color="error" sx={{ mt: -3, mb: 4, display: 'block' }}>
        If you are in immediate danger or require emergency assistance, please call 911.
      </Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 3
      }}>
        <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'calc(100% - 300px - 24px)' } }}>
          <Grid container spacing={3} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2" gutterBottom>
                Recent Activity & Alerts
              </Typography>
              <Paper elevation={2} sx={{ p: 2, height: 400, overflow: 'auto' }}>
                <List dense>
                  {combinedActivity.length === 0 ? (
                    <ListItem>
                      <ListItemText primary="No recent activity or alerts." />
                    </ListItem>
                  ) : (
                    combinedActivity.map((item) => (
                      <React.Fragment key={item.id}>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                            {item.type === 'alert' && <NotificationsIcon color={item.pushed ? "warning" : "action"} />}
                            {item.type === 'post' && <ForumIcon color="action" />}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.text}
                            secondary={
                              item.type === 'post' ?
                              `New post in "${item.boardName}" by ${item.author}` :
                              `Alert posted by ${item.author || 'Admin'}`
                            }
                          />
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    ))
                  )}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2" gutterBottom>
                Message Boards
              </Typography>
              <Paper elevation={2} sx={{ p: 2 }}>
                <List>
                  {boards.map((board) => (
                    <ListItem
                      key={board.id}
                      component={RouterLink}
                      to={`/boards/${board.id}`}
                    >
                      <ListItemIcon><ForumIcon /></ListItemIcon>
                      <ListItemText primary={board.name} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <BlogSection posts={blogPosts} maxPosts={2} cycle={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2" gutterBottom>
                Community Incident Map
              </Typography>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  height: 350,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'grey.200'
                }}
              >
                <Box textAlign="center">
                  <MapIcon sx={{ fontSize: 60, color: 'grey.500' }} />
                  <Typography variant="h6" color="text.secondary">
                    Incident Map Placeholder
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    (Map integration will go here)
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2" gutterBottom>
                Safety Tips & Resources
              </Typography>
              <Paper elevation={2} sx={{ p: 2 }}>
                <List dense>
                  {safetyTips.map((tip) => (
                    <ListItem component="a" href={tip.link} key={tip.id}>
                      <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}><LightbulbIcon color="action" /></ListItemIcon>
                      <ListItemText primary={tip.title} />
                    </ListItem>
                  ))}
                </List>
                <Button size="small" sx={{ mt: 1 }}>More Resources</Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{
          width: { xs: '100%', sm: 300 },
          flexShrink: 0
        }}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <Stack spacing={3}>
              <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 150, backgroundColor: 'grey.100' }}>
                <Typography variant="caption" display="block" color="text.secondary" textAlign="center" sx={{ mb: 1 }}>
                  Advertisement
                </Typography>
                <AdUnitsIcon sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Your Ad Here
                </Typography>
                <Button size="small" sx={{ mt: 1 }} variant="outlined" disabled>Learn More</Button>
              </Paper>

              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Community Sponsors
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <BusinessIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Local Business A</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Support our local sponsors!</Typography>
                    <Button size="small" variant="outlined">Visit Website</Button>
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <BusinessIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Community Partner B</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Thank you for your support.</Typography>
                    <Button size="small" variant="outlined">Learn More</Button>
                  </Box>
                </Stack>
              </Paper>

              <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Member Directory
                </Typography>
                <GroupIcon sx={{ fontSize: 40, color: 'grey.500', mb: 1 }} />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Connect with your neighbors.
                </Typography>
                <Button size="small" sx={{ mt: 1 }} disabled>View Directory (Coming Soon)</Button>
                <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                  (Privacy settings apply)
                </Typography>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Box>

      <IncidentReportForm
        open={isReportFormOpen}
        handleClose={handleCloseReportForm}
      />

    </Container>
  );
}

export default MemberLandingPage;
