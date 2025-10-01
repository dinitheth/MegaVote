'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Loader2, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWeb3 } from '@/app/hooks/useWeb3';
import { useAppState } from '@/app/components/providers/AppStateProvider';
import type { Proposal, VoteType } from '@/lib/types';
import { MEGA_EXPLORER_URL } from '@/lib/constants';
import ProposalDetailsModal from './ProposalDetailsModal';

interface ProposalCardProps {
  proposal: Proposal;
  onVote: (proposalId: string, voteType: VoteType) => void;
}

export default function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  const [votingState, setVotingState] = useState<'upvote' | 'downvote' | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const { contract, isConnected, connectWallet } = useWeb3();
  const { fetchProposals } = useAppState();

  const playVoteSound = () => {
    const audio = new Audio('/sound.mp3');
    audio.play().catch(error => {
      // Autoplay was prevented or other error occurred
      console.error("Failed to play vote sound:", error);
    });
  };

  const handleVote = async (voteType: VoteType) => {
    if (!isConnected || !contract) {
      toast({
        variant: 'destructive',
        title: 'Wallet not connected',
        description: 'Please connect your wallet to vote.',
      });
      connectWallet();
      return;
    }
    
    setVotingState(voteType);
    try {
      const proposalIdNumber = parseInt(proposal.id.split('-')[1], 10);
      const voteFor = voteType === 'upvote';
      
      const tx = await contract.vote(proposalIdNumber, voteFor);

      toast({
        title: 'Transaction Submitted',
        description: `Submitting your ${voteType} to the blockchain.`,
      });
      
      const receipt = await tx.wait();
      
      // Play sound on successful vote
      playVoteSound();
      
      // Manually update the vote count for immediate feedback
      onVote(proposal.id, voteType);

      toast({
        title: `Vote Cast!`,
        description: `Your ${voteType} has been recorded on-chain.`,
        action: (
          <a href={`${MEGA_EXPLORER_URL}/tx/${receipt.hash}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <LinkIcon className="mr-2" />
              View
            </Button>
          </a>
        ),
      });

    } catch (error: any) {
        const reason = error?.reason || (error?.data?.message) || error.message || '';

        if (reason.includes('You have already voted on this proposal')) {
            toast({
                variant: 'destructive',
                title: 'Already Voted',
                description: 'You have already cast your vote on this proposal.',
            });
        } else {
             console.error(`Failed to ${voteType}:`, error);
             toast({
                variant: 'destructive',
                title: 'Vote Failed',
                description: reason || 'There was an error recording your vote.',
            });
        }
    } finally {
      setVotingState(null);
    }
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-lg">{proposal.title}</CardTitle>
          </div>
          <CardDescription>
            {proposal.id} by {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {proposal.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="group"
              onClick={() => handleVote('upvote')}
              disabled={!!votingState}
            >
              {votingState === 'upvote' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin text-green-400" />
              ) : (
                <ArrowUp className="h-4 w-4 mr-2 text-green-400 group-hover:scale-125 transition-transform" />
              )}
              {proposal.upvotes.toLocaleString()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="group"
              onClick={() => handleVote('downvote')}
              disabled={!!votingState}
            >
              {votingState === 'downvote' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin text-red-400" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-2 text-red-400 group-hover:scale-125 transition-transform" />
              )}
              {proposal.downvotes.toLocaleString()}
            </Button>
          </div>
          <Button variant="link" size="sm" onClick={() => setIsDetailsOpen(true)}>
            Details
          </Button>
        </CardFooter>
      </Card>
      <ProposalDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        proposal={proposal}
      />
    </>
  );
}
