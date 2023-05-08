import { useState } from 'react'
import Axios, { AxiosError, AxiosInstance, Method } from 'axios'

import { useLocalStorage } from '~/hooks/useLocalStorage'

type TRequest = (body?: object) => Promise<void>

type TRequestHook<D> = [TRequest, D | null, boolean, string | string[]]

type TErrorApi = Error &
  AxiosError<{
    error: string
    message: string | string[]
    statusCode: number
  }>

const { VITE_ENV, VITE_API_URL } = import.meta.env

const httpClient: AxiosInstance = Axios.create({
  baseURL: VITE_ENV === 'demo' ? '/static/db.json' : `${VITE_API_URL}/api`
})

export function useRequest<D>(method: Method, endpoint: string): TRequestHook<D> {
  const [data, setData] = useState<D | null>(null)
  const [error, setError] = useState<string | string[]>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [session] = useLocalStorage<IAuth>('session')

  async function request(body?: object) {
    try {
      setData(null)
      setError('')
      setLoading(true)

      if (VITE_ENV === 'demo') {
        const { data: dataJSON } = await httpClient<{ [key: string]: object | object[] }>('')
        const [, resource] = endpoint.split('/')
        const data = dataJSON[resource] as D
        setData(data)
      } else {
        const { data } = await httpClient<D>(endpoint, {
          method,
          data: body,
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          }
        })
        setData(data)
      }
    } catch (err) {
      const error = err as TErrorApi
      const errorMessage = error.response ? error.response.data.message : error.message
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return [request, data, loading, error]
}
