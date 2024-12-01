import React from "react"

type TypeContainerProps = {
  children: React.ReactElement[] | React.ReactElement
}

export const Container: React.FC<TypeContainerProps> = ({ children }) => {
  return <div className="flex max-w-screen-xl max-auto mt-10 mx-auto">{children}</div>
}
