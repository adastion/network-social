export type User = {
  id: string
  email: string
  password: string
  name?: string
  avatarUrl?: string
  dateOfBirth?: Date
  createdAt: Date
  updateAt: Date
  bio?: string
  location?: string
  posts: Post[]
  likes: Like[]
  comments: Comment[]
  followers: Follows[]
  following: Follows[]
  isFollowing?: boolean
}

export type Follows = {
  id: string
  follower: User
  followerId: string
  following: User
  followingId: string
}

export type Post = {
  id: string
  content: string
  author: User
  authorId: string
  likes: Like[]
  comments: Comment[]
  likedByUser: boolean
  createdAt: Date
  updateAt: Date
}

export type Like = {
  id: string
  user: User
  userId: string
  post: Post[]
  postId: string
}

export type Comment = {
  id: string
  content:string
  user: User
  userId: string
  post: Post[]
  postId: string
}
