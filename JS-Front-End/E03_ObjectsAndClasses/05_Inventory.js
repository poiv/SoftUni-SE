function registerHeroes(array) {
    let heroes = [];

    for (const currentHero of array) {
        addHero(currentHero);
    }

    heroes.sort((a, b) => a.level - b.level);

    heroes.forEach(h => printHeroInfo(h));

    function addHero(heroData) {
        let [heroName, heroLvl, heroInventory] = heroData.split(' / ');
        heroes.push({ name: heroName, level: Number(heroLvl), inventory: heroInventory });
    }
    function printHeroInfo(hero){
        console.log(`Hero: ${hero.name}\nlevel => ${hero.level}\nitems => ${hero.inventory}`);
    }
}