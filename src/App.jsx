import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import PublicLandingPage from './pages/PublicLandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MemberLandingPage from './pages/MemberLandingPage';
import AdminPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';
import BoardPage from './pages/BoardPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<PublicLandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Protected Routes */}
          <Route 
            path="/members" 
            element={
              <ProtectedRoute>
                <MemberLandingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" // Changed from /admin-preview
            element={
              // Pass both Admin and ReadOnlyAdmin roles
              <ProtectedRoute roles={['Admin', 'ReadOnlyAdmin']}> 
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/boards/:boardId" 
            element={
              <ProtectedRoute>
                <BoardPage />
              </ProtectedRoute>
            } 
          />
          {/* Public Blog Post Route - Assuming blog posts can be public */}
          {/* If blog posts require login, wrap this too */}
          <Route path="/blog/:postId" element={<BlogPostPage />} /> 
          {/* Define other application routes here */}
          {/* Maybe add a 404 Not Found route */}
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
