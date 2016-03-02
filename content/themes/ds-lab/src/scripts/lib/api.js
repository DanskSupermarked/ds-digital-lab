/**
 * Helpers for communicating with the meta api holding responses and likes for
 * the articles.
 */

var apiUrl = window.apiURL;
var id = window.postId;

/**
 * Make a AJAX call to the api
 * @param  {String} path
 * @param  {String} method
 * @param  {object} data
 * @return {Promise}
 */
var request = function(path = '', method = 'GET', data = null) {

  var fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  // Perform the ajax call
  return fetch(apiUrl + path, fetchOptions)
    .then(function(response) {
      if (response.status >= 300) {
        return Promise.reject(response);
      }
      return response;
    })
    .then(response => response.json());
};

/**
 * Get meta data from the article. If no meta data is present for the actual
 * article and new entry will be made.
 * @param  {boolean} raw Whether to include computed fields
 * @return {Promise}
 */
export var getMeta = function(raw) {
  var query = '?id=' + id;
  if (raw) {
    query += '&raw';
  }
  return request(query)
    .catch(function() {
      return request('', 'POST', {
        responses: [],
        likes: 0,
        id
      });
    });
};

/**
 * Increment the like value with one
 * @return {Promise}
 */
export var like = function() {
  return getMeta(id, true)
    .then(function(data) {
      return request('?id=' + id, 'PUT', {
        likes: data.likes + 1
      });
    });
};

/**
 * Add a response
 * @param {object} response
 * @return {Promise}
 */
export var addResponse = function(response) {
  return getMeta(true)
    .then(function(data) {

      // Set the publish data to now
      response.published = new Date().toISOString();

      // Update the responses list
      data.responses.push(response);
      return request('?id=' + id, 'PUT', {
        responses: data.responses
      });
    });
};

/**
 * Remove a response
 * @param  {string} published
 * @param  {string} name
 * @return {Promise}
 */
export var removeResponse = function(published, name) {
  return getMeta(true)
    .then(function(data) {

      // Remove respose which matches on publish date and author name
      var responses = data.responses.filter(function(response) {
        return (response.published !== published || response.name !== name);
      });

      return request('?id=' + id, 'PUT', {
        responses
      });
    });
};
