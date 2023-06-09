// 50/100
function cityTaxes(cityName, cityPopulation, cityTreasury){
    let city = {
        name: cityName,
        population: cityPopulation,
        treasury: cityTreasury,
        taxRate: 10,
        collectTaxes() {
            this.treasury += this.population * this.taxRate;
            this.treasury = Math.floor(this.treasury);
        },
        applyGrowth(perc) {
            this.population += ((perc/100)*this.population);
            this.population = Math.floor(this.population);
        },
        applyRecession(perc) {
            this.treasury *= (perc/100);
            this.treasury = Math.floor(this.treasury);
        }
    };

    return city;
}