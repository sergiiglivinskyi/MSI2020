import { elements } from './base.js';

export const renderFavouriteJoke = joke => {
    const now = new Date().getTime();
    const updated_at = Date.parse(joke.updated_at);
    const diff = now - updated_at;
    const lastUpdate = Math.ceil(diff / 3600000);

    const markup = `
        <div class="favourite-joke">
            <div class="favourite-joke-container">
                <img class="favourite-joke__favourite" src="images/heart.svg" alt="">
                <div class="favourite-joke__id">
                    <span class="favourite-joke__id-title">ID:</span><span class="favourite-joke__id-number">${joke.id}</span>
                </div>
                <p class="favourite-joke__text">${joke.value}</p>
                <img class="joke__icon" src="images/message_icon_favourite.svg" alt="">
                <div class="favourite-joke__last-update">Last update: ${lastUpdate} hours ago</div>
            </div>
        </div>
    `;
    elements.favourites.insertAdjacentHTML('beforeend', markup);
};

export const renderFavouriteJokes = (jokes) => {
    jokes.forEach(renderFavouriteJoke);
};




