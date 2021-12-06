import * as dotenv from 'dotenv'
import App from './classes/App'
dotenv.config()
const app = new App(8000)

app.start(() => {
  console.log(`Server Running on ${app.port}`)
})
