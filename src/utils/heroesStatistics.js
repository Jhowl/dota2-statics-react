import dotaconstants from "dotaconstants"

export default function heroesStatistics(array) {
  if (!array.length) {
    return []
  }

  const heroesMap = {}
  const uniqueHeroes = []

  for (const hero of array) {
    const { score, heroes } = hero
    for (const heroId of heroes) {
      if (heroesMap[heroId] === undefined) {
        heroesMap[heroId] = { heroMatches: 0, heroId: heroId, matchesScore: 0 }
        uniqueHeroes.push(heroId)
      }

      const heroData = heroesMap[heroId]
      heroData.heroName = dotaconstants.heroes[heroId].localized_name
      heroData.heroMatches += 1
      heroData.matchesScore += score
    }
  }

  const heroesGroup = new Array(uniqueHeroes.length)
  for (let i = 0; i < uniqueHeroes.length; i++) {
    heroesGroup[i] = heroesMap[uniqueHeroes[i]]
  }

  heroesGroup.sort((a, b) => {
    return b.heroMatches - a.heroMatches
  })

  return heroesGroup
}
