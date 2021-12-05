import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    await mongoose.connect('mongodb://mongo/test')
    console.log('DB Connected')
  } catch (error) {
    console.log(error)
    throw new Error('Error en la base de datos')
  }
}
