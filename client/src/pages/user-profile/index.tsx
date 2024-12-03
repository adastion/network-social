import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import { useEffect } from "react"
import { CiEdit } from "react-icons/ci"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/follow"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import { ProfileInfo } from "../../components/profile-info"
import { BASE_URL } from "../../constants"
import { resetUser, selectUser } from "../../features/userSlice"
import { CountInfo } from "./../../components/count-info/index"
import { GoBack } from "./../../components/go-back/index"
import { formatToClientDate } from "./../../utils/format-to-client-date"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useSelector(selectUser)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserById] = useLazyGetUserByIdQuery()
  const [triggerCurrent] = useLazyCurrentQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetUser())
  }, [])

  return (
    <>
      <GoBack />
      <div className="flex items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data?.avatarUrl}`}
            alt={data?.name}
            width={200}
            height={200}
            className="border-4 borer-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data?.name}
            {currentUser?.id !== id ? (
              <Button
                color={data?.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                endContent={
                  data?.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data?.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />}>Редактировать</Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data?.email} />
          <ProfileInfo title="Местоположение" info={data?.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data?.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data?.bio} />
          <div className="flex gap-2">
            <CountInfo count={data?.followers.length ?? 0} title="Подписчики" />
            <CountInfo count={data?.following.length ?? 0} title="Подписки" />
          </div>
        </Card>
      </div>
    </>
  )
}
