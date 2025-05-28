import Fastify from "fastify"
import fp from "fastify-plugin"

const app = Fastify({ logger: true })


app.addHook("onRequest", async (request, reply) => {
    const { headers } = request
    if( headers && headers["x-pirate"] ) {
        app.log.info("Arrr! Pirate detected!")
    }
})
app.register(fp(async (instance) => {
    instance.decorate("pirate", () => ({ msg: "Arrr!" }))
}))

app.get("/pirate", async (request, reply) => {
    reply.send(app.pirate())
})

app.get("/", async (request, reply) => {
    return { hello: "world" }
})


export default app