const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
const connectDB = require('./config/db');

// admin



connectDB();

const app = express();
app.use(cors());
const corsOptions = {
    origin: '*', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
  };
  
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', timeout: 60000 })); // Timeout set to 60 seconds





// User Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/control-panel', require('./routes/controlPanelRoutes'));
app.use('/api/profile-questions', require('./routes/profileQuestionsRoutes'))
app.use('/api/review-option', require('./routes/reviewOptionRoutes'))
app.use('/api/daily-review',require('./routes/dailyReviewRoutes'))

// Admin Routes
app.use('/api/categories', require('./routes/admin/categoryRoutes'));
app.use('/api/user', require('./routes/admin/userRoutes'));
app.use('/api/profiles', require('./routes/admin/profileRoutes'));
app.use('/api/profiles-questions', require('./routes/admin/profileQuestionsRoutes'));
app.use('/api/contents', require('./routes/admin/contentRoutes'));
app.use('/api/setting', require('./routes/admin/settingRoutes'));
app.use('/api/admin/review-option', require('./routes/admin/reviewOptionRoutes'));

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
