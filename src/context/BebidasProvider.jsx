import {useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext= createContext()

const BebidasProvider = ({children}) => {

  const [bebidas, setBebidas] = useState([])

  const[modal, setModal] = useState(false)

  const obtenerBebidas = async datos => {
    try{
        const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

        const { data } = await axios(url)
        console.log(data)
        setBebidas(data.drinks)
    } catch (error ) {
        console.log(error)
    }
  }

  /**
   * UseEffect para obtener las Bebidas
   */
  useEffect(() =>{
      obtenerBebidas()
  }, [])

  /**
   * Funcion para controlar cuando se muestra el modal con la bebida al hacer click 
   */
  const handleModalClick =() =>{

    setModal(!modal)
  }

  return (
    <BebidasContext.Provider 
        value={{
          obtenerBebidas,
          bebidas,
          handleModalClick,
          modal
        }}
    >
        {children}
    </BebidasContext.Provider>
  )
}
export {
    BebidasProvider
}
export default BebidasContext