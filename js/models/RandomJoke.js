export default class RandomJoke {
    constructor() {
    }

    async getResults() {
        let response = await fetch('https://api.chucknorris.io/jokes/random');
        return await response.json();
    }
}