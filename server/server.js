const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernblog';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Import models
const Post = require('./models/Post');

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend server is running with MongoDB!',
    endpoints: [
      'GET /api/categories',
      'POST /api/posts',
      'GET /api/posts'
    ]
  });
});

// Categories route
app.get('/api/categories', (req, res) => {
  console.log('Categories endpoint hit');
  const categories = [
    { _id: '1', name: 'Technology' },
    { _id: '2', name: 'Travel' },
    { _id: '3', name: 'Food' },
    { _id: '4', name: 'Lifestyle' },
    { _id: '5', name: 'Programming' },
    { _id: '6', name: 'Health' },
    { _id: '7', name: 'Business' }
  ];
  res.json(categories);
});

// Create post route - SAVES TO MONGODB
app.post('/api/posts', async (req, res) => {
  try {
    console.log('Create post endpoint hit:', req.body);
    
    const { title, content, category, image } = req.body;
    
    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        error: 'Title, content, and category are required'
      });
    }
    
    // Create new post in MongoDB
    const newPost = new Post({
      title,
      content,
      category,
      image: image || ''
    });
    
    // Save to database
    const savedPost = await newPost.save();
    
    console.log('New post saved to MongoDB:', savedPost);
    
    res.status(201).json({
      message: 'Post created successfully!',
      post: savedPost
    });
    
  } catch (error) {
    console.error('Error saving post to MongoDB:', error);
    res.status(500).json({
      error: 'Failed to save post to database',
      details: error.message
    });
  }
});

// Get all posts route
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({
      message: 'Posts retrieved successfully',
      posts: posts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      error: 'Failed to fetch posts'
    });
  }
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /',
      'GET /api/categories',
      'POST /api/posts',
      'GET /api/posts'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log('🚀 Server started successfully!');
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`📚 Test categories: http://localhost:${PORT}/api/categories`);
  console.log(`🏠 Home: http://localhost:${PORT}/`);
  console.log(`🗄️  MongoDB: ${MONGODB_URI}`);
});