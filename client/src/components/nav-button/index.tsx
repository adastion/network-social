import React from "react"
import { Button } from "../button"
import { Link } from "@nextui-org/react"

type TypeNavBarProps = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
  onPress?: () => void
}

export const NavButton: React.FC<TypeNavBarProps> = ({
  children,
  icon,
  href,
  onPress,
}) => {
  return (
    <Button className="flex items-center justify-start text-xl text-inherit" icon={icon}>
      <Link onPress={onPress} href={href} className="text-xl text-inherit">
        {children}
      </Link>
    </Button>
  )
}
