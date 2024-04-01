const userModel = require('../models/userModel');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userModel.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userModel.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async deleteUser(req, res) {
    try {
      await userModel.deleteUser(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  }
}

module.exports = new UserController();
