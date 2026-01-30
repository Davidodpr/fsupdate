import { useState, useEffect } from 'react'

const useLocalStorage = (name: string) => {
  const [item, setItem] = useState<string | null>(null)

  useEffect(() => {
    setItem(localStorage.getItem(name))
  }, [name])

  return item
}

export default useLocalStorage
