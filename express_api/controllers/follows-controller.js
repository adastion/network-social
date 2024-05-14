const { prisma } = require("../prisma/prisma-client");
const { connect } = require("../routes");

const FollowsController = {
  followUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    if (followingId === userId) {
      return res.status(500).json({ error: "Вы не можете подписаться на сомого себя" })
    }

    try {
      const existingSubscription = await prisma.follows.findFirst({
        where: {
          AND: [
            { followerId: userId },
            { followingId },
          ]
        }
      })

      if (existingSubscription) {
        return res.status(400).json({ error: "Подписка ужу существует" })
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } }
        }
      })

      res.status(201).json({ message: "Подписка создана" })
    } catch (error) {
      console.error("Follow error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  unfollowUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    try {
      const follows = await prisma.follows.findFirst({
        where: {
          AND: [
            { followerId: userId },
            { followingId }
          ]
        }
      })

      if (!follows) {
        return res.status(400).json({ error: "Вы не подписаны на этого пользователя" })
      }

      await prisma.follows.delete({
        where: { id: follows.id }
      })

      res.status(201).json({ message: "Вы отписались" })
    } catch (error) {
      console.error("Unfollow error", error);

      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = FollowsController;