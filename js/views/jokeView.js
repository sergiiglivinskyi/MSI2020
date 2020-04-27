import { elements } from './base.js';

export const getInput = () => elements.searchInput.value;

export const renderJoke = joke => {
    const now = new Date().getTime();
    const updated_at = Date.parse(joke.updated_at);
    const diff = now - updated_at;
    const lastUpdate = Math.ceil(diff / 3600000);
    let image;

    if(joke.keyLike === 'liked') {
        image = 'heart';
    }else {
        image = 'heart_empty';
    }

    const markup = `
        <div class="joke">
            <div class="joke-container">
                <img class="joke__favourite" src="images/${image}.svg" alt="">
                <div class="joke__id">
                    <span class="joke__id-title">ID:</span><span class="joke__id-number">${joke.id}</span>
                </div>
                <p class="joke__text">${joke.value}</p>
                <img class="joke__icon" src="images/message_icon.svg" alt="">
                <div class="joke__last-update">Last update: ${lastUpdate} hours ago</div>
                <span class="joke__categories">${joke.categories.length ? joke.categories : 'no category'}</span>
            </div>
        </div>
    `;
    elements.jokes.insertAdjacentHTML('beforeend', markup);
};

export const renderJokes = (jokes) => {
    jokes.forEach(renderJoke);
};

