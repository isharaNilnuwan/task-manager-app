"use client";

import { Dispatch, SetStateAction } from "react";
import { Drawer } from "vaul";

interface DrawerProps {
    drawerTriggerElement: React.ReactNode;
    drawerContent: React.ReactNode;
    drawerHeaderTitle?: React.ReactNode;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;

}

const  DrawerModal:React.FC<DrawerProps> = ({drawerTriggerElement, drawerContent, drawerHeaderTitle, open, setOpen})  => {
  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        {drawerTriggerElement}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] top-14 w-[400px]  fixed bottom-0 right-0">
          <div className="p-4 bg-white flex-1 h-full">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                {drawerHeaderTitle}
              </Drawer.Title>
             {drawerContent}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default DrawerModal;
