import { client } from './client';

export async function getSearchResults(query: string) {
  const searchQuery = `*[_type == "product" && title match "${query}*"]{
      _id,
      title,
      description,
      price,
      tags,
      discountPercentage,
      isNew,
      "image": productImage.asset->url,
      slug
  }`;

  try {
    const results = await client.fetch(searchQuery);
    return results;
  } catch (error) {
    console.error('Error fetching search results', error);
    return []; 
  }
}
