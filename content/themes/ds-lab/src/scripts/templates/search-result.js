export default function(result) {

	window.e = result.description;
	window.t = result.title;

	window.reg = new RegExp(result.title, 'gi');
	var excerpt = result.description || '';
	excerpt = excerpt.replace(new RegExp(result.title, 'gi'), '');
	if (excerpt.length > 300) {
		excerpt = excerpt.substr(0, 300) + '...';
	}

	return `
<article class="boxes__item small">
	<h3 class="search__category">${result.category}</h3>
	<h2 class="no-margin-top">${result.title}</h2>
	<p>${excerpt}</p>
	<p><a href="${result.url}" class="btn">Read more</a></p>
</article>
`;
}
