import axios from 'axios'

const urlBase = 'https://api.opendota.com/api/explorer?sql='

export const leagues = async ({ year = '2023' } = {}) => {
  const queryLeagues = `SELECT
      leagues.name, leagues.leagueid
    FROM
      matches
      JOIN match_patch USING (match_id)
      JOIN leagues USING (leagueid)
    WHERE
      ( leagues.tier = 'premium' OR leagues.leagueid = 15196 )
      AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
    GROUP BY
      leagues.name, leagues.leagueid`;

  const urlLeagues = `${urlBase}${encodeURIComponent(queryLeagues)}`;
  const response = await axios.get(urlLeagues)

  return response?.data;
};
