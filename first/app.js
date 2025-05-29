import Fastify from 'fastify'
import fp from 'fastify-plugin'

const app = Fastify({ logger: true })

app.register(fp(async (instance) => {
    app.decorate('pirate', () => ({ msg: 'Arrr, matey!' }) )
})) 

app.get('/pirate', async (request, reply) => {
    reply.send( app.pirate())
})

app.get('/', async (request, reply) => {
    reply.send({ message: 'Hello, World!' })
})

export default app