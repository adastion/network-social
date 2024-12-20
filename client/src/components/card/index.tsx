import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUiCard,
  Spinner,
} from "@nextui-org/react"
import React, { useState } from "react"
import { FcDislike } from "react-icons/fc"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useDeleteCommentMutation } from "../../app/services/comment"
import {
  useAddLikeMutation,
  useDeleteLikeMutation,
} from "../../app/services/likesApi"
import {
  useDeletePostMutation,
  useLazyGetAllPostQuery,
  useLazyGetPostByIdQuery,
} from "../../app/services/postApi"
import { selectCurrent } from "../../features/userSlice"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { MetaInfo } from "../meta-info"
import { Typography } from "../typography"
import { User } from "../user"
import { FaRegComment } from "react-icons/fa"
import { ErrorMessage } from "./../error-message/index"
import { hasErrorFild } from "../../utils/has-error-fild"

type TypeCardProps = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  commentsCount?: number
  likesCount?: number
  createdAt?: Date
  id?: string
  cardFor?: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

export const Card: React.FC<TypeCardProps> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  commentsCount = 0,
  likesCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useAddLikeMutation()
  const [unlikePost] = useDeleteLikeMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrent)

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap()
        break
      case "current-post":
        await triggerGetAllPosts().unwrap()
        break
      case "comment":
        await triggerGetPostById(id).unwrap()
      default:
        throw new Error("Не верный аргумент cardFor")
    }
  }

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap()
          await refetchPosts()
          break
        case "current-post":
          await deletePost(id).unwrap()
          navigate("/")
          break
        case "comment":
          await deleteComment(commentId).unwrap()
          await refetchPosts()
          break
        default:
          throw new Error("Не верный аргумент cardFor")
      }
    } catch (error) {
      if (hasErrorFild(error)) {
        setError(error.data.error)
      } else [setError(error as string)]
    }
  }

  const handleClik = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()
      await refetchPosts()

      if (cardFor === "post") {
        await triggerGetAllPosts().unwrap()
      }

      if (cardFor === "current-post") {
        await triggerGetPostById(id).unwrap()
      }
    } catch (error) {}
  }

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer">
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine onClick={handleDelete} />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleClik}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  )
}
