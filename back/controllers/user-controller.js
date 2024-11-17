const { prisma } = require("../prisma/prisma-client")
const bcrypt = require("bcryptjs")
const Jdenticon = require("jdenticon")
const path = require("path")
const fs = require("fs")
const jwt = require("jsonwebtoken")

const UserController = {
  register: async (req, res) => {
    const { email, password, name } = await req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Все поля обязательны" })
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } })

      if (existingUser) {
        return res.status(400).json({ error: "Пользователь уже существует" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const svg = Jdenticon.toSvg(name, 300)
      const avatarName = `${name}_${Date.now()}.svg`
      const avatarPath = path.join(__dirname, "../uploads", avatarName)
      fs.writeFileSync(avatarPath, svg)

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          avatarUrl: `/uploads/${avatarPath}`
        }
      })

      res.json(newUser)
    } catch (error) {
      console.log(error, "Error in register", error)
      res.status(500).json({ error: "Internal server error " })
    }
  },
  login: async (req, res) => {
    const { email, password } = await req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Все поля обязательны" })
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return res.status(400).json({ error: "Не верный логин или пароль" })
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        return res.status(400).json({ error: "Не верный логин или пароль" })
      }

      const token = jwt.sign(({ userId: user.id }), process.env.SECRET_KEY)

      res.json({ token })

    } catch (error) {
      console.error("Login error", error)
      res.status(500).json({ error: "Internal server error" })
    }

  },
  getUserById: async (req, res) => {
    const { id } = await req.params
    const userId = await req.user.userId

    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          followers: true,
          following: true
        }
      })

      if (!user) {
        return res.status(404).json({ error: "Нет такого пользователя" })
      }

      const isFollowing = await prisma.follows.findFirst({
        where: {
          AND: [
            { followerId: userId },
            { followingId: id }
          ]
        }
      })

      res.json({ ...user, isFollowing: Boolean(isFollowing) })
    } catch (error) {
      console.error("Get curent error", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params
    const { email, name, dateOfBirth, location, bio } = req.body

    let filePath

    if (req.file && req.file.path) {
      filePath = req.file.path
    }

    if (id !== req.user.userId) {
      return res.status(403).json({ error: "Нет доступа" })
    }

    try {
      if (email) {
        const existingUser = await prisma.user.findFirst({
          where: { email }
        })

        if (existingUser && existingUser.id !== id) {
          return res.status(400).json({ error: "Почта уже используется" })
        }
      }

      const user = await prisma.user.update({
        where: { id },
        data: {
          email: email || undefined,
          name: name || undefined,
          avatarUrl: filePath ? `/${filePath}` : undefined,
          dateOfBirth: dateOfBirth || undefined,
          bio: bio || undefined,
          location: location || undefined
        }
      })

      res.json(user)
    } catch (error) {
      console.log("Update user error", error)
      res.status(500).json("Internal server error")
    }

  },
  current: async (req, res) => {
    const allUsers = await prisma.user.findMany()
    try {
      res.send(allUsers)
    } catch (error) {
      console.log(error)
    }

  }
}

module.exports = UserController
