import { Button as NextButton } from "@nextui-org/react"
import React from "react"

type TypeButtonProps = {
  children: React.ReactNode
  icon?: JSX.Element
  className: string
  type?: "button" | "submit" | "reset"
  fullwidth?: boolean
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

export const Button: React.FC<TypeButtonProps> = ({
  children,
  icon,
  className,
  type,
  fullwidth,
  color,
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullwidth}
    >
      {children}
    </NextButton>
  )
}
