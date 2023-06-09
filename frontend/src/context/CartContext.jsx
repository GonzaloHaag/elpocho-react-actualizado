import { createContext,useEffect,useState } from "react";

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({children}) => {
    const [carrito,setCarrito] = useState(carritoInicial);
   
    /*
    TODAS LAS FUNCIONES RELACIONADAS AL CARRITO VAN A ACA, 
    INCLUYENDO LA DE ELIMINAR EL PRODUCTO
    */
    const agregarAlCarrito  = (item,cantidad) => {
        const itemAgregado = {...item,cantidad};
        const nuevoCarrito = [...carrito];
        const estaEnElCarrito = nuevoCarrito.find((producto) => producto.id === itemAgregado.id);

        if(estaEnElCarrito) {
            estaEnElCarrito.cantidad += cantidad;
        }
        else{
            nuevoCarrito.push(itemAgregado); 
        }

        setCarrito(nuevoCarrito);
    }

    const cantidadEnCarrito = () => {
        return (carrito.reduce((acc,prod) => acc + prod.cantidad, 0));
    }
    const precioTotal = () => {
        return(carrito.reduce((acc,prod) => acc + prod.precio * prod.cantidad, 0));
    }
    const vaciarCarrito = () => {
        setCarrito([]);
    }
    const handleEliminarProducto = (id) => {
        
            //console.log(id); Me llega el id de la tarea que estoy eliminando
            const filterCarrito = carrito.filter((prod) => prod.id !== id);
            //console.log(filterCarrito);
            /*
            Me voy a quedar en el carrito con los que NO coincidan con ese id,
            ya que si coincide en el filter es porque la quiero eliminar, por 
            lo tanto el carrito me tiene que quedar sin ese producto
            */
           setCarrito(filterCarrito);
            
    }
    
    useEffect(()=>{
        localStorage.setItem("carrito",JSON.stringify(carrito));
    },[carrito]); //Para actualizarlo cada vez que el carrito cambia

    return (
        //MANDO A TRAVES DEL VALUE TODAS LAS FUNCIONES QUE VOY A UTILIZAR EN CARRITO.JSX
        <CartContext.Provider value = {{carrito,agregarAlCarrito,cantidadEnCarrito,precioTotal,vaciarCarrito,handleEliminarProducto}}>
            {children}
        </CartContext.Provider>
    )

    
}