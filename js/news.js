const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url)
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
};
loadCategory();

const displayCategory = (categories) => {
    const divContainer = document.getElementById('div-container');
    for (const category of categories) {
        console.log(category);
        const ulContainer = document.createElement('ul');
        ulContainer.classList.add('navbar-nav');
        ulContainer.innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="#">${category.category_name}</a>
        </li>
        `;
        divContainer.appendChild(ulContainer);
    }
};