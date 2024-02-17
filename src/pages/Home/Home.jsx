import "./Home.css";

export const Home = () =>{








    return (
        <>
            <div className="Home">
                <div className="TituloHome">
                    <h1>BIENVENIDO A HÉCTOR'S TATTOO</h1>
                    <br></br>
                </div>
                <div className="bloquesDiv">
                <div className="Bloque1">
                    <img className="Imagen1" src="https://radtattoocompany.com/wp-content/uploads/2024/01/DSC_2811.jpg" alt="ImagenEstudio1" />
                    <br></br>
                    <div className="Mensaje1">
                        En nuestro estudio de tatuajes el ambiente y la música formarán parte de tu experiencia con nosotros.
                    </div>

                </div>

                <br></br>

                <div className="Bloque2">
                    <img className="Imagen2" src="https://hushanesthetic.com/cdn/shop/articles/features-of-american-traditional-tattoo_1254x.jpg?v=1651537274" alt="ImagenEstudio2" />
                    <br></br>
                    <div className="Mensaje2">
                        Disponemos de una variedad de artistas especializados en diferentes estilos de tatuaje: Realismo, Tradicional, Blackwork..
                    </div>
            

                </div>
                </div>
        
             </div>
        
        </>
    )
}