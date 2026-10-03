"use client";

import React, { createContext, useContext, useState } from "react";

type ComposeOptions = {
  initialVendorId?: string;
  initialTitle?: string;
};

type ComposeContextType = {
  isOpen: boolean;
  options: ComposeOptions;
  openCompose: (options?: ComposeOptions) => void;
  closeCompose: () => void;
};

const ComposeContext = createContext<ComposeContextType>({
  isOpen: false,
  options: {},
  openCompose: () => {},
  closeCompose: () => {},
});

export function ComposeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ComposeOptions>({});

  function openCompose(opts: ComposeOptions = {}) {
    setOptions(opts);
    setIsOpen(true);
  }

  function closeCompose() {
    setIsOpen(false);
    setOptions({});
  }

  return (
    <ComposeContext.Provider value={{ isOpen, options, openCompose, closeCompose }}>
      {children}
    </ComposeContext.Provider>
  );
}

export function useCompose() {
  return useContext(ComposeContext);
}
