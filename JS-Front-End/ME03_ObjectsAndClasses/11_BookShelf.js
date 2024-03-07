function bookShelf(input) {

    function printShelves(shelves) {
        shelves.sort((a, b) => b.bookCount - a.bookCount);
        shelves.forEach((s) => s.sortBooks());
        for (const shelf of shelves) {
            console.log(`${shelf.id} ${shelf.genre}: ${shelf.bookCount}`);
            for (const book of shelf.books) {
                console.log(`--> ${book.title}: ${book.author}`);
            }
        }
    }

    class Shelf {
        constructor(id, genre) {
            this.id = id;
            this.genre = genre;
            this.books = [];
        }

        id;
        genre;
        books;

        get bookCount() {
            return this.books.length;
        }

        addBook(book) {
            this.books.push(book);
        }

        sortBooks() {
            this.books.sort((a, b) => a.title.localeCompare(b.title));
        }
    }

    let shelves = [];

    for (const command of input) {
        if (command.includes(' -> ')) {
            let [id, genre] = command.split(' -> ');
            if (!shelves.find((s) => s.id === Number(id))) {
                shelves.push(new Shelf(Number(id), genre));
            }
        } else {
            let split = command.split(': ');
            let title = split[0];
            let [author, genre] = split[1].split(', ');
            let shelf = shelves.find((s) => s.genre === genre);
            if (shelf) {
                shelf.addBook({title, author, genre});

            }
        }
    }

    printShelves(shelves);
}