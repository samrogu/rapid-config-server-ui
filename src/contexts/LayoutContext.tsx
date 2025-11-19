'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
  title: string;
  actionButton: ReactNode | undefined;
  setLayoutInfo: (title: string, actionButton?: ReactNode) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string>('');
  const [actionButton, setActionButton] = useState<ReactNode | undefined>(undefined);

  const setLayoutInfo = (newTitle: string, newActionButton?: ReactNode) => {
    setTitle(newTitle);
    setActionButton(newActionButton);
  };

  return (
    <LayoutContext.Provider value={{ title, actionButton, setLayoutInfo }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
