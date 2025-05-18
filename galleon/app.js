import { performance } from 'perf_hooks'

import Fastify from 'fastify'
import Piscina from 'piscina'

import { pirates } from './pirates.js'

const fastify = Fastify({ logger: true, disableRequestLogging: true })

const worker = new Piscina({
  filename: './worker.js'
})

fastify.get('/pool', async (_, reply) => {
  fastify.log.debug('Long task started')
  const start = performance.now() + performance.timeOrigin
  const result = await worker.run()
  const end = performance.now() + performance.timeOrigin
  reply.send({ done: 'ok', count: result, time: end - start })
})

fastify.get('/hell', async (_, reply) => {
  fastify.log.debug('Long task started')
  let c = 0
  const start = performance.now() + performance.timeOrigin
  for (let i = 0; i < 1e12; i++) {
    c++
  }
  const end = performance.now() + performance.timeOrigin
  reply.send({ done: 'ok', count: c, time: end - start })
})

const pirateSchema = {
  $id: 'pirate',
  type: 'object',
  properties: {
    name: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string' },
    game: { type: 'string' }
  }
}
fastify.post('/pirate', {schema: { body: pirateSchema } }, (req, reply) => {
  const { name, image, description, game } = req.body
  const pirate = { name, image, description, game }

  pirates.push(pirate)
  reply.send({ done: 'ok' })
})

const piratesSchema = {
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

fastify.post('/pirate-without-schema', (req, reply) => {
  const { name, image, description, game } = req.body
  const pirate = { name, image, description, game }
  pirates.push(pirate)
  reply.send({ done: 'ok' })
})

fastify.get('/pirates', { schema: piratesSchema }, (req, reply) => {
  reply.send({ pirates })
})

fastify.get('/pirates-no-schema', (req, reply) => {
  reply.send({ pirates })
})

fastify.get('/hc', async (_, reply) => {
  reply.send({ status: 'ok' })
})

export default fastify
