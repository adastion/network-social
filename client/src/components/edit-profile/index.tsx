import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { MdOutlineEmail } from "react-icons/md"
import { useParams } from "react-router-dom"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { User } from "../../app/types"
import { Input } from "../input"
import { ThemeContext } from "../theme-provider"
import { Button } from "./../button/index"
import { ErrorMessage } from "./../error-message/index"

type TypesEditProfileProps = {
  isOpen: boolean
  onClose: () => void
  user: User
}

export const EditProfile: React.FC<TypesEditProfileProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{id: string}>()

  const { handleSubmit, control } = useForm()

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        className={`${theme} text-foreground`}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Изменение профиля
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    control={control}
                    name="email"
                    label="Email"
                    type="email"
                    endContent={<MdOutlineEmail />}
                  />
                  <Input
                    control={control}
                    name="name"
                    label="Имя"
                    type="text"
                  />
                  <input
                    name="avatrUrl"
                    type="file"
                    placeholder="Выбрать файл"
                  />
                  <Input
                    control={control}
                    name="dateOfBirth"
                    label="Дата рождения"
                    type="text"
                    placeholder="Дата рождения"
                  />
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Ваша биография"
                      />
                    )}
                  />
                  <Input
                    control={control}
                    name="location"
                    label="Местоположение"
                    type="text"
                  />
                  <ErrorMessage error={error} />
                  <div className="flex justify-end gap-2">
                    <Button
                      fullwidth
                      color="primary"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Обновить профиль
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
