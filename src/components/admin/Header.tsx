'use client';

import { useUser } from '@/hooks/useUser';
import { supabase } from '@/lib/supabase/supabase';
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
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

function getTitleFromPathname(pathname: string): string {
  const segment = pathname.split('/').pop() || 'dashboard';
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function AdminHeader() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const avatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');
  const pageTitle = getTitleFromPathname(pathname);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/admin/login');
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

  const displayName = user?.user_metadata?.full_name || user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.profile_image || (avatar ? avatar.imageUrl : undefined);


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
                  src={avatarUrl}
                  alt={displayName || 'Admin'}
                />
                <AvatarFallback>{getInitials(user.email || '')}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium">
                  {displayName}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{displayName}</span>
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
