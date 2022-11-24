import React, { useEffect, useState } from "react";

import { db } from "../firebase";
import Swal from "sweetalert2";

const Registro = (props) => {

    //hooks
    const [categoria, setCategoria] = useState('');
    const [reporte, setReporte] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');
    const [lista, setLista] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    // const [error, setError] = useState(null);


    const btnCancelar = () => {
        setCategoria('')
        setReporte('')
        setDescripcion('')
        setUbicacion('')
        setFecha('')
        setId('')

        // //alerta cancel
        window.Swal.fire({
            icon: 'error',
            title: 'Cancelado!',
            text: 'Se Reinicio Correctamente La Solicitud',
        });
    };


    useEffect(() => {
        const obtenerDatos = async () => {

            try {

                const data = await db.collection(props.user.email).get()
                console.log(data.docs);
                const arrayData = data.docs.map((documento) => ({ id: documento.id, ...documento.data() }))
                setLista(arrayData);
            } catch (error) {

                console.log(error);

            }

        }
        obtenerDatos();
    }, [props.user.email]);

    const guardarDatos = async (e) => {

        e.preventDefault()


        if (!categoria.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escoja Una Categoria',
            })
            return
        }
        if (!reporte.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escoja Un Reporte',
            })
            return
        }
        if (!descripcion.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escriba Una Descripcion',
            })
            return
        }
        if (!ubicacion.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escriba Una Ubicacion',
            })
            return
        }
        if (!fecha.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escoja una Fecha',
            })
            return
        }



        try {


            const nuevoRequerimiento = { categoria, reporte, descripcion, ubicacion, fecha }
            //agregar a bd en firebase
            const dato = await db.collection(props.user.email).add(nuevoRequerimiento)
            //agregar a lista
            setLista([
                ...lista,
                { id: dato.id, ...nuevoRequerimiento }
            ]);

        } catch (error) {

            console.log(error);

        }

        //limpiar los estados
        setCategoria('')
        setReporte('')
        setDescripcion('')
        setUbicacion('')
        setFecha('')
        //setError('')


        // //alerta success
        window.Swal.fire({
            icon: 'success',
            title: 'Agregado!',
            text: 'Se Registro Correctamente La Solicitud',
        });



    };

    //Eliminar
    const eliminarDato = async (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Estas Seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, Bórralo!',
            cancelButtonText: 'No, Cancelalo!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {

                    await db.collection(props.user.email).doc(id).delete()
                    const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
                    setLista(listaFiltrada);

                } catch (error) {
                    console.log(error);
                }

                swalWithBootstrapButtons.fire(
                    '¡Eliminado!',
                    'Se Elimino La Solicitud Correctamente',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    '¡Cancelado!',
                    'Tu Solicitud Esta A salvo :)',
                    'error'
                )
            }
        })

    }



    //funcion para activar el modo edicion
    const editar = (elemento) => {
        //cambiar modo edicion a verdadero
        setModoEdicion(true);
        //se actualiza estados para que los datos aparezcan en input
        setCategoria(elemento.categoria)
        setReporte(elemento.reporte)
        setDescripcion(elemento.descripcion)
        setUbicacion(elemento.ubicacion)
        setFecha(elemento.fecha)
        setId(elemento.id)
    };

    const editarDatos = async (e) => {
        e.preventDefault();

        if (!categoria.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escoja Una Categoria',
            })
            return
        }
        if (!reporte.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escoja Un Reporte',
            })
            return
        }
        if (!descripcion.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escriba Una Descripcion',
            })
            return
        }
        if (!ubicacion.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escriba Una Ubicacion',
            })
            return
        }
        if (!fecha.trim()) {
            window.Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por Favor, Escoja Una Fecha',
            })
            return
        }
        try {


            await db.collection(props.user.email).doc(id).update({ categoria, reporte, descripcion, ubicacion, fecha })
            const listaEditada = lista.map((elemento) => elemento.id === id ?
                { id, categoria, reporte, descripcion, ubicacion, fecha } : elemento)
            //listar con los valores nuevos...lista nueva
            setLista(listaEditada);

            setModoEdicion(false)
            setCategoria('')
            setReporte('')
            setDescripcion("")
            setUbicacion("")
            setFecha("")
            //setError(null);

        } catch (error) {
            console.log(error);

        }

        //alerta success
        window.Swal.fire({
            icon: 'success',
            title: 'Editado!',
            text: 'Se Registro Correctamente La Solicitud',
        });
    };



    return (
        <div className='container'>

            <div className='row'>
                {/* Esta seccion sera para los requerimientos*/}
                <div className="col-md-4">

                    <h2 className='text-center mb-2 mt-4 text-warning'>Crear Requerimiento</h2>
                    <div className="container card text-bg-light">

                        <div className="card-body">
                            <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>

                                {
                                    categoria === '' ? (
                                        <div className='alert alert-danger text-center' role="alert">
                                            Seleccione Una Categoría, Para Comenzar La Solicitud.
                                        </div>) : null
                                }

                                <select name='Categoria-Principal'
                                    className='form-select mb-3 mt-3' aria-label='Default select example'
                                    onChange={(e) => { (setCategoria(e.target.value)) }} value={categoria}>
                                    <option value='' >Elija Una Categoria</option>
                                    <option value='Mantenimiento Inmuebles' >Mantenimiento Inmuebles</option>
                                    <option value='Mantenimiento Muebles' >Mantenimiento Muebles</option>
                                    <option value='Servicios' >Servicios</option>
                                </select>


                                {
                                    categoria === 'Mantenimiento Inmuebles' ?
                                        <select name='Mantenimiento Inmuebles'
                                            className='form-select' aria-label='Default select example'
                                            onChange={(e) => (setReporte(e.target.value))} value={reporte}>
                                            <option value=''>Elija Un Reporte</option>
                                            <option value='Baños'>Baños</option>
                                            <option value='Cielo Raso'>Cielo Raso</option>
                                            <option value='Eléctrico'>Eléctrico</option>
                                            <option value='Pared'>Pared</option>
                                            <option value='Puerta'>Puerta</option>
                                        </select> : null
                                }

                                {
                                    categoria === 'Mantenimiento Muebles' ?
                                        <select name='Mantenimiento Muebles'
                                            className='form-select' aria-label='Default select example'
                                            onChange={(e) => (setReporte(e.target.value))} value={reporte}>
                                            <option value=''>Elija Un Reporte</option>
                                            <option value='Aire Acondicionado'>Aire Acondicionado</option>
                                            <option value='Archivador'>Archivador</option>
                                            <option value='Puesto de trabajo'>Puesto De Trabajo</option>
                                            <option value='Silla'>Silla</option>
                                        </select> : null
                                }

                                {
                                    categoria === 'Servicios' ?
                                        <select name='Servicios'
                                            className='form-select' aria-label='Default select example'
                                            onChange={(e) => (setReporte(e.target.value))} value={reporte}>
                                            <option value=''>Elija Un Reporte</option>
                                            <option value='Aseo'>Aseo</option>
                                            <option value='Transporte'>Transporte</option>
                                            <option value='Vigilancia'>Vigilancia</option>
                                        </select> : null
                                }

                                <h4 className="text-center mb-3 mt-3">Más Información</h4>
                                <textarea
                                    className='form-control mb-3'
                                    placeholder='Descripción De La Solicitud'
                                    onChange={(e) => { setDescripcion(e.target.value) }}
                                    value={descripcion}

                                />
                                <input type="text"
                                    className='form-control mb-3'
                                    placeholder='Ubicación Dentro De La Empresa'
                                    onChange={(e) => { setUbicacion(e.target.value) }}
                                    value={ubicacion}

                                />
                                <input type="date"
                                    className='form-control mb-3'
                                    placeholder='Fecha De La Solicitud'
                                    onChange={(e) => { setFecha(e.target.value) }}
                                    value={fecha}

                                />

                                <div className="list-group-item d-flex gap-2 justify-content-center">

                                    {
                                        modoEdicion ? <button className="btn btn-warning center" type="submit">Editar</button> :
                                            <button className="btn btn-success center" type="submit">Agregar</button>
                                    }

                                    <button className="btn btn-danger center" type='button' onClick={btnCancelar}>Cancelar</button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                {/* Esta seccion sera la lista de colsultar servicios */}

                <div className="col-md-8">
                    <h2 className='text-center mb-2 mt-4 text-warning'>Consultar Servicios</h2>

                    <div className="container card text-bg-light">

                        <div className="card-body">
                            {
                                lista.map((elemento, i) => (
                                    <div className="card mb-3 text-bg-primary" key={elemento.id}>
                                        <div className="card-header text-center py-2 text-bg-primary">
                                            Service {i + 1}
                                        </div>
                                        <div className="list-group">
                                            <div className="list-group-item"><b>Categoria: </b>{elemento.categoria}</div>
                                            <div className="list-group-item"><b>Tipo: </b>{elemento.reporte}</div>
                                            <div className="list-group-item"><b>Ubicación: </b>{elemento.ubicacion}</div>
                                            <div className="list-group-item"><b>Descripcion: </b>{elemento.descripcion}</div>
                                            <div className="list-group-item"><b>Fecha de Solicitud: </b>{elemento.fecha}</div>

                                            <div className="list-group-item d-flex gap-2 justify-content-center">
                                                <button onClick={() => eliminarDato(elemento.id)} className='btn btn-danger  mx-2'>Eliminar</button>
                                                <button onClick={() => editar(elemento)} className='btn btn-warning  mx-2'>Modificar</button>
                                            </div>
                                        </div>


                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
export default Registro;
