import ConnectWallet from './ConnectWallet';
import Link from 'next/link';
import NavLink from './NavLink';
import { ThemeToggle } from './ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import React from 'react';
import { Icons } from './Icons';

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold ml-2">MegaVote</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/main">Main</NavLink>
            <NavLink href="/create">Create</NavLink>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center space-x-2 mb-6"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Icons.logo className="h-6 w-6" />
                    <span className="font-bold">MegaVote</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 text-lg font-medium">
                <NavLink href="/" onClick={() => setIsSheetOpen(false)}>
                  Home
                </NavLink>
                <NavLink href="/main" onClick={() => setIsSheetOpen(false)}>
                  Main
                </NavLink>
                <NavLink href="/create" onClick={() => setIsSheetOpen(false)}>
                  Create
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-2 flex items-center space-x-2">
             <Icons.logo className="h-6 w-6 sm:hidden" />
            <span className="font-bold hidden sm:inline-block">MegaVote</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <div className="flex-1" />
          <ThemeToggle />
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
