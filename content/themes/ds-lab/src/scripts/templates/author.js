export default function(author) {

  var authorImage = '';
  if (author.image) {
    authorImage = `<td width="5%"><img src="${author.image}" class="author__image round-img"></td>`;
  }

  var coverImage = '';
  if (author.cover) {
    coverImage = `
<img data-src="${author.cover}" class="lazy-image full-width img-full-width" alt="${author.name}" >
`;
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
  <p>${author.bio || ''}</p>
  <p><a href="/author/${author.slug}/" class="dimmed">See stories by author...</a></p>
 </article>
`;
}
