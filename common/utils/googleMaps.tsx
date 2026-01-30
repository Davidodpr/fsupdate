export const loadGoogleMapsApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Google Maps API can only be loaded in the browser.'))
      return
    }

    if (window.google && window.google.maps) {
      resolve() // Google Maps API is already loaded
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker&region=SE&loading=async`
    script.async = true
    script.defer = true

    script.onload = () => resolve()
    script.onerror = (error) => reject(error)

    document.head.appendChild(script)
  })
}
