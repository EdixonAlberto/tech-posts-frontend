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

export function useRequest<D>(method: Method, endpoint: string): TRequestHook<D> {
  const [data, setData] = useState<D | null>(null)
  const [error, setError] = useState<string | string[]>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [session] = useLocalStorage<IAuth>('session')

  async function request(body?: object) {
    const httpClient: AxiosInstance = Axios.create({
      baseURL: 'http://localhost:3000/api',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    })

    try {
      setLoading(true)
      const { data } = await httpClient<D>(endpoint, { method, data: body })
      setData(data)
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
