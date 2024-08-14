import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { TaskConfigs } from "@/types/task.types";
import EditTaskCard from "../tasks/editTaskCard";

interface DrawerProps {
    drawerTriggerElement: React.ReactNode;
    drawerContent: React.ReactNode;
    drawerHeaderTitle: React.ReactNode;
    drawerHeaderDESC: React.ReactNode;

}

const DrawerModal: React.FC<DrawerProps>  = ({drawerTriggerElement, drawerContent, drawerHeaderTitle, drawerHeaderDESC}) => {

    function onClick(adjustment: number) {
        // setGoal(Math.max(200, Math.min(400, goal + adjustment)))
      }

    return (
        <Drawer>
        <DrawerTrigger asChild>
          {drawerTriggerElement}
        </DrawerTrigger>
        <DrawerContent className="top-0 left-1000 right-0  overflow-y-auto transition-transform -translate-y-full bg-white w-96">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="border-b">
              <DrawerTitle >{drawerHeaderTitle}</DrawerTitle>
              <DrawerDescription>{drawerHeaderDESC}</DrawerDescription>
            </DrawerHeader>
            {drawerContent}    
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
                    
          </div>
        </DrawerContent>
      </Drawer>
    )
}

export default DrawerModal;