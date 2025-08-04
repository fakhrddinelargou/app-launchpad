import {  Dialog, DialogPanel } from "@headlessui/react";
import {  type ReactNode } from "react";

type Props = {

  isOpen: boolean;
close : ()=>void
children : ReactNode

};
export default function GenericDialog({ isOpen ,close , children }: Props) {
  return (
    
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 top-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl  p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
             {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>

  );
}
