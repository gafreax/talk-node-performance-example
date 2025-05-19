import galleon from './app.js'

const PORT = 6666

galleon.listen({ port: PORT }, (err) => {
  if (err) {
    galleon.log.error(err)
  } else {
    galleon.log.info('Server is running on port ' + PORT)
  }
})
