'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchDialog } from '@/components/search-dialog-provider'
import { getVendors } from '@/lib/vendors'

export function SearchBar() {
  const { openSearchDialog } = useSearchDialog()
  const [placeholderText, setPlaceholderText] = useState('')
  const [vendors, setVendors] = useState<string[]>([])
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchVendors = async () => {
      const vendorData = await getVendors()
      setVendors(vendorData.map(vendor => vendor.name))
    }
    fetchVendors()
  }, [])

  useEffect(() => {
    if (vendors.length === 0) return;

    let currentIndex = 0
    let currentText = ''
    let isDeleting = false

    const typeEffect = () => {
      if (isDeleting) {
        currentText = currentText.slice(0, -1);
        if (currentText === '') {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % vendors.length;
        }
      } else {
        currentText = vendors[currentIndex].slice(0, currentText.length + 1);
        if (currentText === vendors[currentIndex]) {
          isDeleting = true;
          clearInterval(intervalId);
          setTimeout(() => {
            intervalId = setInterval(typeEffect, 100);
          }, 1000);
        }
      }
      setPlaceholderText(currentText);
    };

    let intervalId = setInterval(typeEffect, 100);
    return () => clearInterval(intervalId)
  }, [vendors])

  return (
    <div className="w-full max-w-lg mx-auto">
      <p className="text-sm text-gray-300 text-center mb-2">
        Busca: <span className="font-bold">{placeholderText}</span>
      </p>
      <div ref={searchContainerRef} className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar comercios en Navarron..."
            className="w-full h-12 pl-10 pr-24 text-lg text-gray-700 placeholder-gray-500 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={openSearchDialog}
            readOnly
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={openSearchDialog}>
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}

