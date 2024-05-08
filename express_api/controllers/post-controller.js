const { prisma } = require('../prisma/prisma-client');

const PostController = {
  createPost: async (req, res) => {
    res.send("createPost")
  },
  getAllPost: async (req, res) => {
    res.send("getAllPost")
  },
  getPostById: async (req, res) => {
    res.send("getPostById")
  },
  deletePost: async (req, res) => {
    res.send("deletePost")
  }
}

module.exports = PostController;