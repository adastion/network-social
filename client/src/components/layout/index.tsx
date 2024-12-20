import { Outlet, useNavigate } from "react-router-dom"
import { Container } from "../container"
import { Header } from "../header"
import { NavBar } from "../nav-bar"
import { useSelector } from "react-redux"
import { selectIsAuthenticated, selectUser } from "../../features/userSlice"
import { useEffect } from "react"
import { UserProfile } from "../prifile"
import { Menu } from './../menu/index';

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Menu />
          <NavBar isHidden />
        </div>
        <div className="flex flex-col-reverse md:flex-row flex-1">
          <div className="flex-1 p-4">
            <Outlet />
          </div>
          <div className="flex-col p-4">
            <div className="flex flex-col gap-5">
              {!user && <UserProfile />}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
