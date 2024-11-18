const { prisma } = require("../prisma/prisma-client")

const FollowController = {
  followUser: async (req, res) => {
    const { followingId } = req.body
    const userId = req.user.userId

    if (userId === followingId) {
      return res.status(500).json({ error: "Нельзя подписаться на самого себя" })
    }

    try {
      const existingSubscribtion = await prisma.follows.findFirst({
        where: {
          AND: [
            { followerId: userId },
            { followingId }
          ]
        }
      })

      if (existingSubscribtion) {
        return res.status(400).json({ error: "Подписка уже существует" })
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } }
        }
      })

      res.status(201).json({ message: "Подписка успешно создана" })
    } catch (error) {
      console.log("Follow error", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },
  unfollowUser: async (req, res) => {
    try {

    } catch (error) {
      console.log("Unfollow error", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

module.exports = FollowController