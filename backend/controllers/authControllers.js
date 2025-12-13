const { createUser, findUserByEmail } = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const user = await createUser({ name, email, password, role });
    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };
