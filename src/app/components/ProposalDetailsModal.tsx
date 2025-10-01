import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { Proposal } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProposalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal | null;
}

export default function ProposalDetailsModal({
  isOpen,
  onClose,
  proposal,
}: ProposalDetailsModalProps) {
  if (!proposal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pr-6">{proposal.title}</DialogTitle>
          <DialogDescription>
            {proposal.id} by{' '}
            <a
              href={`https://www.megaexplorer.xyz/address/${proposal.proposer}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {proposal.proposer}
            </a>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-6">
            <p className="text-sm text-foreground my-4">
                {proposal.description}
            </p>
        </ScrollArea>
        <DialogFooter className="sm:justify-between items-center border-t pt-4">
          <div className="flex gap-6 items-center">
             <Badge variant="secondary" className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span>{proposal.upvotes.toLocaleString()} Votes For</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-red-500" />
                <span>{proposal.downvotes.toLocaleString()} Votes Against</span>
              </Badge>
          </div>
          <Button onClick={onClose} variant="outline" className="mt-4 sm:mt-0">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
