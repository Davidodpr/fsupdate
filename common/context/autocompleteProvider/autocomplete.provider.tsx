'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadGoogleMapsApi } from '@/common/utils/googleMaps'


interface AutocompleteServiceContextType {
  autocompleteService: google.maps.places.AutocompleteService | null
}
const AutocompleteServiceContext = createContext<AutocompleteServiceContextType | undefined>(undefined)

export const AutocompleteServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null)

  useEffect(() => {
    const newGoogleMapsApiInit = async () => {
      try {
        await loadGoogleMapsApi()
        const checkGoogleMapsLoaded = () => {
          if (window.google && window.google.maps && window.google.maps.places) {
            setAutocompleteService(new window.google.maps.places.AutocompleteService())
          } else {
            setTimeout(checkGoogleMapsLoaded, 1000)
          }
        }
        checkGoogleMapsLoaded()
      } catch (error) {
        console.error('Failed to load Google Maps API:', error)
      }
    }

    newGoogleMapsApiInit()
  }, [])

  return <AutocompleteServiceContext.Provider value={{ autocompleteService }}>{children}</AutocompleteServiceContext.Provider>
}

export const useAutocompleteService = (): google.maps.places.AutocompleteService | null => {
  const context = useContext(AutocompleteServiceContext)
  if (!context) {
    throw new Error('useAutocompleteService must be used within an AutocompleteServiceProvider')
  }
  return context.autocompleteService
}
