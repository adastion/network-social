import React from "react"
import { IconType } from "react-icons"

type TypeMetaInfoProps = {
  count: number
  Icon: IconType
}

export const MetaInfo: React.FC<TypeMetaInfoProps> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {count > 0 && (
        <p className="font-semibold text-default-400 text-l"> {count}</p>
      )}
      <p className="text-default-400 text-xl hover:text-2xl ease-in-out duration-100">
        <Icon />
      </p>
    </div>
  )
}
