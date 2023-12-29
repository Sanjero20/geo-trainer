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
        <div className="h-64 w-full rounded bg-zinc-300"></div>

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
