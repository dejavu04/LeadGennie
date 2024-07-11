import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


// ---- Sign up up segement ----
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));// this is passed into the errorHandler () funtion which is in utils/error.js
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);// hashing the password and adding some salt into it.

  // Storing the new user and then saving it 
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};


// ---- Sign-in ------
//async call coz we get it from the data-base

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'Wrong Credentials'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Wrong Credentials'));
    }

    // IF the user is valid we create a token to authenticate the user if they are logged in or not [ACCESS TOKEN @ @]
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      'zxcv1234'
    );

    const { password: pass, ...rest } = validUser._doc;// done so that we can sepearte  the hashed password and return the rest credentials 

    // After all the checks are done --
    
    // We return three(3) things 1.status code , 2. The cookie  , 3. json(credentials of user in the data-base except the hashed password)
    
    // ---- This is returned to the front end and then the front end will do its stuff----//
    res
      .status(200)
      .cookie('access_token', token, {  httpOnly: true, })
      .json(rest);// returning user credentials and id  in data base in 'preview of browser' of the data base
  } catch (error) {
    next(error);
  }
};


//---- Google authentication-----
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        'zxcv1234'
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
