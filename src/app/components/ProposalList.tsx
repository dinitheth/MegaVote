'use client';

import type { Proposal, VoteType } from '@/lib/types';
import ProposalCard from './ProposalCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ProposalListProps {
  proposals: Proposal[];
  onVote: (proposalId: string, voteType: VoteType) => void;
  isLoading: boolean;
}

export default function ProposalList({ proposals, onVote, isLoading }: ProposalListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-medium text-muted-foreground">No proposals yet.</h2>
        <p className="text-muted-foreground">Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {proposals.map(proposal => (
        <ProposalCard key={proposal.id} proposal={proposal} onVote={onVote} />
      ))}
    </div>
  );
}
