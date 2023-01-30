import { useState } from 'react'

type TLocalStorageHook<D> = [D | null, (data: D) => void]

export function useLocalStorage<D>(key: string): TLocalStorageHook<D | null> {
  const [value, setStorage] = useState<D | null>(() => {
    const data = JSON.parse(localStorage.getItem(key) || '{}') as D
    return JSON.stringify(data) === '{}' ? null : data
  })

  function setValue(data: D | null) {
    localStorage.setItem(key, JSON.stringify(data))
    setStorage(data)
  }

  return [value, setValue]
}
