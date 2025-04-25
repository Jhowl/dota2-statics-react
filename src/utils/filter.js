export default function filterMatches(matches, filters) {
  return matches.filter(match => {
    // Filter by league ID

    if (filters.leagueIds?.length && !filters.leagueIds.includes(match.league_id)) {

      return false;
    }


    if (filters.patches?.length && !filters.patches.includes(match.patch)) {
      return false;
    }

    if (filters.teamIds?.length) {
      const isTeamIdMatch = filters.teamIds.some(teamId =>
        teamId === match.dire_team_id || teamId === match.radiant_team_id
      );
      if (!isTeamIdMatch) {
        return false;
      }
    }

    if (filters.heroIds?.length) {
      const playerHeroIds = match.players.map(player => player.hero_id);
      const isHeroIdMatch = filters.heroIds.every(heroId => playerHeroIds.includes(heroId));

      if(filters.teamIds?.length) {
        const isTeamIdMatch = filters.teamIds.some(teamId => {
          const isPlayerTeamIdMatch = match.players.some(player => {
            return player.team_id === teamId && filters.heroIds.includes(player.hero_id);
          });
          return isPlayerTeamIdMatch;
        });

        if (!isTeamIdMatch) { return false; }
      }

      if (!isHeroIdMatch) {
        return false;
      }
    }

    return true;
  });
}
