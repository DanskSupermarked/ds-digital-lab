import encode from '../lib/html-encode';

export default function(response) {

  var classes = 'response boxes__item';
  if (response.name.toLowerCase() === window.authorName.toLowerCase()) {
    classes += ' boxes__item--transparent';
  }

  var image = '';
  if (response.image) {
    image = `<td width="5%"><img data-src="${response.image}" class="author__image author__image--small lazy-image img-bg round-img"></td>`;
  }

  var readTime = '';
  if (response.readTime) {
    readTime = ` &middot; ${response.readTime} read`;
  }

  var excerpt = response.excerpt || response.html;

  var readMore = '';
  if (response.excerpt) {
    readMore = `
<div class="response__text hidden">${response.html}</div>
<p><a href="#" class="btn response__read-more">Read more</a></p>
`;
  }

  var name = `${encode(response.name)}`;
  if (response.website) {
    name = `<a href="${encode(response.website)}">${name}</a>`;
  }

  return `
<div class="${classes} small">
  <div class="author">
    <table>
      <tr>
        ${image}
        <td>
          <span class="author__name">${name}</span><br>
          ${response.timeAgo}${readTime}
        </td>
      </tr>
    </table>
  </div>
  <a href="#" class="response__delete" data-published="${response.published}" data-name="${response.name}"><img data-src="/assets/images/trash.svg" class="lazy-image"></a>
  <div class="response__excerpt">${excerpt}</div>
  ${readMore}
</div>`;
}
