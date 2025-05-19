import { stdout } from 'process'
import autocannon from 'autocannon'

const pirate = {
  name: 'The Voodoo Lady',
  image: 'placeholder_voodoolady.png',
  description: 'A mysterious and knowledgeable Voodoo priestess who often provides Guybrush with cryptic advice, voodoo ingredients, and essential aid in his quests. Her shop, the International House of Mojo, is a key location.',
  game: 'The Secret of Monkey Island'
}

const randomPirateName = () => {
  const randomError = Math.floor( Math.random * 2 ) % 2
  if (randomError) {
    return 666
  }
  return `Pirate ${Math.floor(Math.random() * 10000)}`
}

const postTest = (url, path, amount, connections = 10) => {
  const i = autocannon({
    url,
    amount,
    connections,
    bailout: 1,
    skipAggregateResults: true,
    requests: [{
      method: 'POST',
      path,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...pirate, name: randomPirateName() }),
      verifyBody: body => {
        const parsed = JSON.parse(body)
        if (parsed.done !== 'ok') {
          return false
        }
      },
      onResponse (status, body) {
        if (status !== 200) {
          console.error(`Error: ${status} ${body}`)
        }
      }
    }]
  }, (err, result) => {
    if (err || result.non2xx > 0) {
      console.error('Error during benchmark:', err || ' Non-2xx responses')
    } else {
      stdout.write(`Benchmark of ${path} completed successfully`)
      stdout.write(autocannon.printResult(result))
    }
  })

  autocannon.track(i, {
    renderResultsTable: false
  })

  process.once('SIGINT', () => {
    i.stop()
    console.log('Benchmark stopped')
  })
}


const url = 'http://localhost:6666'
const paths = [ '/pirate', '/pirate-without-schema']
paths.forEach(path => {
  postTest(url, path, 10000, 100)
})

