'use client';

import { createContext, useState, useContext, type ReactNode, useEffect, useCallback } from 'react';
import type { Proposal, VoteType } from '@/lib/types';
import { useWeb3 } from '@/app/hooks/useWeb3';
import { formatProposal } from '@/lib/utils';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '@/lib/constants';
import { contractAbi } from '@/lib/contract';

interface AppStateContextType {
  proposals: Proposal[];
  isLoading: boolean;
  addProposal: (proposal: Proposal) => void;
  updateVote: (proposalId: string, voteType: VoteType) => void;
  fetchProposals: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextType | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { provider } = useWeb3();

  const fetchProposals = useCallback(async () => {
    // Use a read-only provider if wallet is not connected
    const currentProvider = provider || new ethers.JsonRpcProvider('https://carrot.megaeth.com/rpc');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, currentProvider);

    setIsLoading(true);
    try {
      const proposalCount = await contract.getProposalCount();
      const proposalsData = [];
      for (let i = 0; i < proposalCount; i++) {
        const p = await contract.getProposal(i);
        proposalsData.push(formatProposal(p));
      }
      setProposals(proposalsData.reverse()); // Show newest first
    } catch (error) {
      console.error("Failed to fetch proposals:", error);
      // Optionally, set an error state to show in the UI
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const addProposal = (proposal: Proposal) => {
    setProposals(prevProposals => [proposal, ...prevProposals]);
  };

  const updateVote = (proposalId: string, voteType: 'upvote' | 'downvote') => {
    setProposals(prevProposals =>
      prevProposals.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            upvotes: voteType === 'upvote' ? p.upvotes + 1 : p.upvotes,
            downvotes: voteType === 'downvote' ? p.downvotes + 1 : p.downvotes,
          };
        }
        return p;
      })
    );
  };

  return (
    <AppStateContext.Provider value={{ proposals, isLoading, addProposal, updateVote, fetchProposals }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
