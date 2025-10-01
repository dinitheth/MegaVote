'use client';

import { useWeb3 } from '@/app/hooks/useWeb3';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, AlertTriangle } from 'lucide-react';
import { MEGA_CHAIN_ID } from '@/lib/constants';

export default function ConnectWallet() {
  const { connectWallet, address, chainId } = useWeb3();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (address) {
    return (
      <div className="flex items-center gap-2">
        {chainId === MEGA_CHAIN_ID ? (
             <Badge variant="secondary" className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                MEGA Testnet
             </Badge>
        ) : (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Wrong Network
          </Badge>
        )}
        <Badge variant="outline">{truncateAddress(address)}</Badge>
      </div>
    );
  }

  return (
    <Button onClick={connectWallet}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
