import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Card, CardContent, Paper } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import FacebookIcon from '@mui/icons-material/Facebook';
import CampaignIcon from '@mui/icons-material/Campaign';
import BlogSection from '../components/BlogSection';
import { useBoards } from '../contexts/BoardContext';

const features = [
  {
    title: 'Report Incidents',
    description: 'Quickly report suspicious activity or safety concerns in your area.',
    icon: <ReportProblemIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Receive Alerts',
    description: 'Stay informed with real-time safety alerts and updates from neighbors and local authorities.',
    icon: <NotificationsActiveIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Connect with Neighbors',
    description: 'Join discussion boards, share information, and build a stronger community.',
    icon: <PeopleIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Local Announcements',
    description: 'Stay up-to-date with important community news and events.',
    icon: <CampaignIcon fontSize="large" color="primary" />,
  },
];

function PublicLandingPage() {
  const { blogPosts } = useBoards();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          mb: 6,
          borderRadius: 0,
        }}
        elevation={3}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' }
            }}
          >
            Building Safer Neighborhoods, Together.
          </Typography>
          <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
            Your community platform for safety, communication, and connection.
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'secondary.main',
                '&:hover': { bgcolor: 'secondary.dark' },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Member Login
            </Button>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 4, fontWeight: 'medium' }}>
          Key Features
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
            },
            mb: 6,
          }}
        >
          {features.map((feature) => (
            <Card key={feature.title} sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', p: 2 }}>
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h3" fontWeight="medium">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mb: 6,
          }}
        >
          <Box sx={{ width: { xs: '100%', md: 'calc(66.66% - 16px)' } }}>
            <BlogSection posts={blogPosts} maxPosts={1} />
          </Box>

          <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 16px)' } }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
              Connect on Facebook
            </Typography>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8', height: '100%' }}>
              <FacebookIcon sx={{ fontSize: 60, color: '#1877F2' }} />
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                Facebook Feed Placeholder
              </Typography>
              <Typography variant="caption" color="text.secondary" textAlign="center">
                (Embed your community Facebook feed here)
              </Typography>
            </Paper>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}

export default PublicLandingPage;
