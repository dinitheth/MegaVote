export type Proposal = {
  id: string; // Changed from number to string to support "PIP-XXX" format
  title: string;
  description: string;
  proposer: string;
  upvotes: number;
  downvotes: number;
};

export type VoteType = 'upvote' | 'downvote';
