export default class RandomCategoryJoke {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        let response = await fetch(`https://api.chucknorris.io/jokes/random?category=${this.query}`);
        return await response.json();
    }
}