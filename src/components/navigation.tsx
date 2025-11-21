
import {
    CommandLineIcon,
    CogIcon,
    UsersIcon,
    ShieldCheckIcon,
    KeyIcon,
    BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import { NavItem } from '@/types/navigation';

export const navItems: NavItem[] = [
    {
        href: '/organizations',
        icon: <BuildingOffice2Icon className="h-6 w-6" />,
        label: 'Organizations',
    },
    {
        href: '/applications',
        icon: <CommandLineIcon className="h-6 w-6" />,
        label: 'Applications',
    },
    {
        label: 'Settings',
        icon: <CogIcon className="h-6 w-6" />,
        adminOnly: true,
        subItems: [
            {
                href: '/admin/users',
                icon: <UsersIcon className="h-5 w-5" />,
                label: 'Users',
                adminOnly: true,
            },
            {
                href: '/admin/roles',
                icon: <ShieldCheckIcon className="h-5 w-5" />,
                label: 'Roles',
                adminOnly: true,
            },
            {
                href: '/admin/permissions',
                icon: <KeyIcon className="h-5 w-5" />,
                label: 'Permissions',
                adminOnly: true,
            },
        ],
    },
];

