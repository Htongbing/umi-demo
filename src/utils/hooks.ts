import { useState, useEffect } from 'react'

export const useUpdate: (update: () => void, dependent?: Array<any>) => void = (update, dependent) => {
  const [first, setFirst] = useState<boolean>(true)

  useEffect(() => {
    if (!first) return update()
    setFirst(false)
  }, dependent)
}