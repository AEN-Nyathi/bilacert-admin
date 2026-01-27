'use client';

import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

function getTitleFromPathname(pathname: string): string {
  const segment = pathname.split('/').pop() || 'dashboard';
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function AdminHeader() {
  const { user } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const pathname = usePathname();
  const avatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');
  const pageTitle = getTitleFromPathname(pathname);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: error.message,
      });
    }
  };

  const getInitials = (email: string) => {
    return email ? email.substring(0, 2).toUpperCase() : 'AD';
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="hidden text-xl font-semibold md:block">{pageTitle}</h1>
      </div>

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.photoURL || (avatar ? avatar.imageUrl : undefined)}
                  alt={user.displayName || user.email || 'Admin'}
                />
                <AvatarFallback>{getInitials(user.email || '')}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium">
                  {user.displayName || user.email}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user.displayName || 'Admin'}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
