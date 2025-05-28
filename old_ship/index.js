import vessel from './app.js'

vessel.listen({ port: 3000 }, () => {
  vessel.log.debug('Server is running on port 3000')
})
