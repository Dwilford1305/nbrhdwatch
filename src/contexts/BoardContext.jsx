import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BoardContext = createContext();

export const useBoards = () => useContext(BoardContext);

// Initial dummy data (replace with API calls in a real application)
const initialBoards = [
  { id: uuidv4(), name: 'General Discussion', description: 'Talk about anything neighborhood-related.' },
  { id: uuidv4(), name: 'Safety Concerns', description: 'Report and discuss safety issues.' },
  { id: uuidv4(), name: 'Upcoming Events', description: 'Share and find local events.' },
];

const initialMessages = {
  [initialBoards[0].id]: [
    { id: uuidv4(), text: 'Welcome to the general discussion!', author: 'Admin', authorId: 'admin001', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    { id: uuidv4(), text: 'Has anyone seen a lost dog near Maple Ave?', author: 'Jane D.', authorId: 'user456', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  ],
  [initialBoards[1].id]: [
    { id: uuidv4(), text: 'Streetlight out on corner of Oak & Pine.', author: 'John S.', authorId: 'user789', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  ],
  [initialBoards[2].id]: [],
};

const initialAlerts = [
  { id: uuidv4(), text: 'Suspicious vehicle reported on Elm St.', timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(), pushed: false, author: 'Admin' },
  { id: uuidv4(), text: 'Community BBQ reminder: June 4th, 12:00 PM', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), pushed: true, author: 'Admin' },
];

const initialBlogPosts = [
  {
    id: uuidv4(),
    title: 'Community Safety Tips for Spring',
    content: 'As the weather warms up, it\'s a great time to review some simple steps we can all take to keep our neighborhood safe and secure. Remember to lock your doors and windows, keep valuables out of sight in your car, and report any suspicious activity immediately. Let\'s work together! Don\'t forget to check your outdoor lighting and trim hedges where someone could hide.',
    author: 'Admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    imageUrl: '/images/placeholder-spring-safety.jpg',
  },
  {
    id: uuidv4(),
    title: 'Welcome to the New Neighborhood Watch Platform!',
    content: 'We are excited to launch this new platform to help our community stay connected and informed. Explore the message boards, report concerns, and stay updated on local events. This platform allows for better communication and faster dissemination of important safety information. We encourage everyone to register and participate.',
    author: 'Admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    imageUrl: '/images/placeholder-welcome.jpg',
  },
];

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(initialBoards);
  const [messages, setMessages] = useState(initialMessages);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);

  const addBoard = (name, description) => {
    const newBoard = { id: uuidv4(), name, description };
    setBoards(prevBoards => [...prevBoards, newBoard]);
    setMessages(prevMessages => ({ ...prevMessages, [newBoard.id]: [] }));
  };

  const deleteBoard = (id) => {
    setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
    setMessages(prevMessages => {
      const { [id]: _, ...remainingMessages } = prevMessages;
      return remainingMessages;
    });
  };

  const addMessage = (boardId, messageData) => {
    const messageWithId = {
      ...messageData,
      id: uuidv4(),
      timestamp: new Date().toISOString()
    };
    setMessages(prevMessages => ({
      ...prevMessages,
      [boardId]: [...(prevMessages[boardId] || []), messageWithId],
    }));
  };

  const deleteMessage = (boardId, messageId, reason) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [boardId]: (prevMessages[boardId] || []).filter(msg => msg.id !== messageId),
    }));
    // TODO: Implement email notification logic here
    // TODO: API call to delete message
  };

  const addAlert = (alertData) => {
    const newAlert = { 
      ...alertData, 
      id: `alert-${Date.now()}`, 
      timestamp: new Date().toISOString() 
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]); // Add to beginning
    // TODO: API call to persist alert
    if (newAlert.pushed) {
      // TODO: Implement actual push notification logic
    }
  };

  const deleteAlert = (alertId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
    // TODO: API call to delete alert
  };

  const addBlogPost = (postData) => {
    const newPost = {
      ...postData,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      imageUrl: postData.imageUrl || '/images/placeholder-default.jpg',
    };
    setBlogPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const deleteBlogPost = (postId) => {
    console.log(`Deleting blog post ${postId}`);
    setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const getBlogPostById = (postId) => {
    return blogPosts.find(post => post.id === postId);
  };

  const value = {
    boards,
    addBoard,
    deleteBoard,
    messages,
    addMessage,
    deleteMessage,
    alerts,
    addAlert,
    deleteAlert,
    blogPosts,
    addBlogPost,
    deleteBlogPost,
    getBlogPostById,
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};
