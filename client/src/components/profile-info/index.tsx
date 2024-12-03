import React from "react"

type TypeProfileInfoProps = {
  title: string
  info?: string
}

export const ProfileInfo: React.FC<TypeProfileInfoProps> = ({
  title,
  info,
}) => {
  if (!info) {
    return null
  }

  return (
    <p className="font-semibold">
      <span className="text-gray-500 mr-2">{title}</span>
      {info}
    </p>
  )
}
