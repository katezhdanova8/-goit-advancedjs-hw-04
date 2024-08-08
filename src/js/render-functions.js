export const galleryMarkup = data => {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
            <li>
                <a href="${largeImageURL}">
                    <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
                </a>
                <div class="gallery__info">
                    <div class="gallery__likes gallery__info__item">
                        <p class="fas fa-heart">Likes</p>
                        <span>${likes}</span>
                    </div>
                    <div class="gallery__views gallery__info__item">
                        <p class="fas fa-eye">Views</p>
                        <span>${views}</span>
                    </div>
                    <div class="gallery__comments gallery__info__item">
                        <p class="fas fa-comment">Comments</p>
                        <span>${comments}</span>
                    </div>
                    <div class="gallery__downloads gallery__info__item">
                        <p class="fas fa-download">Downloads</p>
                        <span>${downloads}</span>
                    </div>
                </div>
            </li>
        `;
      }
    )
    .join('');
};