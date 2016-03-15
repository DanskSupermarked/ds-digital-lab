export default function(tag) {

  console.log(tag);

  var coverImage = '';
  if (tag.image) {
    coverImage = `
<img data-src="${tag.image}" class="lazy-image full-width img-full-width" alt="${tag.name}" >
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
  ${coverImage}
  <p>${tag.description || ''}</p>
  <p><a href="/tag/${tag.slug}/" class="btn">See stories in category</a></p>
 < /article>
`;
}
