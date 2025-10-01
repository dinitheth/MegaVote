'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useWeb3 } from '@/app/hooks/useWeb3';
import ConnectWallet from './components/ConnectWallet';
import Header from './components/Header';
import { Badge } from '@/components/ui/badge';
import { MEGA_CHAIN_ID } from '@/lib/constants';

export default function Home() {
  const { address, chainId } = useWeb3();
  const chainName = 'MEGA Testnet';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 h-full w-full bg-transparent bg-[radial-gradient(#4d2e8a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        <div className="z-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-sm sm:text-base">
            <Badge variant="outline">{chainName}</Badge>
            <span className="text-muted-foreground">
              MEGA • Chain ID {MEGA_CHAIN_ID} • ETH
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Welcome to MegaVote
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground mb-8 text-base sm:text-lg">
            Engage with decentralized governance. Connect your wallet to browse
            active proposals or submit your own for community consideration.
          </p>
          <div className="flex gap-4 justify-center">
            {address ? (
              <Button asChild size="lg">
                <Link href="/main">
                  Go to Main <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
             <ConnectWallet />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
