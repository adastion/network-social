import React from "react"
import { NavButton } from "../nav-button"
import { BsPostcard } from "react-icons/bs"
import { FiUser } from "react-icons/fi"
import { FaUser } from "react-icons/fa"

type Props = {
  isHidden?: boolean
}

export const NavBar: React.FC<Props> = ({ isHidden }) => {
  let value = ""
  if (isHidden) {
    value = "hidden md:block"
  }

  return (
    <nav className={value}>
      <ul className="md:flex justify-center lg:flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>
        <li>
          <NavButton href="following" icon={<FiUser />}>
            Подписки
          </NavButton>
        </li>
        <li>
          <NavButton href="followers" icon={<FaUser />}>
            Подписчики
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
