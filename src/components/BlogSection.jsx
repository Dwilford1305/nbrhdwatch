// filepath: d:\nbrhdwatch\src\components\BlogSection.jsx
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
import { Typography, Box, Card, CardContent, Button, Grid } from '@mui/material';
import { CSSTransition, SwitchTransition } from 'react-transition-group'; // Import transition components
import './BlogSection.css'; // Import CSS for transitions

// Function to truncate text
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

function BlogSection({ posts = [], maxPosts = 2, showFullContent = false, cycle = false, cycleInterval = 5000 }) {
  const displayedPosts = posts.slice(0, maxPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const nodeRef = useRef(null); // Create a ref

  // Effect for cycling posts if enabled
  useEffect(() => {
    if (!cycle || displayedPosts.length <= 1) {
      return; // Don't cycle if disabled or not enough posts
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedPosts.length);
    }, cycleInterval);

    // Cleanup interval on component unmount or when props change
    return () => clearInterval(intervalId);
  }, [cycle, displayedPosts.length, cycleInterval]);

  if (!displayedPosts || displayedPosts.length === 0) {
    return (
      <Box sx={{ width: '100%', mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
          From the Blog
        </Typography>
        <Typography color="text.secondary">No blog posts available yet.</Typography>
      </Box>
    );
  }

  const currentPost = displayedPosts[currentIndex];

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
        From the Blog
      </Typography>
      
      {cycle && displayedPosts.length > 1 ? (
        // Cycling animation for 1 post at a time
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentPost.id} // Key change triggers transition
            nodeRef={nodeRef} // Pass the ref here
            timeout={500} // Use timeout instead of addEndListener
            classNames="fade" // CSS class prefix
          >
            {/* Wrap the Card in a div and assign the ref */}
            <div ref={nodeRef}> 
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {currentPost.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    Posted by {currentPost.author} on {new Date(currentPost.timestamp).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {showFullContent ? currentPost.content : truncateText(currentPost.content, 150)}
                  </Typography>
                </CardContent>
                {!showFullContent && (
                   <Button 
                     component={RouterLink} // Use RouterLink
                     to={`/blog/${currentPost.id}`} // Link to the blog post page
                     size="small" 
                     sx={{ alignSelf: 'flex-start', m: 2, mt: 'auto' }}
                   >
                     Read More
                   </Button>
                )}
              </Card>
            </div>
          </CSSTransition>
        </SwitchTransition>
      ) : (
        // Static grid display (original behavior)
        <Grid container spacing={3}>
          {displayedPosts.map((post) => (
            <Grid item xs={12} sm={maxPosts > 1 ? 6 : 12} key={post.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    Posted by {post.author} on {new Date(post.timestamp).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {showFullContent ? post.content : truncateText(post.content, 150)}
                  </Typography>
                </CardContent>
                {!showFullContent && (
                   <Button 
                     component={RouterLink} // Use RouterLink
                     to={`/blog/${post.id}`} // Link to the blog post page
                     size="small" 
                     sx={{ alignSelf: 'flex-start', m: 2, mt: 'auto' }}
                   >
                     Read More
                   </Button>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default BlogSection;
