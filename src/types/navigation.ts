import { ReactNode } from 'react';

export interface NavItem {
    href?: string;
    icon: ReactNode;
    label: string;
    subItems?: NavItem[];
    adminOnly?: boolean; // Indica si el item solo es visible para admins
}
