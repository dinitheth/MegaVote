'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWeb3 } from '@/app/hooks/useWeb3';
import { MEGA_EXPLORER_URL } from '@/lib/constants';
import { ethers } from 'ethers';

const proposalSchema = z.object({
  title: z.string().min(1, "Title is required.").max(100, 'Title cannot be longer than 100 characters.'),
  description: z.string().min(1, "Description is required.").max(300, 'Description cannot be longer than 300 characters.'),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

interface CreateProposalFormProps {
  onProposalCreated: () => void;
}

export default function CreateProposalForm({ onProposalCreated }: CreateProposalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { contract, isConnected, connectWallet } = useWeb3();
  const router = useRouter();

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { watch } = form;
  const titleLength = watch('title')?.length || 0;
  const descriptionLength = watch('description')?.length || 0;

  const handleSubmit = async (values: ProposalFormValues) => {
    if (!isConnected || !contract) {
      toast({
        variant: 'destructive',
        title: 'Wallet not connected',
        description: 'Please connect your wallet to create a proposal.',
      });
      connectWallet();
      return;
    }

    setIsSubmitting(true);
    try {
      const tx = await contract.createProposal(values.title, values.description);
      
      toast({
        title: 'Transaction Submitted',
        description: 'Waiting for your proposal to be confirmed on the blockchain.',
      });

      const receipt = await tx.wait();

      onProposalCreated();

      toast({
        title: 'Proposal Created!',
        description: 'Your proposal is now live for voting.',
        action: (
          <a href={`${MEGA_EXPLORER_URL}/tx/${receipt.hash}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <LinkIcon className="mr-2" />
              View on Explorer
            </Button>
          </a>
        ),
      });

      form.reset();
      router.push('/main');
    } catch (error: any) {
      console.error('Failed to create proposal:', error);
      toast({
        variant: 'destructive',
        title: 'Error creating proposal',
        description: error?.data?.message || error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
        <div className='text-center mb-8 sm:mb-10'>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Create a New Proposal</h1>
            <p className="mt-2 text-muted-foreground">
                Fill out the details below to submit your proposal to the DAO.
            </p>
        </div>
        <div className="border rounded-lg p-4 sm:p-8">
            <h2 className="text-xl font-semibold mb-6">Proposal Details</h2>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Proposal Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Should MegaVote launch a token?" {...field} />
                    </FormControl>
                    <div className="flex justify-between items-center">
                        <FormDescription>
                        Your proposal must be a Yes/No question.
                        </FormDescription>
                        <span className="text-xs text-muted-foreground">{titleLength}/100</span>
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Proposal Description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Describe your proposal..."
                        className="resize-none"
                        rows={5}
                        {...field}
                        />
                    </FormControl>
                     <div className="flex justify-between items-center">
                        <FormDescription>
                            Add short context to help members decide Yes or No.
                        </FormDescription>
                        <span className="text-xs text-muted-foreground">{descriptionLength}/300</span>
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto">
                    {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 animate-spin" />
                        Submitting...
                    </>
                    ) : (
                    'Submit Proposal'
                    )}
                </Button>
                </div>
            </form>
            </Form>
        </div>
    </div>
  );
}
