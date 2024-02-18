class Laptop {

    constructor(info, quality) {
        this.info = info;
        this.quality = quality;
        this.isOn = false;
    }

    info;
    isOn;

    turnOn() {
        this.isOn = true;
        this.quality -= 1;
    };

    turnOff() {
        this.isOn = false;
        this.quality -= 1;
    };

    showInfo() {
        return JSON.stringify(this.info);
    };

    quality;

    get price() {
        return 800 - (this.info.age * 2) + (this.quality * 0.5);
    };
}