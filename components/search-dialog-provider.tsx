'use client'

import React, { createContext, useContext, useState } from 'react'

interface SearchDialogContextType {
  isOpen: boolean
  openSearchDialog: () => void
  closeSearchDialog: () => void
}

const SearchDialogContext = createContext<SearchDialogContextType | undefined>(undefined)

export function SearchDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openSearchDialog = () => setIsOpen(true)
  const closeSearchDialog = () => setIsOpen(false)

  return (
    <SearchDialogContext.Provider value={{ isOpen, openSearchDialog, closeSearchDialog }}>
      {children}
    </SearchDialogContext.Provider>
  )
}

export function useSearchDialog() {
  const context = useContext(SearchDialogContext)
  if (context === undefined) {
    throw new Error('useSearchDialog must be used within a SearchDialogProvider')
  }
  return context
}

