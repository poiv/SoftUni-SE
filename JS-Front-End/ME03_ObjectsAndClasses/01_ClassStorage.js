class Storage {
    constructor(capacity) {
        this.capacity = capacity;
        this.storage = [];
    }

    storage;

    get totalCost() {
        let n = 0;
        this.storage.forEach((p) => n += p.price * p.quantity);
        return n;
    };

    addProduct(product) {
        this.storage.push(product);
        this.capacity -= product.quantity;
    };

    getProducts() {
        return this.storage.map((p) => JSON.stringify(p)).join('\n');
    };
}

const product = {
    name: null,
    price: null,
    quantity: null
}