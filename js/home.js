/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const grid = document.getElementById('grid');

const paintingsStorage = window.sessionStorage;

/* For each item in the array is called the Template Literal,
The index of the painting is added to the end of the href link - GET method */
const displayData = (data) => {
  data.forEach((element, index) => {
    grid.innerHTML += `
    <section class="image-wrapper grid-item">
      <a class="grid-item__link" href="detail.html?painting=${index}" data-id="${element.key}">
        <div class="grid-item__text">
          <h2 class="heading heading--2 white">${element.name}</h2>
          <p class="subhead subhead--2 white--opacity">${element.artist.name}</p>
        </div>
        <img class="grid-item__image" src="${element.images.thumbnail}" alt="${element.name}, author ${element.artist.name}">
      </a>
    </section>`;

    paintingsStorage.setItem(index, JSON.stringify(element));
  });

  const macyInstance = Macy({
    // See below for all available options.
    container: '.grid',
    columns: 4,
    margin: 40,
    breakAt: {
      1100: 3,
      840: 2,
      600: 1,
    },
    waitForImages: true,
  });
/*
  // masonry snippet with the images loaded helper script
  imagesLoaded('.grid', () => {
    const elem = document.querySelector('.grid');
    const msnry = new Masonry(elem, {
      // options
      itemSelector: '.grid-item',
      columnWidth: 160,
      gutter: 10,
    });
  }); */
};

/* the json data about paintings are fetched via fetch method from the localhost,
then is called the displayData function.
*/
fetch('../data.json')
  .then((response) => response.json())
  .then((data) => displayData(data));
