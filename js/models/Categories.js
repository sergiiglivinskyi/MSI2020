export default class Categories {
    constructor() {
    }

    async getResults() {
        let response = await fetch('https://api.chucknorris.io/jokes/categories');
        return await response.json();
    }
}
