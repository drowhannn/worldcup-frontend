import { useLoginStore } from '@/store/login'

const useGetDataAuth = async (endpoint: string) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  return $fetch(`${config.API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${loginStore.accessToken}` },
  })
}

export default useGetDataAuth
