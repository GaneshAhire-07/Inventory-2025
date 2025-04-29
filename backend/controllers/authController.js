const bcrypt = require('bcrypt');
const { User } = require('../lib/db.js');

const signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    res.status(200).json({
      user_id: user._id,
      username: user.username,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };