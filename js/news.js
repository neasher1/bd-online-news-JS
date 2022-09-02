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
        // console.log(category);
        const ulContainer = document.createElement('ul');
        ulContainer.classList.add('navbar-nav');
        ulContainer.innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadCategoryId('${category.category_id}')">${category.category_name}</a>
        </li>
        `;
        divContainer.appendChild(ulContainer);
    }
};

const loadCategoryId = (loadId) => {
    // console.log(loadId);
    const url = `https://openapi.programming-hero.com/api/news/category/${loadId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryId(data.data));
};

const displayCategoryId = (news) => {
    // console.log(news);
    const categoriesConatiner = document.getElementById('displayCategoriesId');
    categoriesConatiner.innerHTML = ``;
    // for (const blogs of news) {
    //     console.log(blogs);
    //     const categoryDiv = document.createElement('div');
    //     categoryDiv.classList.add('card');
    //     categoryDiv.classList.add('mt-4');
    //     categoryDiv.classList.add('mb-4');
    //     categoryDiv.innerHTML = `
    //     <div class="row g-2">
    //         <div class="col-md-2 col-4">
    //             <img src="${blogs.thumbnail_url}" class="img-fluid img-thumbnail" alt="...">
    //         </div>
    //         <div class="col-md-10 col-8">
    //             <div class="card-body">
    //                 <h5 class="card-title">${blogs.title}</h5>
    //                 <p class="card-text">${blogs.details}</p>
    //                 <div class="d-flex align-items-center justify-content-evenly">
    //                     <img src="${blogs.author ? blogs.author.img : "Not Found Author Image"}" class="img-fluid rounded" alt="..." style="width: 50px; height:50px">
    //                     <p class="card-title">${blogs.author ? blogs.author.name : "Not Found Author Name"}</p>
    //                     <p class="card-title">Views: ${blogs.total_view}</p>
    //                     <p>${blogs.author ? blogs.author.published_date : "Not Found published date"}</p>
    //                     <button type="button" class="btn btn-primary" data-bs-toggle="modal"
    //                     data-bs-target="#blogDetails">Details</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     `;
    //     categoriesConatiner.appendChild(categoryDiv);

    //     // document.getElementById('modal-title').innerText = `${blogs.title}`;
    //     // document.getElementById('modal-body').innerHTML = `${blogs.details}`;
    // }
    news.forEach(blogs => {
        // console.log(blogs);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('card');
        categoryDiv.classList.add('mt-4');
        categoryDiv.classList.add('mb-4');
        categoryDiv.innerHTML = `
        <div class="row g-2">
            <div class="col-md-2 col-4">
                <img src="${blogs.thumbnail_url}" class="img-fluid img-thumbnail" alt="...">
            </div>
            <div class="col-md-10 col-8">
                <div class="card-body">
                    <h5 class="card-title">${blogs.title}</h5>
                    <p class="card-text">${blogs.details}</p>
                    <div class="d-flex align-items-center justify-content-evenly">
                        <img src="${blogs.author ? blogs.author.img : "Not Found Author Image"}" class="img-fluid rounded" alt="..." style="width: 50px; height:50px">
                        <p class="card-title">${blogs.author ? blogs.author.name : "Not Found Author Name"}</p>
                        <p class="card-title">Views: ${blogs ? blogs.total_view : "No data found"}</p>
                        <p>${blogs.author ? blogs.author.published_date : "Not Found published date"}</p>
                        <button type="button" onclick="loadBlogsDetails('${blogs._id}')" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#blogDetails">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        categoriesConatiner.appendChild(categoryDiv);
    });
};

const loadBlogsDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBlogsDetails(data.data));
};

displayBlogsDetails = data => {
    console.log(data);
    data.forEach(showsData => {
        document.getElementById('modal-title').innerText = `${showsData.title}`;
        document.getElementById('modal-body').innerHTML = `<p>${showsData.details}</p>
        <p>Total Views: ${showsData.total_view}</p>`;
    });
};