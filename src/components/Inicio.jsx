import React from 'react'

import uno from '../images/uno.jpg';
import dos from '../images/dos.jpg';
import tres from '../images/tres.jpg';
import cuatro from '../images/cuatro.jpeg';
import cinco from '../images/cinco.jpeg';
import logo from '../images/logo.png';
import logo2 from '../images/logo2.png';
import logo3 from '../images/logo3.png';
import Anonymous from '../images/Anonymous.jpg';



const Inicio = () => {
    return (
        <div className='text-light'>

            <header>
                <div className="textos">
                    <h1 className="titulo">SERVICE DEVELOPMENT</h1>
                    <h3 className="subtitulo text-warning">Mesa De Servicios Para Solicitudes</h3>
                    <button href="#" className="btn btn-success">Suscribete</button>
                </div>
                <div className="sesgoabajo"></div>
            </header>

            <main>

                <section className="acerca-de">
                    <div className="contenedor">
                        <h2 className="sobre-nosotros text-primary">Sobre nosotros</h2>
                        <h3 className="slogan text-warning">Resolvemos Servicios De Solicitudes 24/7</h3>
                        <p className="parrafo text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem dicta rem hic totam necessitatibus
                            tempora animi error perferendis. Vero corrupti porro quia! Ad saepe alias, officiis voluptatem sed, odio
                            dolores neque dolorem placeat nam quia numquam soluta ipsam nostrum consequuntur, a magnam non. Tenetur
                            repudiandae distinctio inventore voluptate fugit laborum?</p>
                        <p className="parrafo text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem dicta rem hic totam necessitatibus
                            tempora animi error perferendis. Vero corrupti porro quia! Ad saepe alias, officiis voluptatem sed, odio
                            dolores neque dolorem placeat nam quia numquam soluta ipsam nostrum consequuntur, a magnam non. Tenetur
                            repudiandae distinctio inventore voluptate fugit laborum?</p>
                        <button href="#" className="btn btn-success" >Suscribete</button>
                    </div>
                </section>

                <section className="galeria">
                    <div className="sesgoarriba"></div>
                    <div className="imagenes none">
                        <img src={uno} alt="Logo-1" />
                    </div>
                    <div className="imagenes">
                        <img src={tres} alt="Logo-3" />
                    </div>
                    <div className="imagenes">
                        <img src={dos} alt="Logo-2" />
                        <div className="encima">
                            <h2>Service Development</h2>
                            <div></div>
                        </div>
                    </div>
                    <div className="imagenes">
                        <img src={cuatro} alt="img-4" />

                    </div>
                    <div className="imagenes none">
                        <img src={cinco} alt="img-5" />
                    </div>
                    <div className="sesgoabajo"></div>
                </section>

                <section className="miembros">
                    <div className="contenedor">
                        <h2 className="sobre-nosotros text-warning">Nuestro equipo</h2>
                        <h3 className="slogan">Conoce A Nuestro Equipo De Trabajo</h3>
                        <div className="cards">
                            <div className="card-1">
                                <img src={Anonymous} alt="Logo-A" />
                                <h4 className='text-warning'>Anonymous #1</h4>
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                            <div className="card-1">
                                <img src={Anonymous} alt="Logo-A" />
                                <h4 className='text-warning'>Anonymous #2</h4>
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                            <div className="card-1">
                                <img src={Anonymous} alt="Logo-A" />
                                <h4 className='text-warning'>Anonymous #3</h4>
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="fondo">
                    <div className="sesgoarriba"></div>
                    <div className="contenedor">
                        <h2 className="titulo-patrocinadores text-danger">Nuestros Clientes</h2>
                        <h3 className="subtitulo-patrocinadores">Conoce A Algunos De Nuestros Patrocinadores</h3>
                        <div className="clientes">
                            <div className="cliente">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="cliente">
                                <img src={logo2} alt="logo" />
                            </div>
                            <div className="cliente mt-4">
                                <img src={logo3} alt="logo" />
                            </div>
                        </div>
                        <h3 className="subtitulo-patrocinadores especial">Y Muchos Más Clientes...</h3>
                    </div>
                    <div className="sesgoabajo-unico"></div>
                </section>

            </main>

            <footer>
                <div className="contenedor">
                    <h2 className="titulo-footer text-danger">Contactanos</h2>
                    <h3 className="subtitulo-footer">Lo apreciariamos mucho</h3>

                    <div className="container card text-bg-dark">

                        <form className='card-body'>
                            <input type="text" name="" id="" placeholder="Nombre" className='form-control mb-3' />
                            <input type="email" name="" id="" placeholder="Email" className='form-control mb-3' />
                            <textarea name="" id="" cols="30" rows="10" placeholder="Ingrese su mensaje..." className='form-control mb-3'></textarea>

                            <div className="list-group-item d-flex gap-2 justify-content-center">
                                <input type="submit" value="Enviar" className='btn btn-danger  mx-2' />
                            </div>

                        </form>
                    </div>

                </div>
            </footer>

        </div>

    )
}

export default Inicio;