import React from "react"

type TypeCountInfoProps = {
  count: number
  title: string
}

export const CountInfo: React.FC<TypeCountInfoProps> = ({ title, count }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  )
}
