import axios from 'axios'

const urlBase = 'https://api.opendota.com/api/explorer?sql='

export const matches = async ({ leaguesIds = [], teamsIds = [], year = '2023', heroesIds = [] } = {}) => {

  const whereLeagues = leaguesIds.length > 0 ? `AND leagues.leagueid IN (${leaguesIds})` : '';
  const whereTeams = teamsIds.length > 0 ? `AND (matches.radiant_team_id IN (${teamsIds}) OR matches.dire_team_id IN (${teamsIds}))` : '';
  const whereHeroes = heroesIds.length > 0 ? `AND (matches.radiant_team_id IN (${heroesIds}) OR matches.dire_team_id IN (${heroesIds}))` : '';

  const queryMatches = `
    SELECT
      duration,
      matches.match_id,
      matches.start_time,
      matches.dire_score,
      matches.radiant_score,
      matches.radiant_win AS radiant_win,
      teams_radiant.name AS radiant_name,
      teams_dire.name AS dire_name,
      leagues.name AS league_name
    FROM
      matches
    JOIN match_patch USING (match_id)
    JOIN leagues USING (leagueid)
    JOIN teams teams_radiant ON teams_radiant.team_id = matches.radiant_team_id
    JOIN teams teams_dire ON teams_dire.team_id = matches.dire_team_id
    WHERE
      leagues.tier = 'premium' AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
      ${whereLeagues}
      ${whereTeams}
    ORDER BY
      matches.match_id DESC`

    const urlMatches = `${urlBase}${encodeURIComponent(queryMatches)}`
    const matches = await axios.get(urlMatches)

    return matches
}
