import { User } from '../../models/user.js';
import { compareHashPassword, hashPassword } from '../../utils/authUtil.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwtUtil.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'Please fill all fields' });
    }

    const existUser = await User.findOne({ email }).select('+password');

    if (!existUser) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    const isPasswordMatch = await compareHashPassword(password, existUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const access_token = generateAccessToken({ id: existUser.id, roles: existUser.roles });
    const refresh_token = generateRefreshToken({ id: existUser.id, roles: existUser.roles });

    res.cookie('token', access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production' ? true : false,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({
      message: 'Login successful',
      data: {
        id: existUser.id,
        username: existUser.username,
        email: existUser.email,
        roles: existUser.roles,
      },
      token: access_token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, email, address, phone } = req.body;
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const checkMail = reg.test(email);

    if (!username || !password) {
      return res.status(401).json({ message: 'Please fill all required fields' });
    }
    const existUser = await User.findOne({ username: username });
    if (existUser) {
      return res.status(400).json({ message: 'Username already existed' });
    }
    if (!checkMail) {
      return res.json({
        message: 'Invalid Mail',
      });
    }
    if (password && password.length <= 6) {
      return res.json({
        message: 'Please provide a password with more than 6 characters',
      });
    }
    const user = await User.create({
      username: username,
      password: await hashPassword(password),
      email: email,
      phone: phone,
      address: address,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie();
    res.status(200).json('LogOut successful!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, address, phone } = req.body;

    const updatedUser = {
      username: username,
      password: password,
      address: address,
      phone: phone,
    };
    if (password && password.length <= 6) {
      return res.json({
        message: 'Please provide a password with more than 6 characters',
      });
    }
    const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.json({ message: 'User is not existed!!' });
    return res.status(200).json({ message: 'Delete Success', data: user });
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};

export const userList = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length > 0) return res.json({ message: 'There is no user!!' });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};
