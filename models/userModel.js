const db = require('../config/db');

class UserModel {
  async getAllUsers() {
    return db.any('SELECT * FROM users');
  }

  async createUser(user) {
    const { name, email } = user;
    return db.one('INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', [name, email]);
  }

  async getUserById(id) {
    return db.one('SELECT * FROM users WHERE id = $1', id);
  }

  async updateUser(id, user) {
    const { name, email } = user;
    return db.one('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
  }

  async deleteUser(id) {
    return db.none('DELETE FROM users WHERE id = $1', id);
  }
}

module.exports = new UserModel();
