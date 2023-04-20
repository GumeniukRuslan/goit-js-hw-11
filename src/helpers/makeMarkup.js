export function makeMarkup(resObject) {
  const markup = resObject.data.hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
    `
    <li class="item-list">
      <a class="gallery__link" href="${largeImageURL}">
        <img class="list-img" height="190" loading="lazy" src="${webformatURL}" alt="${tags}">
      </a>
      <div class="img-info">
        <div class="img__sub-info">
          <h2 class="sub-info__name">Likes</h2>
          <p class="sub-info__value">${likes}</p>
        </div>
        <div class="img__sub-info">
          <h2 class="sub-info__name">Views</h2>
          <p class="sub-info__value">${views}</p>
        </div>
        <div class="img__sub-info">
          <h2 class="sub-info__name">Comments</h2>
          <p class="sub-info__value">${comments}</p>
        </div>
        <div class="img__sub-info">
          <h2 class="sub-info__name">Downloads</h2>
          <p class="sub-info__value">${downloads}</p>
        </div>
      </div>
    </li>`).join('')
  
  return markup
  
  };