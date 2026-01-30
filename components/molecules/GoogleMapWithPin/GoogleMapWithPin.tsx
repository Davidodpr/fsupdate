import React, { useEffect, useRef } from 'react'

export interface GoogleMapWithPinProps {
  lat: number
  lng: number
}

const GoogleMapWithPin = ({ lat, lng }: GoogleMapWithPinProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== undefined && lat && lng) {
      // Check if desktop (viewport width > 768px)
      const isDesktop = window.innerWidth >= 768

      // Calculate offset to move the pin position on the screen
      // For mobile: negative offset moves the pin higher on screen
      // For desktop: positive offset moves the pin lower on screen
      const latOffset = isDesktop ? 0.008 : -0.002 // Mobile: pin higher, Desktop: pin lower

      const pinPosition = { lat: lat, lng: lng }
      const mapCenter = {
        lat: lat + latOffset, // Offset the center latitude
        lng: lng,
      }

      const mapOptions = {
        zoom: 15,
        center: mapCenter, // Use offset center
        disableDefaultUI: true,
        mapTypeId: 'satellite',
        isFractionalZoomEnabled: false,
        gestureHandling: 'none',
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        scaleControl: false,
        rotateControl: false,
        clickableIcons: false,
        mapId: 'DEMO_MAP_ID',
      }
      const map = new window.google.maps.Map(mapRef.current as HTMLDivElement, mapOptions)
      const markerImage = document.createElement('img')
      markerImage.src = '/images/Flyttsmart_marker.svg'
      new window.google.maps.marker.AdvancedMarkerElement({
        position: pinPosition, // Pin stays at actual location
        map: map,
        content: markerImage,
      })
    }
  }, [lat, lng])

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      <div style={{ width: '100%', height: 'calc(100% + 60px)', position: 'absolute', top: '0', left: '0' }} ref={mapRef}></div>
    </div>
  )
}

export default GoogleMapWithPin
