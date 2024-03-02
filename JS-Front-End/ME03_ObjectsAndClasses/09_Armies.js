function armies(array) {
    function getLeader(list, leaderName) {
        return list.find((l) => l.name === leaderName);
    }

    function getArmy(leaderList, armyName) {
        let arr = [];
        for (const leader of leaders) {
            arr.push(...leader.armies);
        }
        return arr.find((o) => o.name === armyName);
    }

    class Leader {
        constructor(name) {
            this.name = name;
            this.armies = [];
        }

        name;
        armies;

        sortArmies() {
            this.armies = this.armies.sort((a, b) => b.count - a.count);
        }

        addArmy(army) {
            this.armies.push(army);
        }

        get totalArmyCount() {
            return this.armies.reduce((a, c) => {
                return a + c.count
            }, 0);
        }
    }

    let leaders = [];

    for (const command of array) {

        if (command.includes(' arrives')) {
            let leaderName = command.split(' arrives')[0];
            let leader = new Leader(leaderName);
            leaders.push(leader);
        } else if (command.includes(': ')) {
            let leaderName = command.split(': ')[0];
            let armyStr = command.split(': ')[1].split(', ');
            let armyName = armyStr[0];
            let armyCount = Number(armyStr[1]);
            let armyObj = {name: armyName, count: armyCount};

            let leader = getLeader(leaders, leaderName);
            if (leader) {
                leader.addArmy(armyObj);
            }
        } else if (command.includes(' + ')) {
            let split = command.split(' + ');
            let armyName = split[0];
            let armyCount = Number(split[1]);

            let army = getArmy(leaders, armyName)
            if (army) {
                army.count += armyCount;
            }
        } else if (command.includes(' defeated')) {
            let leaderName = command.split(' defeated')[0];
            let leader = getLeader(leaders, leaderName);
            if (leader) {
                leaders = leaders.filter((l) => l.name !== leaderName);
            }
        }
    }

    leaders.sort((a, b) => b.totalArmyCount - a.totalArmyCount);

    for (const leader of leaders) {
        leader.sortArmies();
        console.log(`${leader.name}: ${leader.totalArmyCount}`);
        leader.armies.forEach((a) => console.log(`>>> ${a.name} - ${a.count}`));
    }

}

armies(['Rick Burr arrives', 'Fergus: Wexamp, 30245', 'Rick Burr: Juard, 50000', 'Findlay arrives', 'Findlay: Britox, 34540', 'Wexamp + 6000', 'Juard + 1350', 'Britox + 4500', 'Porter arrives', 'Porter: Legion, 55000', 'Legion + 302', 'Rick Burr defeated', 'Porter: Retix, 3205']);