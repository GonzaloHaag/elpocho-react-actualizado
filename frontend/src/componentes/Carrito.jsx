import React, { useContext} from 'react'
import { CartContext } from '../context/CartContext'
import '../Hojas_css/carrito.css';
import axios from 'axios';




const Carrito = () => {

    const {carrito,precioTotal,vaciarCarrito,handleEliminarProducto} = useContext(CartContext); //me traigo carrito para mostrar los productos dentro del carrito, y la funcion para el total del carrito, y la funcion para vaciar el carrito
  //ME TRAIGO LA FUNCION DE ELIMINAR PRODUCTO PARA UTILIZARLA
    const handleVaciar = () => {
        vaciarCarrito();
    }
  

    const handleFinalizarCompra = () => {
        const data = {
          carrito: carrito.map((prod) => ({
            titulo: prod.titulo,
            precio: prod.precio,
            cantidad: prod.cantidad,
          })),
          precioTotal: precioTotal(),
        };
      
        axios.post('http://localhost:3001/payment', data)
          .then((response) => {
            const initPoint = response.data.response.body.init_point; //dirige al init point de mp que es el pago
            window.open(initPoint, '_blank'); //Para abrirlo en otra pestaña
          })
          .catch((error) => {
            console.error(error);
          });
      };

    
  return (
    <div className='container'>
        <h1 className='main-title'> Tú Carrito</h1>
        {
            //Hago un map al carrito para mostrar lo que necesito de los productos en el carrito
            carrito.map((prod)=> ( 
                <div className='item-cart-container' key={prod.id}>
                  <svg
                  onClick={()=>handleEliminarProducto(prod.id)} //LLAMO ACA LA FUNCION TRAIDA DEL CONTEXT PARA UTILIZARLA EN EL CLICK
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill borrarTarea" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg>
                <div className='imagen-titulo-cantidad-container'>
                <img src={prod.imagen} alt={prod.titulo} />
                <div className='titulo-cantidad-container'>
                <h2>{prod.titulo}</h2>
                <p>Cantidad : <span>{prod.cantidad}</span></p>
                </div>
                </div>
               
                
                <p className='price'><span>${prod.precio * prod.cantidad}</span></p>
                <hr className='separador-cart'/>
                </div>
                
    
                
            ))
        }
        {
            carrito.length > 0 ?
            /*SI HAY ALGO EN EL carrito: */ 
            
            <div className='total-cart-container'> {/*para hacer 2 cosas luego del ? debo usar estas llaves*/}
            <h2 className='precio-total'>Precio total del carrito: ${precioTotal()}</h2>
            <div className='buttons-container'>
            <button onClick={handleVaciar}>VACIAR CARRITO</button>
            {/*ASI EL PRECIO TOTAL Y EL BOTON DE VACIAR CARRITO SE MOSTRARA SOLO SI HAY ALGUN PRODUCTO EN EL CARRITO*/}
            {/* <button>FINALIZAR COMPRA</button> */}
          <button onClick={handleFinalizarCompra}>Finalizar compra</button>
            </div>
            </div> :
            <h2 className='cart-vacio'>El carrito está vacio</h2> /*SI NO HAY NINGUN PRODUCTO EN CARRITO*/
        }

    </div>
  )
}

export default Carrito

