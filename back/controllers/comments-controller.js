const { prisma } = require("../prisma/prisma-client")

const CommentsController = {
  createComments: async (req, res) => {
    const { postId, content } = req.body
    const userId = req.user.userId

    if (!postId || !content) {
      return res.status(400).json({ error: "Все поля обязательны" })
    }

    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          postId,
          userId
        }
      })

      res.json(comment)
    } catch (error) {
      console.log("Created comment error", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },
  deleteComments: async (req, res) => {
    try {

    } catch (error) {
      console.log("Deleted comment error", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

module.exports = CommentsController