import express from 'express';

// Below we are importing these things from auth.controller.js'
import { google, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google)

export default router; // this is exported and used by app.use('/api/auth', authRoutes); 