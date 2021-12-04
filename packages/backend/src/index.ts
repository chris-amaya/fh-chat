import AppServer from './classes/AppServer'
const server = new AppServer(8000)

server.start(() => {
  console.log(`Server Running on ${server.port}`)
})
