import { useState } from 'react'

export const useSelectItem = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectItem = (id: string | null) => {
    if (selectedId === id) setSelectedId(null)
    else setSelectedId(id)
  }

  return { selectedId, selectItem }
}
