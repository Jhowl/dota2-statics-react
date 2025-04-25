import supabase from '../config/supabaseClient'

const matches = async () => {

  const { data, error } = await supabase.sql(`
    select
      matches.id,
      matches.start_time,
      matches.dire_score,
      matches.radiant_score,
      matches.radiant_win,
      matches.league_id,
      matches.radiant_team_id,
      matches.dire_team_id,
      matches.patch,
      matches.created_at,
      matches.duration,
      matches.get_first_tower_time,
      matches.get_first_tower_team,
      matches.match_id,
      team_radiant.name as radiant_name,
      team_radiant.id as radiant_id,
      team_radiant.slug as radiant_slug,
      team_dire.name as dire_name,
      team_dire.id as dire_id,
      team_dire.slug as dire_slug,
      json_agg(players) as players_data
    from
      matches
      join teams team_radiant on matches.radiant_team_id = team_radiant.team_id
      join teams team_dire on matches.dire_team_id = team_dire.team_id
      join players on matches.match_id = players.match_id
    group by
      matches.id,
      team_radiant.team_id,
      team_radiant.name,
      team_radiant.id,
      team_dire.team_id,
      team_dire.name,
      team_dire.id
    order by
      matches.match_id
  `)

  if (error) {
    throw error
  }

  // const matches = await data.map( async match => {
  //   const {data, error} = await supabase.from('players')
  //     .select(`
  //       player_slot,
  //       hero_id,
  //       kills,
  //       deaths,
  //       assists,
  //       team_id
  //     `)
  //     .eq('match_id', match.match_id)

  //   if (error) {
  //     throw error
  //   }

  //   return {
  //     ...match,
  //     players: data
  //   }
  // })

  return data
}

export default matches
