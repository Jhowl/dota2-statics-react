import axios from 'axios';

const urlBase = 'https://api.opendota.com/api/explorer?sql=';

export const matchesByTeam = async (teamId = '', { leaguesIds = [], year = '2023', heroesIds = []} = {}) => {
  const whereLeagues = leaguesIds.length && `AND leagues.leagueid IN (${leaguesIds})`;
  // const whereHeroes = heroesIds.length && `AND ((matches.radiant_team_id IN (${teamsIds}) AND player_matches.player_slot < 128) OR
  //   (matches.dire_team_id IN (${teamsIds}) AND player_matches.player_slot >= 128))`;

  const queryMatches = `
    SELECT
      duration,
      matches.match_id,
      matches.start_time,
      matches.dire_score,
      matches.radiant_score,
      matches.radiant_win AS radiant_win,
      MAX(teams_radiant.name) AS radiant_name,
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
      (
        leagues.tier = 'premium'
        OR leagues.leagueid = 15196
        OR leagues.leagueid = 15439
      ) AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
      AND (matches.radiant_team_id = ${teamId} OR matches.dire_team_id = ${teamId})
      ${whereLeagues || ''}
    GROUP BY
      matches.match_id,
      matches.start_time,
      matches.dire_score,
      matches.radiant_score,
      matches.radiant_win,
      teams_dire.name,
      leagues.name
    ORDER BY
      matches.match_id DESC`;

  const urlMatches = `${urlBase}${encodeURIComponent(queryMatches)}`;
  const response = await axios.get(urlMatches);

  return response?.data;
};
