import axios from 'axios';

// const urlBase = 'http://localhost:3001/matches';
const urlBase = 'http://api.jhowl.com/matches';

//Create new function to get matches from urlBase add filters to GET parameters {leaguesIds = [], teamsIds = [], heroesIds = [], patchFilter = []}

export const matches = async (filters) => {

  const response = await axios.get(urlBase, {
    params: {
      ...filters
    },
    cors: true
  })

  return response?.data;
};


// export const matches = async ({ leaguesIds = [], teamsIds = [], year = '2023', heroesIds = [], patch = ''
//  } = {}) => {
//   const whereLeagues = leaguesIds.length && `AND leagues.leagueid IN (${leaguesIds})`;
//   const whereTeams = teamsIds.length && `AND (matches.radiant_team_id IN (${teamsIds}) OR matches.dire_team_id IN (${teamsIds}))`;
//   const whereHeroes = heroesIds.length && `AND ((matches.radiant_team_id IN (${heroesIds}) AND player_matches.player_slot < 128) OR
//     (matches.dire_team_id IN (${heroesIds}) AND player_matches.player_slot >= 128))`;
//   const wherePatch = patch && `AND match_patch.patch = '${patch}'`;

//   const queryMatches = `
//     SELECT
//       duration,
//       matches.match_id,
//       matches.start_time,
//       matches.dire_score,
//       matches.radiant_score,
//       matches.radiant_win AS radiant_win,
//       MAX(teams_radiant.name) AS radiant_name,
//       teams_dire.name AS dire_name,
//       leagues.name AS league_name,
//       matches.radiant_team_id,
//       matches.dire_team_id,
//       match_patch.patch,
//       leagues.leagueid AS leagueId,
//       json_agg(json_build_object(
//         'player_slot', player_matches.player_slot,
//         'team', CASE WHEN player_matches.player_slot < 128 THEN 'radiant' ELSE 'dire' END,
//         'hero_id', player_matches.hero_id,
//         'kills', player_matches.kills,
//         'deaths', player_matches.deaths,
//         'assists', player_matches.assists,
//         'team_id', teams.team_id
//       )) AS players
//     FROM
//       matches
//       JOIN match_patch USING (match_id)
//       JOIN leagues USING (leagueid)
//       JOIN player_matches ON player_matches.match_id = matches.match_id
//       JOIN teams teams_radiant ON teams_radiant.team_id = matches.radiant_team_id
//       JOIN teams teams_dire ON teams_dire.team_id = matches.dire_team_id
//       JOIN teams ON teams.team_id = CASE WHEN player_matches.player_slot < 128 THEN matches.radiant_team_id ELSE matches.dire_team_id END
//     WHERE
//       (
//         leagues.tier = 'premium'
//         OR leagues.leagueid = 15196
//         OR leagues.leagueid = 15439
//         OR leagues.leagueid = 15475
//         OR leagues.leagueid = 15551
//         OR leagues.leagueid = 15638
//         OR leagues.leagueid = 15739
//         OR leagues.leagueid = 15910
//       ) AND
//       EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
//       ${whereLeagues || ''}
//       ${whereTeams || ''}
//       ${whereHeroes || ''}
//       ${wherePatch || ''}
//     GROUP BY
//       matches.match_id,
//       matches.start_time,
//       matches.dire_score,
//       matches.radiant_score,
//       matches.radiant_win,
//       teams_dire.name,
//       leagues.name,
//       leagues.leagueid,
//       match_patch.patch
//     ORDER BY
//       matches.match_id DESC`;

//   const urlMatches = `${urlBase}${encodeURIComponent(queryMatches)}`;
//   const response = await axios.get(urlMatches);

//   return response?.data;
// };
