export default function(author) {

  var authorImage = '';
  if (author.image) {
    authorImage = `<td width="5%"><img src="${author.image}" class="author__image round-img"></td>`;
  }

  var coverImage = '';
  if (author.cover) {
    coverImage = `
      <div class="img-wrapper full-width">
        <div class="img-container" style="padding-bottom:50%">
          <img data-src="${author.cover}" alt="${author.name}" class="lazy-image">
        </div>
      </div>`;
  }

  return `
    <article class="boxes__item small animate animate__fade-in">
      <header class="author">
          <table>
              <tr>
                  ${authorImage}
                  <td><span class="author__name"><a href="/author/${author.slug}">${author.name}</a></span><br>
                  	${author.count.posts} stories
                  </td>
              </tr>
          </table>
      </header>
      <a href="/author/${author.slug}/">${coverImage}</a>
      <h1>${author.name}</h1>
      <p>${author.bio || ''}</p>
      <p><a href="/author/${author.slug}/" class="dimmed">See stories by author...</a></p>
     </article>`;
}
