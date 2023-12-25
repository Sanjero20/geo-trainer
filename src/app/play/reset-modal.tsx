import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  restartGame: () => void;
}

function ModalResetGame({ open, onOpenChange, restartGame }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[999]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Do you want to restart?
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-center text-lg"></DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button variant="destructive" onClick={restartGame}>
            Restart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalResetGame;
