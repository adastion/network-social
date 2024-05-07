const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcryptjs");
const Jdenticon = require("jdenticon");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const UserController = {
  register: async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json(_errorMessage400())
    }

    try {
      const existingUser = await prisma.user.findUnique(({ where: { email } }));

      if (existingUser) {
        return res.status(400).json({ error: "Пользователь уже существует" })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const png = Jdenticon.toPng(name, 200);
      const avatarName = `${name}_${Date.now()}.png`;
      const avatarPath = path.join(__dirname, "../uploads", avatarName);
      fs.writeFileSync(avatarPath, png);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          avatarUrl: `/uploads/${avatarPath}`
        }
      })
      res.json(user);

    } catch (error) {
      console.error("Error in register", error);
      res.status(500).json({ error: "Internal server error" })
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(_errorMessage400());
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json(_errorMessage400("Не верный логин или пароль"));
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json(_errorMessage400("Не верный логин или пароль"));
      }

      const token = jwt.sign(({ userId: user.id }), process.env.SECRET_KEY);

      res.json({ token })
    } catch (error) {
      console.error("Login error", error);
      res.status(500).json(error, "Internal server eerror");
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          followers: true,
          following: true,
        }
      })

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" })
      }

      const isFollowing = await prisma.follows.findFirst({
        where: {
          AND: [
            {followerId: userId},
            {followingId: id}
          ]
        }
      })

      res.json({...user, isFollowing: Boolean(isFollowing)})
    } catch (error) {
      console.error("Get current Error", error);

      res.status(500).json({error: "Internal server error"})
    }
  },
  updateUser: async (req, res) => {
    res.send("update user")
  },
  current: async (req, res) => {
    res.send("current")
  },
};

const _errorMessage400 = (message) => {
  return message ? { error: message } : { error: "Заполните пожалуйста все поля ввода." }
}
module.exports = UserController;