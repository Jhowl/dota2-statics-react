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
      leagues.tier = 'premium'
      OR
      (
        leagues.leagueid = 16169 OR leagues.leagueid = 15981 OR leagues.leagueid = 16201 OR leagues.leagueid = 16483 OR leagues.leagueid = 16518
        OR leagues.leagueid = 16669 OR leagues.leagueid = 16632 OR leagues.leagueid = 16730 OR leagues.leagueid = 16843
        OR leagues.leagueid = 16842
        OR leagues.leagueid = 16841
        OR leagues.leagueid = 16840
        OR leagues.leagueid = 16839
        OR leagues.leagueid = 16427
        OR leagues.leagueid = 16881
        OR leagues.leagueid = 16905
        OR leagues.leagueid = 16901
        OR leagues.leagueid = 16846
        OR leagues.leagueid = 16935
        OR leagues.leagueid = 17119
        OR leagues.leagueid = 17126
        OR leagues.leagueid = 17272
        OR leagues.leagueid = 17414
        OR leagues.leagueid = 17509
        OR leagues.leagueid = 17588
        OR leagues.leagueid = 17765
        OR leagues.leagueid = 18058
      )
      AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
      ${whereLeagues || ''}
    GROUP BY
      teams.team_id,
      teams.name`;

  const urlTeams = `${urlBase}${encodeURIComponent(queryTeams)}`;
  const response = await axios.get(urlTeams)

  return response.data;
};
