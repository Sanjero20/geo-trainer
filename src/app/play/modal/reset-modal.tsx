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
            Are you sure you want to restart?
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-center">
          Restarting will result in the loss of your progress in the current
          game.
        </DialogDescription>

        <DialogFooter className="flex-row gap-1">
          <DialogClose asChild>
            <Button variant="outline" className="w-1/2">
              Cancel
            </Button>
          </DialogClose>

          <Button variant="destructive" className="w-1/2" onClick={restartGame}>
            Restart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalResetGame;
