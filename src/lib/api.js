// src/lib/api.js
export async function fetchDrupalContent(contentType, params = {}) {
  const baseUrl = import.meta.env.PUBLIC_DRUPAL_URL || 'http://localhost/nodehive';
  const apiPath = '/jsonapi/node/' + contentType;
  
  const queryParams = new URLSearchParams(params).toString();
  const url = `${baseUrl}${apiPath}${queryParams ? '?' + queryParams : ''}`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.api+json',
    }
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching ${contentType}: ${response.statusText}`);
  }
  
  return await response.json();
}