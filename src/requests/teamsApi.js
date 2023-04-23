import axios from 'axios'

const urlBase = 'https://api.opendota.com/api/'

export const getTeams = async () => {
  const response = await axios.get(`${urlBase}teams`)

  return response?.data
};
