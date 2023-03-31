import axios from 'axios'

const urlBase = 'https://api.opendota.com/api/explorer?sql='

export const teams = async ({ leaguesIds = [], year = '2023' } = {}) => {
  const whereLeagues = leaguesIds.length > 0 ? `AND leagues.leagueid IN (${leaguesIds})` : ''
  // const queryTeams = whereLeagues.length > 0 ? `HAVING COUNT(DISTINCT leagues.leagueid) > 1` : ''

  const queryTeams = `
    SELECT
      teams.team_id,
      teams.name
    FROM
      matches
    JOIN match_patch USING (match_id)
    JOIN leagues USING (leagueid)
    JOIN teams ON teams.team_id = matches.radiant_team_id OR teams.team_id = matches.dire_team_id
    WHERE
      leagues.tier = 'premium' AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
      ${whereLeagues}
    GROUP BY
      teams.team_id,
      teams.name
    `
  const urlTeams = urlBase + encodeURIComponent(queryTeams)
  const teams = await axios.get(urlTeams)

  return teams
}
