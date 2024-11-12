const UserController = {
  register: async (req, res) => {
    res.send("1")
  },
  login: async (req, res) => {
    res.send("2")

  },
  getUserById: async (req, res) => {
    res.send("3")

  },
  updateUser: async (req, res) => {
    res.send("4")

  },
  current: async (req, res) => {
    res.send("5")

  }
}

module.exports = UserController
