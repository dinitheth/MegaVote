import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Proposal } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to format proposal ID
export function formatProposalId(id: number | bigint): string {
  return `PIP-${String(id).padStart(3, '0')}`;
}

// Helper to format proposal data from contract
export function formatProposal(contractProposal: any): Proposal {
  const id = BigInt(contractProposal.id);
  return {
    id: formatProposalId(Number(id)),
    title: contractProposal.title,
    description: contractProposal.description,
    proposer: contractProposal.proposer,
    upvotes: Number(BigInt(contractProposal.upvotes)),
    downvotes: Number(BigInt(contractProposal.downvotes)),
  };
}
