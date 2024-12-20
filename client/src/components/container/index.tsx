import React from "react"

type TypeContainerProps = {
  children: React.ReactElement[] | React.ReactElement
}

export const Container: React.FC<TypeContainerProps> = ({ children }) => {
  return <div className="flex flex-col lg:flex-row max-w-screen-xl max-auto mt-10 mx-auto">{children}</div>
}
