import express from 'express';
import mongoose from 'mongoose';
//import dotenv from 'dotenv'; //useful for managing configuration settings in your applications without hardcoding them directly in your code. It helps keep sensitive information separate from your source code and provides an easy way to configure your application for different environments (development, testing, production, etc.).
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path'; //This line imports the built-in Node.js path module, which provides utilities for working with file and directory paths.

//dotenv.config();
//process.env.MONGO
mongoose.connect('mongodb+srv://tathagatabose482:blI3OyWapLiVleBA@leadgenniedata.1xsz6gd.mongodb.net/?retryWrites=true&w=majority&appName=leadgenniedata')
  .then(()=>{
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve(); //To work around this, the code uses path.resolve() from the path module to obtain the absolute path of the current working directory and assigns it to the 

const app = express();

//EXTRA understanding funtionallity of app.use-------
//app.use([path,] callback):
/*This method is used to mount middleware functions at a specified path.
The path parameter is optional and, if provided, specifies the URL path or pattern that the middleware should be applied to. If no path is provided, the middleware will be executed for every request.
The callback parameter is a function that acts as middleware, handling the request and response objects. Middleware functions can perform various tasks, such as logging, authentication, modifying the request or response, etc.

Example without path:---
app.use((req, res, next) => {
  console.log('Middleware executed for every request');
  next();
});

Example with path:---
app.use('/admin', (req, res, next) => {
  console.log('Middleware executed for requests to /admin');
  next();
});

*/
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
//This route handler is intended to match any 
//HTTP GET request (* is a wildcard that matches any path) and send a file in response. Here's what each part does:

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
