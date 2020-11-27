export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getItem (id, type) {
        switch (type) {
            case 'char': return this.getCharacter(id);
            case 'house': return this.getBook(id);
            case 'book': return this.getHouse(id);
            default: return 'there is not such a type of page'; 
        }
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase + url}, status: ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllBooks = async () => {
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    getAllHouses = async () => {
        const res =  await this.getResource('/houses/');
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            ancestralWeapons: house.ancestralWeapons
        }
    }
}

// const got = new GotService();

// got.getAllCharacters()
//     .then(res => {
//         res.forEach(item => console.log(item.name));
//     });

// got.getCharacter(130)
//     .then(res => console.log(res));
