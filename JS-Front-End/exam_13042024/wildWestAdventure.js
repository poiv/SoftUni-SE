function solve(inputArray) {
    let int = Number(inputArray.shift());

    let heroes = [];

    while (int > 0) {
        let input = inputArray.shift().split(' ');
        let name = input[0];
        let hp = Number(input[1]);
        let bullets = Number(input[2]);
        heroes.push({name, hp, bullets});

        int--;
    }
    const commands = {
        'FireShot': (heroName, target) => fireShot(heroName, target),
        'TakeHit': (heroName, damage, attacker) => takeHit(heroName, Number(damage), attacker),
        'Reload': (heroName) => reload(heroName),
        'PatchUp': (heroName, hp) => patchUp(heroName, Number(hp)),
        'Ride Off Into Sunset': () => endProgram()
    }

    for (const input of inputArray) {
        let [skill, ...info] = input.split(' - ');
        commands[skill](...info);

    }

    function endProgram() {

        for (const hero of heroes) {
            console.log(hero.name);
            console.log(`  HP: ${hero.hp}`);
            console.log(`  Bullets: ${hero.bullets}`);
        }
    }

    function fireShot(heroName, target) {
        let hero = getHero(heroName);

        if (hero.bullets > 0) {
            hero.bullets -= 1;
            console.log(`${heroName} has successfully hit ${target} and now has ${hero.bullets} bullets!`);
            return;
        }
        console.log(`${heroName} doesn't have enough bullets to shoot at ${target}!`);
    }

    function takeHit(heroName, damage, attacker) {
        let hero = getHero(heroName);
        hero.hp -= damage;
        if (hero.hp > 0) {
            console.log(`${heroName} took a hit for ${damage} HP from ${attacker} and now has ${hero.hp} HP!`);
            return;
        }
        removeHero(hero);
        console.log(`${heroName} was gunned down by ${attacker}!`);
    }

    function reload(heroName) {
        let hero = getHero(heroName);

        if (hero.bullets < 6) {
            let reloadedBullets = 6 - hero.bullets;
            hero.bullets = 6;
            console.log(`${heroName} reloaded ${reloadedBullets} bullets!`);
            return;
        }
        console.log(`${heroName}'s pistol is fully loaded!`);
    }

    function patchUp(heroName, hp) {
        let hero = getHero(heroName);

        if (hero.hp < 100) {
            hero.hp += hp;
            if (hero.hp > 100) hero.hp = 100;
            console.log(`${heroName} patched up and recovered ${hp} HP!`);
            return;
        }
        console.log(`${heroName} is in full health!`);
    }

    function getHero(name) {
        return heroes.find((h) => h.name === name);
    }

    function removeHero(hero) {
        heroes = heroes.filter((h) => h !== hero);
    }

}