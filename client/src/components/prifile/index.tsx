import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../constants"
import { selectCurrent } from "../../features/userSlice"
import { MdAlternateEmail } from "react-icons/md"

export const UserProfile = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  const { id, name, email, avatarUrl } = currentUser
  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="card profilr"
          className="object-cover rounded-xl"
          src={`${BASE_URL}${avatarUrl}`}
          width={370}
        />
      </CardHeader>
      <CardBody>
        <Link to={`/user/${id}`}>
          <h4 className="font-bold mb-2 text-large">{name}</h4>
          <p className="text-default-500 flex items-center gap-2">
            <MdAlternateEmail />
            {email}
          </p>
        </Link>
      </CardBody>
    </Card>
  )
}
