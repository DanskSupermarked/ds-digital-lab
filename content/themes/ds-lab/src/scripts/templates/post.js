import imageConverted from '../lib/image-converter';
import readTime from '../lib/read-time';
import epochToTimeago from 'epoch-to-timeago';

export default function(post) {

	var authorImage = '';
	if (post.author.image) {
		authorImage = `<td width="5%"><img src="${post.author.image}" class="author__image round-img"></td>`;
	}

	var tags = '';
	if (post.tags) {
		tags = '<br><span class="tags">' + post.tags.map(function(tag) {
			return `<a href="/tag/${tag.slug}/">${tag.name}</a>`;
		}).join('') + '</span>';
	}

	var published = new Date(post.published_at).getTime();
	var now = Date.now();
	var timeAgo = epochToTimeago.timeAgo(published, now);

	var html = imageConverted(post.html);
	var excerpt = html.substr(0, html.indexOf('</p>') + 4);

	return `
<article class="boxes__item small animate animate__fade-in">
  <header class="author">
      <table>
          <tr>
              ${authorImage}
              <td><span class="author__name"><a href="/author/${post.author.slug}">${post.author.name}</a></span><br>
              ${timeAgo} &middot; ${readTime(post.html)} read${tags}</td>
          </tr>
      </table>
  </header>
  <a href="/${post.slug}/" style="display:block;text-decoration:none">${excerpt}</a>
  <p><a href="/${post.slug}/">Read more...</a></p>
</article>
`;
}
