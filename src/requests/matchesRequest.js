import axios from 'axios'

const urlBase = 'https://api.opendota.com/api/explorer?sql='

export const matches = async ({ leaguesIds = [], teamsIds = [], year = '2023', heroesIds = [] } = {}) => {

  const whereLeagues = leaguesIds.length > 0 ? `AND leagues.leagueid IN (${leaguesIds})` : '';
  const whereTeams = teamsIds.length > 0 ? `AND (matches.radiant_team_id IN (${teamsIds}) OR matches.dire_team_id IN (${teamsIds}))` : '';
  let whereHeroes = heroesIds.length > 0 ? `AND (player_matches.hero_id IN (${heroesIds}))` : '';

  if( teamsIds.length > 0 ) {
    whereHeroes = `AND ((matches.radiant_team_id IN (${teamsIds}) AND player_matches.player_slot < 128) OR
    (matches.dire_team_id IN (${teamsIds}) AND player_matches.player_slot >= 128)) ${whereHeroes}`
  }

  const queryMatches = `
    SELECT
      duration,
      matches.match_id,
      matches.start_time,
      matches.dire_score,
      matches.radiant_score,
      matches.radiant_win AS radiant_win,
      MAX(teams_radiant.name) AS radiant_name, -- using MAX as an aggregate function
      teams_dire.name AS dire_name,
      leagues.name AS league_name,
      json_agg(json_build_object(
        'player_slot', player_matches.player_slot,
        'hero_id', player_matches.hero_id,
        'kills', player_matches.kills,
        'deaths', player_matches.deaths,
        'assists', player_matches.assists
      )) AS players
    FROM
      matches
      JOIN match_patch USING (match_id)
      JOIN leagues USING (leagueid)
      JOIN player_matches ON player_matches.match_id = matches.match_id
      JOIN teams teams_radiant ON teams_radiant.team_id = matches.radiant_team_id
      JOIN teams teams_dire ON teams_dire.team_id = matches.dire_team_id
    WHERE
      leagues.tier = 'premium' AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
      ${whereLeagues}
      ${whereTeams}
      ${whereHeroes}
    GROUP BY
      matches.match_id,
      matches.start_time,
      matches.dire_score,
      matches.radiant_score,
      matches.radiant_win,
      teams_dire.name,
      leagues.name
    ORDER BY
      matches.match_id DESC
      `
      // console.log(queryMatches)

    const urlMatches = `${urlBase}${encodeURIComponent(queryMatches)}`
    const matches = await axios.get(urlMatches)

    return matches
}
