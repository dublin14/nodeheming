// src/lib/api.js

/**
 * Fetches a specific Drupal node by its UUID
 * @param {string} nodeType - The type of node (e.g., 'article', 'neighbourhood_note')
 * @param {string} uuid - The UUID of the node
 * @returns {Promise<Object>} The node data
 */
export async function fetchDrupalNode(nodeType, uuid) {
  try {
    // Use the correct env variable name for Astro
    const baseUrl = import.meta.env.PUBLIC_NEXT_PUBLIC_DRUPAL_BASE_URL || 'https://nodehive-ce.ddev.site';
    const apiPath = `/jsonapi/node/${nodeType}/${uuid}`;
    
    console.log('Fetching node from URL:', `${baseUrl}${apiPath}`);
    
    const response = await fetch(`${baseUrl}${apiPath}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
      }
    });
    
    if (!response.ok) {
      console.error('API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error fetching ${nodeType}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in fetchDrupalNode:', error);
    throw error;
  }
}

/**
 * Fetches a collection of Drupal nodes
 * @param {string} nodeType - The type of nodes to fetch (e.g., 'article', 'neighbourhood_note')
 * @param {Object} params - Query parameters for filtering, sorting, pagination, etc.
 * @returns {Promise<Object>} Collection of nodes and metadata
 */
export async function fetchDrupalCollection(nodeType, params = {}) {
  try {
    // Use the correct env variable name for Astro
    const baseUrl = import.meta.env.PUBLIC_NEXT_PUBLIC_DRUPAL_BASE_URL || 'https://nodehive-ce.ddev.site';
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
      console.error('API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error fetching ${nodeType} collection: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in fetchDrupalCollection:', error);
    throw error;
  }
}

/**
 * Helper function to process common Drupal text fields
 * @param {Object} field - A Drupal text field (body, summary, etc.)
 * @param {number} maxLength - Maximum length for truncated text
 * @returns {string} Processed text
 */
export function processDrupalTextField(field, maxLength = 150) {
  if (!field) return 'No content available';
  
  // Return summary if available
  if (field.summary) return field.summary;
  
  // Process value field if available
  if (field.value) {
    // Strip HTML tags for preview text
    const plainText = field.value.replace(/<\/?[^>]+(>|$)/g, "");
    
    // Truncate if needed
    if (maxLength > 0 && plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + '...';
    }
    
    return plainText;
  }
  
  // Return processed HTML if available (for full view)
  if (field.processed) return field.processed;
  
  return 'No content available';
}