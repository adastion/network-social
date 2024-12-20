import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@nextui-org/react"
import { NavBar } from "../nav-bar"
import { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import { CiMenuBurger } from "react-icons/ci"

export const Menu = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { theme } = useContext(ThemeContext)

  const handleOpen = (placement: "left" | "right" | "top" | "bottom") => {
    onOpen()
  }

  return (
    <>
      <div className="md:hidden flex flex-wrap gap-3">
        <Button
          type="button"
          className="capitalize"
          onPress={() => handleOpen("right")}
        >
          <CiMenuBurger className="size-7" />
        </Button>
      </div>
      <Drawer
        size="lg"
        isOpen={isOpen}
        placement={"right"}
        onOpenChange={onOpenChange}
        className={`${theme} text-foreground w-100`}
      >
        <DrawerContent>
          {onClose => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Navigation
              </DrawerHeader>
              <DrawerBody>
                <NavBar />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
