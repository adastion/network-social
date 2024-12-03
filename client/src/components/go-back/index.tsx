import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export const GoBack = () => {
  const navigate = useNavigate()
  const handelGoBack = () => {
    navigate(-1)
  }

  return (
    <div
      onClick={handelGoBack}
      className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer"
    >
      <FaRegArrowAltCircleLeft />
      Назад
    </div>
  )
}
