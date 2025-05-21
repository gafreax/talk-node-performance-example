/**
 * pirate {
 *   name: string,
 *   age: number,
 *   description: string,
 *   game: string,
 *   image: string,
 *   ship: {
 *     name: string,
 *     type: string,
 *     cannons: number
 *   }
 * }
 */


export const pirateSchema = {
  $id: 'pirate',
  type: 'object',
  properties: {
    name: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string' },
    game: { type: 'string' },
    age: { type: 'number' },
    ship: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
        cannons: { type: 'number' }
      },
      required: ['name', 'type', 'cannons']
    }
  },
  required: ['name', 'image', 'description', 'game', 'age', 'ship'],
}

/**
 * export const piratesSchema = {
 * response: {
 *   default: {
 *     type: 'object',
 *     properties: {
 *       error: {
 *         type: 'boolean',
 *         default: true
 *       }
 *     }
 *   },
 *   '2xx': {
 *     type: 'object',
 *     properties: {
 *       pirates: {
 *         type: 'array',
 *         items: { $ref: 'pirate#' }
 *       }
 *     }
 *
 *   }
 * }
 *}
*/
