import { stdout } from 'process'
import autocannon from 'autocannon'

const getRandomPirate = () => JSON.stringify({
  name: `Pirate ${Math.floor(Math.random() * 10000)}`,
  age: Math.floor(Math.random() * 20) + 20,
  image: 'placeholder_guybrush.png',
  description: 'The mighty pirate protagonist, known for his wit, clumsiness, and ability to hold his breath for ten minutes.',
  game: 'The Secret of Monkey Island',
  ship: {
    name: 'Sea Monkey',
    type: 'Sloop',
    cannons: Math.floor(Math.random() * 6) + 2
  }
})

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
      body: getRandomPirate(),
      verifyBody: body => {
        const parsed = JSON.parse(body)
        if (parsed.done !== 'ok') {
          return false
        }
      }
    }]
  }, (err, result) => {
    if (err || result.non2xx > 0) {
      console.error('Error during benchmark:', err || ' Non-2xx responses')
    }
    stdout.write(`Benchmark of ${path} completed successfully`)
    stdout.write(autocannon.printResult(result))
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

