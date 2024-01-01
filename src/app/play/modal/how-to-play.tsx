import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

function HowToPlay({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[999]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            How to play?
          </DialogTitle>
        </DialogHeader>

        {/* Image */}
        <div className="relative h-fit w-full overflow-hidden rounded">
          <Image
            src="/demo.gif"
            alt="demo.gif"
            width={0}
            height={0}
            className="w-full object-cover"
          />
        </div>

        <DialogDescription className="text-center text-lg">
          Your goal is to quickly pinpoint the province on the map.
        </DialogDescription>

        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default HowToPlay;
