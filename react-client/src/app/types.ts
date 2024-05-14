export type User = {
  id: string
  email: string
  password: string
  name?: string
  avatarUrl?: string
  dateOfBirth?: Date
  createdAt: Date
  updated: Date
  bio?: string
  location?: string
  posts: Post[]
  following: Follows[]
  followers: Follows[]
  likes: Like[]
  comment: Comment[]
  isFollowing?: boolean
}

export type Post = {
  id: string,
  content: string,
  author: User,
  authorId: string,
  likes: Like[],
  comments: Comment[],
  likedByUser: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export type Like = {
  id: string,
  user: User,
  userId: string,
  post: Post,
  postId: string,
}

export type Comment = {
  id: string,
  constent: string,
  user: User,
  userId: string,
  post: Post,
  postId: string,
}

export type Follows = {
  id: string,
  follower: User,
  followerId: string,
  following: User,
  followingId: string,
}