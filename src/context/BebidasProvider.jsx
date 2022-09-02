import {useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext= createContext()

const BebidasProvider = ({children}) => {

  const [Bebidas, setBebidas] = useState([])

  const obtenerBebidas = async () => {
    try{
        const url='https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

        const { data } = await axios(url)
        
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

  return (
    <BebidasContext.Provider 
        value={{
            
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