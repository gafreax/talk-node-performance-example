import { performance } from 'perf_hooks'

import Fastify from 'fastify'
import Piscina from 'piscina'

import { pirates } from './pirates.js'
import { pirateSchema } from './schemas.js'

const app = Fastify({ logger: true, disableRequestLogging: true })

const worker = new Piscina({
  filename: './worker.js'
})

app.get('/', async (_req, reply) => {
  reply.send({ message: 'A piratesque backend, AHOY' })
})

app.get('/pool', async (_, reply) => {
  app.log.debug('Long task started')
  const start = performance.now() + performance.timeOrigin
  const result = await worker.run()
  const end = performance.now() + performance.timeOrigin
  reply.send({ done: 'ok', count: result, time: end - start })
})

app.get('/hell', async (_, reply) => {
  app.log.debug('Long task started')
  let c = 0
  const start = performance.now() + performance.timeOrigin
  for (let i = 0; i < 1e12; i++) {
    c++
  }
  const end = performance.now() + performance.timeOrigin
  reply.send({ done: 'ok', count: c, time: end - start })
})

app.post('/pirate', { schema: { body: pirateSchema } }, async (req, reply) => {
  const { name, image, description, game, age, ship } = req.body

  pirates.push({ name, image, description, game, age, ship })
  reply.send({ done: 'ok' })
})

app.post('/pirate-without-schema', async (req, reply) => {
  const { name, image, description, game, ship } = req.body
  const pirate = { name, image, description, game, ship }
  if (
    typeof pirate.name !== 'string' ||
    typeof pirate.age !== 'number' ||
    typeof pirate.description !== 'string' ||
    typeof pirate.game !== 'string' ||
    typeof pirate.image !== 'string' ||
    typeof pirate.ship !== 'object' ||
    typeof pirate.ship.name !== 'string' ||
    typeof pirate.ship.type !== 'string' ||
    typeof pirate.ship.cannons !== 'number'
  ) {
    reply.status(400).send({ msg: "Bad Request" })
  } else {
    pirates.push({ name, image, description, game })
    reply.send({ done: 'ok' })
  }
})

/**
app.get('/pirates', { schema: piratesSchema }, async (_req, reply) => {
  reply.send({ pirates })
})
*/

app.get('/pirates-no-schema', async (_req, reply) => {
  reply.send({ pirates })
})

app.get('/healtcheck', async (_, reply) => {
  reply.send({ status: 'ok' })
})

export default app
