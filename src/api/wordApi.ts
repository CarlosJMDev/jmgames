import axios from 'axios'

const wordApi = axios.create({
  baseURL: 'https://random-word-api.vercel.app/api?words=1&type=uppercase ',
})

export default wordApi
