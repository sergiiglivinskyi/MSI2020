export default class SearchJoke {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        let response = await fetch(`https://api.chucknorris.io/jokes/search?query=${this.query}`);
        return await response.json();
    }
}