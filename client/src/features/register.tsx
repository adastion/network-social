import { Button, Link } from "@nextui-org/react"
import { Input } from "../components/input"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useRegisterMutation } from "../app/services/userApi"
import { hasErrorFild } from "../utils/has-error-fild"
import { ErrorMessage } from "./../components/error-message/index"

type TypeRegister = {
  name: string
  email: string
  password: string
}

type TypeRegisterProps = {
  setSelected: (value: string) => void
}

export const Register: React.FC<TypeRegisterProps> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TypeRegister>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const navigite = useNavigate()
  const [error, setError] = useState("")

  const onSubmit = async (data: TypeRegister) => {
    try {
      console.log(data)
      await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorFild(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="name"
        label="Имя"
        type="text"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Уже есть аккаунт?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => {
            setSelected("login")
          }}
        >
          Войти в кабинет
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}
