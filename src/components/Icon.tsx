
'use client';

import {
  Shield,
  CheckSquare,
  FileText,
  Radio,
  Sailboat,
  Package,
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Users,
  FileSpreadsheet,
  type LucideProps,
  type LucideIcon,
  HelpCircle,
  Settings,
  User,
  CreditCard,
  DollarSign,
  BarChart,
  Clock,
  Book,
  Check,
} from 'lucide-react';

export const iconMap: { [key: string]: LucideIcon } = {
  Shield,
  CheckSquare,
  FileText,
  Radio,
  Sailboat,
  Package,
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Users,
  FileSpreadsheet,
  Settings,
  User,
  CreditCard,
  DollarSign,
  BarChart,
  Clock,
  Book,
  Check,
};

interface IconProps extends LucideProps {
  name: string;
}

export const Icon = ({ name, ...props }: IconProps) => {
  if (!name) {
    return <HelpCircle {...props} />;
  }
  const LucideIcon = iconMap[name.charAt(0).toUpperCase() + name.slice(1)];

  if (!LucideIcon) {
    return <HelpCircle {...props} />; // A default fallback icon for unknown names
  }

  return <LucideIcon {...props} />;
};

export default Icon;
