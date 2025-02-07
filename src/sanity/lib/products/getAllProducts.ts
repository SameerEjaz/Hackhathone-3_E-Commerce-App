
import { client } from "../client"


export async function getAllProducts() {
    const query = `*[_type == "product"]{
        _id,
        title,
        description,
        price,
        tags,
        dicountPercentage,
        isNew,
        "image": productImage.asset->url,
        slug
    }`

    try {
        const products = await client.fetch(query)
        return products
    } catch (error) {
        console.error("Error in fecthing products",error)
    }
}

