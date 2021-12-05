import App from './classes/App'
const app = new App(8000)

app.start(() => {
  console.log(`Server Running on ${app.port}`)
})
