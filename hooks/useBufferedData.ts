import { useEffect, useState } from 'react'
import useSWR from 'swr'

export const useBufferedData = <T extends Object | Array<any>>(
  route: string
): { data: T | undefined; stale: boolean; update: () => void; error: any } => {
  const { data, error } = useSWR<T>(route)
  const [buffer, setBuffer] = useState<T | undefined>(data)

  if ((data && !buffer) || (data as []).length < (buffer as []).length) setBuffer(data)

  return {
    data: buffer,
    error,
    stale: buffer !== data,
    update: () => setBuffer(data),
  }
}
