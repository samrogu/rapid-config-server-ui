'use client';

import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const OrganizationHeader = ({
  name,
  children,
}: {
  name: string;
  children?: React.ReactNode; // Permite pasar contenido adicional como el menú Kebab
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Contenedor del título */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>

      {/* Contenedor para contenido adicional */}
      {children}
    </div>
  );
};

export default OrganizationHeader;