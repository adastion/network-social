const { prisma } = require("../prisma/prisma-client")

const LikeController = {
  addLike: async (req, res) => {
    const { postId } = req.body
    const userId = req.user.userId

    if (!postId) {
      return res.status(400).json({ error: "Все поля обязательны" })
    }

    try {
      const existingLike = await prisma.like.findFirst({
        where: { postId, userId }
      })

      if (existingLike) {
        return res.status(400).json({ error: "Вы уже поставили лайк" })
      }

      const like = await prisma.like.create({
        data: {
          postId,
          userId
        }
      })

      res.status(201).json(like)

    } catch (error) {
      console.log("Error like post", error)
      res.status(500).json({ error: "Internal server" })
    }
  },
  deleteLike: async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId

    if (!id) {
      return res.status(400).json({ error: "Вы поставили дизлайк" })
    }


    try {
      const existingLike = await prisma.like.findFirst({
        where: {
          userId,
          postId: id
        }
      })

      if (!existingLike) {
        return res.status(400).json({ error: "Лайк уже существует" })
      }

      const deleteLike = await prisma.like.deleteMany({ where: { postId: id, userId } })

      res.json(deleteLike)
    } catch (error) {
      console.log("Deleted like error", error)
      res.status(500).json({ error: "Internal server" })
    }
  }
}

module.exports = LikeController