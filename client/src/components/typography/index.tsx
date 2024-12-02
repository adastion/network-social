import React from "react"

type TypyTypogrphyProps = {
  children: string
  size?: string
}

export const Typography: React.FC<TypyTypogrphyProps> = ({
  children,
  size = "text-xl",
}) => {
  return <p className={`${size}`}>{children}</p>
}
