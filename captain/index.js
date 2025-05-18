import { stdout } from 'process'
import autocannon from 'autocannon'

[ 'Pirate', 'Voodoo Lady', 'Monkey Island', 'Guybrush Threepwood', 'LeChuck' ].forEach( console.log )

const pirate = {
  name: 'The Voodoo Lady',
  image: 'placeholder_voodoolady.png',
  description: 'A mysterious and knowledgeable Voodoo priestess who often provides Guybrush with cryptic advice, voodoo ingredients, and essential aid in his quests. Her shop, the International House of Mojo, is a key location.',
  game: 'The Secret of Monkey Island'
}

const randomPirateName = () => {
  return `Pirate ${Math.floor(Math.random() * 1000)}`
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
  postTest(url, path, 1000, 10)
})

const getTest = (url, path, amount, connections = 10) => {
  const i = autocannon({
    url,
    amount,
    connections,
    bailout: 1,
    skipAggregateResults: true,
    requests: [{
      method: 'GET',
      path,
      headers: {
        'Content-Type': 'application/json'
      },
      verifyBody: body => {
        const parsed = JSON.parse(body)
        if (parsed.length === 0) {
          return false
        }
        if ( typeof parsed[0].name !== 'string' && parsed[0].name.length === 0) {
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
      console.log(`Benchmark of ${path} completed successfully`)
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


