import { elements } from './base.js';

const renderCategory = category => {
    const markup = `
        <button class="buttons-categories__button">${category}</button>
    `;
    elements.categories.insertAdjacentHTML('beforeend', markup);
};

export const renderCategories = (categories) => {
    categories.forEach(renderCategory);
};