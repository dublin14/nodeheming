// src/lib/api.js
// src/lib/api.js
export async function fetchDrupalNode(nodeType, uuid) {
    try {
      const baseUrl = import.meta.env.PUBLIC_DRUPAL_URL || 'http://localhost/nodehive';
      const apiPath = `/jsonapi/node/${nodeType}/${uuid}`;
      
      console.log('Fetching node from URL:', `${baseUrl}${apiPath}`);
      
      const response = await fetch(`${baseUrl}${apiPath}`, {
        headers: {
          'Accept': 'application/vnd.api+json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching ${nodeType}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in fetchDrupalNode:', error);
      throw error;
    }
  }
  
  // For fetching collections (lists of content)
  export async function fetchDrupalCollection(nodeType, params = {}) {
    try {
      const baseUrl = import.meta.env.PUBLIC_DRUPAL_URL || 'http://localhost/nodehive';
      const apiPath = `/jsonapi/node/${nodeType}`;
      
      const queryParams = new URLSearchParams(params).toString();
      const url = `${baseUrl}${apiPath}${queryParams ? '?' + queryParams : ''}`;
      
      console.log('Fetching collection from URL:', url);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.api+json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching ${nodeType} collection: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in fetchDrupalCollection:', error);
      throw error;
    }
  }