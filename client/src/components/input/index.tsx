import { Input as InputNextUi } from "@nextui-org/react"
import React from "react"
import { Control, useController } from "react-hook-form"

type TypeInputProps = {
  name: string
  label: string
  type?: string
  placeholder?: string
  control?: Control<any>
  required?: string
  endContent?: JSX.Element
}

export const Input: React.FC<TypeInputProps> = ({
  name,
  label,
  type,
  placeholder,
  control,
  required = "",
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })

  return (
    <InputNextUi
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
      endContent={endContent}
    />
  )
}
