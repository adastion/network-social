import { Card, CardBody } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { User } from "../../components/user"
import { selectCurrent } from "../../features/userSlice"

export const Following = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  return currentUser.following.length > 0 ? (
    <div className="flex flex-col gap-5">
      {currentUser.following.map(user => (
        <Link to={`/users/${user.following.id}`}>
          <Card>
            <CardBody className="block">
              <User
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>Вы не накого не подписаны</h2>
  )
}
