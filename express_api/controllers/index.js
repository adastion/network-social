const PostController = require('./post-controller');
const UserController = require('./user-controller');
const CommentController = require('./comment-controller');
const LikeController = require('./like-controller');
const FollowsController = require('./follows-controller');

module.exports = {
  UserController,
  PostController,
  CommentController,
  LikeController,
  FollowsController
}