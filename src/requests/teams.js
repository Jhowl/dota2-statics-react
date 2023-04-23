import axios from 'axios'

const urlBase = 'https://api.opendota.com/api/explorer?sql='

export const teams = async ({ leaguesIds = [], year = '2023' } = {}) => {
  const whereLeagues = leaguesIds.length && `AND leagues.leagueid IN (${leaguesIds})`;

  const queryTeams = `
    SELECT
      teams.team_id,
      teams.name,
      teams.logo_url
    FROM
      matches
      JOIN match_patch USING (match_id)
      JOIN leagues USING (leagueid)
      JOIN teams ON teams.team_id = matches.radiant_team_id OR teams.team_id = matches.dire_team_id
    WHERE
      leagues.tier = 'premium' AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
      ${whereLeagues || ''}
    GROUP BY
      teams.team_id,
      teams.name`;

  const urlTeams = `${urlBase}${encodeURIComponent(queryTeams)}`;
  const response = await axios.get(urlTeams)

  return response.data;
};
