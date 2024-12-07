import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectCurrent } from "../../features/userSlice"

export const GoBack = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
    const user = useSelector(selectCurrent)
  }

  return (
    <div
      onClick={handleGoBack}
      className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer"
    >
      <FaRegArrowAltCircleLeft />
      Назад
    </div>
  )
}
