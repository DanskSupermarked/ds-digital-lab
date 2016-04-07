export default function(tag) {

  var coverImage = '';
  if (tag.image) {
    coverImage = `
      <div class="img-wrapper full-width">
        <div class="img-container" style="padding-bottom:50%">
          <img data-src="${tag.image}" alt="${tag.name}" class="lazy-image">
        </div>
      </div>
`;
  }

  return `
<article class="boxes__item small animate animate__fade-in">
  <header class="author">
      <table>
          <tr>
              <td><span class="author__name"><a href="/tag/${tag.slug}">${tag.name}</a></span><br>
              	${tag.count.posts} stories
              </td>
          </tr>
      </table>
  </header>
  <a href="/tag/${tag.slug}/">
    ${coverImage}
  </a>
  <h1>${tag.name}</h1>
  <p>${tag.description || ''}</p>
  <p><a href="/tag/${tag.slug}/" class="dimmed">See stories in category...</a></p>
 </article>
`;
}
