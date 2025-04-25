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
      (
        leagues.tier = 'premium'
        OR leagues.leagueid = 15196
        OR leagues.leagueid = 15439
        OR leagues.leagueid = 15475
        OR leagues.leagueid = 15638
        OR leagues.leagueid = 15739
        OR leagues.leagueid = 15910
        OR leagues.leagueid = 16169
        OR leagues.leagueid = 15981
        OR leagues.leagueid = 16201
        OR leagues.leagueid = 16483
        OR leagues.leagueid = 16518
        OR leagues.leagueid = 16669
        OR leagues.leagueid = 16632
        OR leagues.leagueid = 16730
        OR leagues.leagueid = 16740
        OR leagues.leagueid = 16843
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
        OR leagues.leagueid = 17417
        OR leagues.leagueid = 17765
        OR leagues.leagueid = 17891
        OR leagues.leagueid = 17907
        OR leagues.leagueid = 17795
        OR leagues.leagueid = 18058
      )
      AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= ${year}
    GROUP BY
      leagues.name, leagues.leagueid`;

  const urlLeagues = `${urlBase}${encodeURIComponent(queryLeagues)}`;
  const response = await axios.get(urlLeagues)

  return response?.data;
};
