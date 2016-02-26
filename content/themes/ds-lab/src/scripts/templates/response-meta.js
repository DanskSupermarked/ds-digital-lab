export default function(user) {
	var image = '';
	if (user.image) {
		image = `
<td width="5%"><img data-src="${user.image}" class="author__image author__image--small lazy-image img-bg round-img"></td>
		`;
	}

	return `
<div class="author small">
  <table><tbody><tr>
		${image}
    <td>
      <span class="author__name">${user.name}</span>
    </td>
  </tr></tbody></table>
</div>
`;
}
