'use client';
import CreateProposalForm from "@/app/components/CreateProposal";
import Header from "@/app/components/Header";
import { useAppState } from "@/app/components/providers/AppStateProvider";

export default function CreatePage() {
    const { addProposal, fetchProposals } = useAppState();

    const handleProposalCreated = async () => {
        // Refetch proposals after a new one is created
        await fetchProposals();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex justify-center">
                 <CreateProposalForm 
                    onProposalCreated={handleProposalCreated} 
                 />
            </main>
             <footer className="py-6 text-center text-muted-foreground">
                Built on MEGA Testnet
            </footer>
        </div>
    )
}
