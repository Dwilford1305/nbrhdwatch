import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
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
          <Route path="/members" element={<MemberLandingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin-preview" element={<AdminPage />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          {/* Define other application routes here */}
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
