const { prisma } = require("../prisma/prisma-client");

const CommentController = {
  createComment: async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.user.userId;

    if (!postId || !content) {
      return res.status(400).json({ error: "Все поля обязательны" })
    }

    try {
      const comment = await prisma.comment.create({
        data: {
          postId,
          userId,
          content
        }
      })

      res.json(comment);
    } catch (error) {
      console.error("Error creating error", error);

      res.status(500).json({ error: "Internal server error" });
    }
  },
  getCommentById: async (req, res) => {
    res.send("get id")
  },
  deleteComment: async (req, res) => {
    res.send("delete")
  }
}

module.exports = CommentController;