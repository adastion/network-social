import { Controller, useForm } from "react-hook-form"
import {
  useCreatePostMutation,
  useLazyGetAllPostQuery,
} from "../../app/services/postApi"
import { Button, Textarea } from "@nextui-org/react"
import { ErrorMessage } from "../error-message"
import { IoMdCreate } from "react-icons/io"

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()
  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async (data)=> {
    try {
      await createPost({content: data.post}).unwrap()
      setValue("post", "")
      await triggerAllPosts().unwrap()
    } catch (error) {
      
    }
  })

  return (
    <form className="flrx-grow" onSubmit={onSubmit}>
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="О чём думаете"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Допавить пост
      </Button>
    </form>
  )
}