export default (start) => {
  let c = 0
  for (let i = start; i < 1e10; i++) {
    c++
  }
  console.log(`Worker with param started at ${start} and finished with count: ${c}`)
  return c
}
