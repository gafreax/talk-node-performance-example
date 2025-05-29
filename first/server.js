import app from './app.js'

app.listen({ port: 3123 }, (err) => {
    if(err) {
        app.log.error(err)
        process.exit(1)
    }
})