import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {useAuthContext} from '../auth/AuthContext'

export default function RegisterPage() {
  const {signup} = useAuthContext()

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  })

  const onChange = ({target}: React.FormEvent) => {
    const {name, value} = target as HTMLInputElement
    setForm({...form, [name]: value})
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {email, password, name} = form

    const msg = (await signup(name, email, password)) as unknown as boolean

    if (msg !== true) {
      Swal.fire('Error', 'Verifique el usuario y contraseña', 'error')
    }
  }

  const todoOk = () => {
    return form.email.length > 0 &&
      form.password.length > 0 &&
      form.name.length > 0
      ? true
      : false
  }

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}>
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!todoOk()}>
          Crear cuenta
        </button>
      </div>
    </form>
  )
}
