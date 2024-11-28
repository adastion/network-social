import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useContext, useEffect } from "react"
import { FaRegMoon } from "react-icons/fa"
import { IoExitOutline } from "react-icons/io5"
import { LuSunMedium } from "react-icons/lu"
import { ThemeContext } from "../theme-provider"
import { NavButton } from "./../nav-button/index"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const logOut = () => {
    localStorage.removeItem("token")
  }
  
  useEffect(()=> {

  }, [])
  

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
          <NavButton href="/auth" icon={<IoExitOutline />} onPress={logOut}>
            Выход
          </NavButton>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
