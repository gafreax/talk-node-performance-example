export const pirateSchema = {
  $id: 'pirate',
  type: 'object',
  properties: {
    name: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string' },
    game: { type: 'string' }
  }
}

export const piratesSchema = {
  response: {
    default: {
      type: 'object',
      properties: {
        error: {
          type: 'boolean',
          default: true
        }
      }
    },
    '2xx': {
      type: 'object',
      properties: {
        pirates: {
          type: 'array',
          items: { $ref: 'pirate#' }
        }
      }
    }
  }
}
