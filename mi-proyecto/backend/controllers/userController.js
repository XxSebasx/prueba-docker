const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const user = await User.create({ nombre, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};