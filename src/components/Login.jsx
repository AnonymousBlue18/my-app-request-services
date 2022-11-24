import React, { useCallback, useState } from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom';
import Ocho from '../images/8.gif';

const Login = () => {

  //hooks
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [modoRegistro, setModoRegistro] = useState(true);
  //const [error, setError] = useState(null);
  const navigate = useNavigate();

  const guardarDatos = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      window.Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por Favor, Ingrese Un Email',
      })
      return
    }

    if (!pass.trim()) {
      window.Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por Favor, Ingrese Una Contraseña',
      })
      return
    }

    if (pass.length < 6) {
      window.Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La Contraseña Debe Tener Minimo 6 Caracteres',
      })
      return
    }

    //setError(null);

    if (modoRegistro) {
      registrar();
      // //alerta success
      window.Swal.fire({
        icon: 'success',
        title: 'Registro',
        text: 'Registro Exitoso!',
      });

    } else {
      Login();
      // //alerta success
      window.Swal.fire({
        icon: 'success',
        title: 'Login',
        text: 'Inicio Exitoso!',
      });
    }

  }



  //login
  const Login = useCallback(async () => {

    try {
      const res = await auth.signInWithEmailAndPassword(email, pass)
      console.log(res.user);

      setEmail('')
      setPass('')
      //setError('')
      navigate('/admin')

    } catch (error) {

      console.log(error.code);

      if (error.code === 'auth/user-not-found') {
        window.Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario No Existe',
        })

      }

      if (error.code === 'auth/wrong-password') {
        window.Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Contraseña Equivocada',
        })

      }
    }

  }, [email, pass, navigate]);


  //registrar
  const registrar = useCallback(async () => {

    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass)
      console.log(res.user);
      await db.collection('usuariosdb').doc(res.user.email).set(

        {
          email: res.user.email,
          id: res.user.uid,

        }
      )

      setEmail('')
      setPass('')
      //setError(null)

    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        window.Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email No Valido',
        })

      }

      if (error.code === 'auth/email-already-in-use') {
        window.Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email Ya Registrado',
        })

      }
    }

  }, [email, pass]);




  return (

    <div className='container card text-bg-ligh home-1 centro-app d-grid'>
      <div className="card-body">

        <div className="">
          <h1> {modoRegistro ? "Registrarse" : "Iniciar Sesion"} </h1>
        </div>

        <div className="mb-3">
          <img src={Ocho} alt="logo" className='tamaño-gif' />
        </div>

        {/* en esta seccion sera el formulario */}
        <form onSubmit={guardarDatos}>

          {/* {
            error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )
          } */}

          <div className="form-floating mb-3">
            <input type="email" className="form-control" placeholder="Ingrese Su Email" id="correo"
              onChange={e => setEmail(e.target.value)} value={email} />
            <label for="correo" className="form-label">Direccion de Correo</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" className="form-control" placeholder="Ingrese Su Contraseña" id="contraseña"
              onChange={e => setPass(e.target.value)} value={pass} />
            <label for="contraseña" className="form-label">Contraseña</label>
          </div>



          <div className="d-grid gap-2">
            <button className='btn btn-outline-success'>{modoRegistro ? 'Registrarse' : 'Acceder'}</button>
            <button className='btn btn-outline-primary' type='button'
              onClick={() => { setModoRegistro(!modoRegistro) }}>{modoRegistro ? 'Ya Estas Registrado' : 'No Tienes Cuenta'}</button>
            <p className="mt-3 mb-1 text-muted color-primary">&copy; 2022</p>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Login;