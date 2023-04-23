import axios from 'axios'

const urlBase = 'https://api.opendota.com/api/'

export const getHeroes = async () => {
  const response = await axios.get(`${urlBase}heroes`)

  return response?.data
};
