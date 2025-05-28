import Fastify from 'fastify'
const app = Fastify({ logger: true })

app.get('/boarding', async ( _req, reply) => {
    fetch('https://xkcd.com/info.0.json').then( response => {
        if (response.ok) {
            reply.send(response.json());
        } else {
            reply.status(response.status).send({ error: 'Failed to fetch data' });
        }
    })
})


app.get('/healthcheck', async (_, reply) => {
  reply.send({ status: 'ok' })
})

export default app
