import { performance } from 'perf_hooks'

import Fastify from 'fastify'
import Piscina from 'piscina'
import NodeCache from 'node-cache'

import { pirates } from './pirates.js'
import { pirateSchema } from './schemas.js'

const app = Fastify({ logger: { level: 'debug'}, disableRequestLogging: true })
const cache = new NodeCache()

  const worker = new Piscina({
  filename: './worker.js'
})

const workerWithParam = new Piscina({
  filename: './worker-with-param.js',
})

app.get('/', async (_, reply) => {
  reply.send({ message: 'A piratesque backend, AHOY' })
})


app.get('/pool-cachable', async (req, reply) => {
  app.log.debug('Long task started')
  const { start } = req.query
  app.log.debug(`Received start parameter: ${start}`)

  const cacheKey = `pool-cachable-${start}`
  const cachedResult = cache.get(cacheKey)
  const startTime = performance.now() + performance.timeOrigin
  if (cachedResult) {
    app.log.debug('Returning cached result')
    const end = performance.now() + performance.timeOrigin
    reply.send({ done: 'ok', count: cachedResult, time: end - startTime })
  } else {
    const result = await workerWithParam.run(start)
    cache.set(cacheKey, result)
    const end = performance.now() + performance.timeOrigin
    reply.send({ done: 'ok', count: result, time: end - startTime })
  }
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
  for (let i = 0; i < 1e10; i++) {
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
