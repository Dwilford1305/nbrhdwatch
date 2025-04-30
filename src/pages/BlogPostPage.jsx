// filepath: d:\nbrhdwatch\src\pages\BlogPostPage.jsx
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBoards } from '../contexts/BoardContext';

function BlogPostPage() {
  const { postId } = useParams();
  const { getBlogPostById } = useBoards();
  const post = getBlogPostById(postId);

  if (!post) {
    // Handle case where post is not found or still loading
    // You might want a more robust loading state depending on how data is fetched
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">Blog post not found.</Alert>
        <Button 
          component={RouterLink} 
          to="/" 
          startIcon={<ArrowBackIcon />} 
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button 
        component={RouterLink} 
        to={-1} // Go back to the previous page
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          Posted by {post.author} on {new Date(post.timestamp).toLocaleDateString()}
        </Typography>
        
        {post.imageUrl && (
          <Box 
            component="img"
            src={post.imageUrl}
            alt={post.title}
            sx={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: 1,
              mb: 3,
            }}
          />
        )}

        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}> {/* Use pre-wrap to preserve formatting */}
          {post.content}
        </Typography>
      </Paper>
    </Container>
  );
}

export default BlogPostPage;
