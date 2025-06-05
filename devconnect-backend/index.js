require('dotenv').config();
const express = require('express');
const rateLimit = require('./middlewares/rateLimit');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Database config
const { connectDB } = require('./config/db');
const app = express();

connectDB();


app.use(cors({
  origin: 'http://localhost:4200',  // Angular dev server URL
  credentials: true                 // allow sending cookies
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit);
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to DevConnect API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use('/uploads', express.static('public/uploads'));