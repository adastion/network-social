import { Card, CardBody } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { User } from "../../components/user"
import { selectCurrent } from "../../features/userSlice"

export const Followers = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  return currentUser.followers.length > 0 ? (
    <div className="flex flex-col gap-5">
      {currentUser.followers.map(user => (
        <Link to={`/users/${user.follower.id}`}>
          <Card>
            <CardBody className="block">
              <User
                name={user.follower.name ?? ""}
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>На вас никто не подписан</h2>
  )
}
