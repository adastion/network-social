import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useContext } from "react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout, selectIsAuthenticated } from "../../features/userSlice"
import { ThemeContext } from "../theme-provider"
import { CiLogout } from "react-icons/ci"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOut = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit text-4xl">
          Adastion social project
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          onClick={toggleTheme}
          className="lg-flex text-3xl cursor-pointer"
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={logOut}
            >
              <CiLogout /> <span>Выход</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
