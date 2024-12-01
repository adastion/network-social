import { useGetAllPostQuery } from "../../app/services/postApi"
import { CreatePost } from "../../components/create-post"

export const Posts = () => {
  const { data } = useGetAllPostQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
       
      </div>
    </>
  )
}
