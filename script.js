const urlAPI = 'https://api.escuelajs.co/api/v1/products';
const card = document.querySelector('[data-cardTemplate]')
const cardContainer = document.querySelector('[data-cardContainer]');
const loader = document.getElementById('loader');

function toggleLoader(show) {
    if (show) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
}

async function receivingData() {
    try {
        toggleLoader(true)
        const response = await fetch(urlAPI);
        const dataSet = await response.json();
        createCard(dataSet)
        toggleLoader(false)
        console.log(dataSet)
    } catch (error) {
        console.log(error);
    }
}

function createCard(data) {
    if (data.length === 0) {
        const message = document.createElement('span');
        message.textContent = 'Ooops, the products are currently unavailable. Sorry for the temporary inconvenience, I\'ll see you in a few minutes';
        const messageContainer = document.querySelector('[data-message]');
        messageContainer.appendChild(message);
        return;
    }

    data.forEach(elem => {
        const cardClone = document.importNode(card.content, true);

        const titleProduct = cardClone.querySelector('[data-titleProduct]');
        titleProduct.textContent = elem.title;
        const description = cardClone.querySelector('[data-description]');
        description.textContent = elem.description;
        const image = cardClone.querySelector('[data-img]')
        image.src = elem.category.image;
        const label = cardClone.querySelector('[data-label]');
        label.textContent = elem.category.name;
        const cost = cardClone.querySelector('[data-cost]');
        cost.textContent = '$ ' + elem.price;

        cardContainer.appendChild(cardClone);

    })
}

receivingData();

document.addEventListener("DOMContentLoaded", function() {
    function btnClickHandler(element) {
        const descriptionText = element.closest('.card__description').querySelector('[data-description]');
        descriptionText.classList.toggle('description__text');
        descriptionText.classList.toggle('description__text-active');

        const description = element.closest('.card').querySelector('[data-cardDescription]');
        description.classList.toggle('card__description-active');

        const label = element.closest('.card').querySelector('[data-label]');
        label.classList.toggle('card__label');
        label.classList.toggle('card__label-active');
    }

    cardContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('description__btn')) {
            btnClickHandler(event.target)
        }
    })
});





