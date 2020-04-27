import {elements} from "./views/base.js";
import Categories from './models/Categories.js';
import * as categoriesView from './views/categoriesView.js';
import RandomJoke from "./models/RandomJoke.js";
import * as jokeView from './views/jokeView.js';
import SearchJoke from "./models/SearchJoke.js";
import * as favouritesView from "./views/favouritesView.js";
import RandomCategoryJoke from "./models/RandomCategoryJoke.js";

const state = {
    jokes: [],
    likes: [],
    favourites:[],
    category: ''
};

/*---------------------------------------------
* RESTORE FAVOURITES WHEN THE PAGE IS LOADED
* --------------------------------------------*/
window.addEventListener('load', () => {
    const storage = JSON.parse(localStorage.getItem('favourites'));
    if (storage) {
        state.favourites = storage;
        state.favourites.forEach(elem => {
            state.likes.push(elem.id);
        });
        favouritesView.renderFavouriteJokes(state.favourites);
    }
});

/*-----------------------
* GET LIST OF CATEGORIES
* ----------------------*/
const radios = Array.from(elements.radioButtons);

radios.forEach(radio => {
    radio.addEventListener('input', () => {
        if(radio.value === 'categories') {
            elements.categoryButtons.classList.add('active-flex');
            elements.searchField.classList.remove('active-block');
            getGategoriesButtons();
        }else if(radio.value === 'search') {
            elements.searchFieldInput.value = '';
            elements.searchField.classList.add('active-block');
            elements.categoryButtons.classList.remove('active-flex');
            elements.categories.innerHTML = '';
            state.category = '';
        }else {
            elements.searchField.classList.remove('active-block');
            elements.categoryButtons.classList.remove('active-flex');
            elements.categories.innerHTML = '';
            state.category = '';
        }
    });
});

const getGategoriesButtons = async () => {
    const categories = new Categories();
    const data = await categories.getResults();
    await categoriesView.renderCategories(data);
}

//Categories selection handler
elements.categoryButtons.addEventListener('click', e => {
    if (e.target.matches('.buttons-categories__button')) {
        const buttons = document.querySelectorAll('.buttons-categories__button');
        const arrButtons = Array.from(buttons);
        arrButtons.forEach(button => {
            button.style.backgroundColor = '#ffffff';
        });
        e.target.style.backgroundColor = '#F8F8F8';
        state.category = e.target.innerText.toLowerCase();
    }
});

/*-----------------------
* GET A JOKE
* ----------------------*/

//Set likes for jokes which matches with already marked jokes (multiple jokes) for UI changes
const setLikeForArray = (arr, arrLikes) => {
    arr.forEach((elem, index) => {
        for(let i = 0; i < arrLikes.length; i++) {
            if(arrLikes[i] === elem.id) {
                arr[index].keyLike = 'liked'
            }
        }
    });
};

//Set like for the joke which matches with already marked joke (single joke) for UI changes
const setLikeForObj = (arr, arrLikes) => {
    if(arrLikes.length){
        arrLikes.forEach(id => {
            if(id === arr.id) {
                arr.keyLike = 'liked'
            }
        });
    }
}

//Render jokes into UI
const renderUIJokes = async (data) => {
    if(Array.isArray(data.result)) {
        setLikeForArray(data.result, state.likes);
        data.result.forEach(elem => {
            state.jokes.push(elem);
        });
        await jokeView.renderJokes(data.result);
        console.log(data.result);
    }else {
        setLikeForObj(data, state.likes);
        state.jokes.push(data);
        await jokeView.renderJoke(data);
        console.log(data);
    }
}

//Get jokes
const getJoke = async () => {
    state.jokes = [];
    elements.jokes.innerHTML = '';

    //Get the Joke when random radio is selected
    if(elements.radioRandom.checked) {
        const randomJoke = new RandomJoke();
        const data = await randomJoke.getResults();
        renderUIJokes(data);

    }//Get the Joke when categories radio is selected
    else if(elements.radioCategories.checked) {
        const query = state.category;
        if(query) {
            const randomCategoryJoke = new RandomCategoryJoke(query);
            const data = await randomCategoryJoke.getResults();
            console.log(data);
            renderUIJokes(data);
        }

    }//Get the Joke when search radio is selected
    else if(elements.radioSearch.checked) {
        const query = jokeView.getInput();
        if(query) {
            const searchJoke = new SearchJoke(query);
            const data = await searchJoke.getResults();
            renderUIJokes(data);
        }
    }

}

//Get a Joke button handler
elements.getJokeButton.addEventListener('click', getJoke);


/*-----------------------
* LIKES CLICKING HANDLER
* ----------------------*/
elements.jokeWrapper.addEventListener('click', e => {
    if (e.target.matches('.joke__favourite')) {
        console.log(e.target);
        const jokeID =  e.target.parentElement.children[1].children[1].innerText;
        console.log(jokeID);
        const isPresent = state.likes.find(id => id === jokeID);
        if(!isPresent){
            e.target.src = 'images/heart.svg';
            state.likes.push(jokeID);
            const likes = state.jokes.filter(elem => {
                for(let i = 0; i < state.likes.length; i++) {
                    if(state.likes[i] === elem.id) {
                        return elem;
                    }
                }
            });
            likes.forEach(like => {
                if(state.favourites.length) {
                    const isPresent = state.favourites.find(elem => elem.id === like.id);
                    if(!isPresent) {
                        state.favourites.push(like);
                    }
                }else {
                    likes.forEach(like => {
                        like.keyLike = 'liked';
                        state.favourites.push(like);
                    })
                }
            })
        }else {
            const index = state.likes.findIndex(id => id === jokeID);
            state.likes.splice(index, 1);
            const indexFav = state.favourites.findIndex(elem => elem.id === jokeID);
            state.favourites.splice(indexFav, 1);
            e.target.src = 'images/heart_empty.svg';
        }

        console.log(state);
        elements.favourites.innerHTML = '';
        favouritesView.renderFavouriteJokes(state.favourites);
        localStorage.setItem('favourites', JSON.stringify(state.favourites));
    }
})






