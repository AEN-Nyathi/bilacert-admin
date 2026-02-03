'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
  Settings,
  Users,
  FileSpreadsheet,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/supabase';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/services', icon: Briefcase, label: 'Services' },
  { href: '/admin/blogs', icon: FileText, label: 'Blogs' },
  { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
  { href: '/admin/contacts', icon: Users, label: 'Contacts' },
  { href: '/admin/form_submissions', icon: FileSpreadsheet, label: 'Submissions' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { setOpenMobile } = useSidebar();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setOpenMobile(false);
      router.push('/admin/login');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: error.message,
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/admin/dashboard" className="flex items-center gap-2" onClick={() => setOpenMobile(false)}>
          <Logo className="h-8 w-8 text-sidebar-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">
            Bilacert Admin
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                className="w-full justify-start"
                tooltip={item.label}
                onClick={() => setOpenMobile(false)}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full justify-start"
              tooltip="Settings"
              onClick={() => setOpenMobile(false)}
            >
              <Link href="#">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full justify-start"
              tooltip="Log out"
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
