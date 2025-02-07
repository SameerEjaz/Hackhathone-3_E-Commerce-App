import { type SchemaTypeDefinition } from 'sanity'
import { product } from './productSchema'
import { orderSchema } from './orderSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, orderSchema],
}
