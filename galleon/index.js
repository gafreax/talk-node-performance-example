import galleon from './app.js'

galleon.listen({ port: 6666 }, () => {
  galleon.log.info('Server is running on port 6666')
})
