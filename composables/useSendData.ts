import { useLoginStore } from '~/store/login'
const useSendData = async (method: string, endpoint: string, sendData: any) => {
  const config = useRuntimeConfig()
  const options: Object = {
    method: method,
    headers: headerObject(),
    body: JSON.stringify(sendData),
  }
  return await fetch(`${config.API_BASE_URL}${endpoint}`, options)
}

const headerObject = () => {
  const loginStore = useLoginStore()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${loginStore.accessToken}`,
  }
}

export default useSendData
