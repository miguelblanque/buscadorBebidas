import {useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext= createContext()

const BebidasProvider = ({children}) => {

  const [bebidas, setBebidas] = useState([])

  const[modal, setModal] = useState(false)

  const [bebidaId, setBebidaId] = useState(null)

  const [receta, setReceta] = useState({})

  const [cargando, setCargando] = useState(false)


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

  const handleBebibaIdClick = id => {
    setBebidaId(id)
  }


  useEffect(() =>{
    setCargando(true)
    const obtenerReceta = async () => {
        if(!bebidaId) return

        try {
          const url =`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`

          const {data} = await axios(url)
          setReceta(data.drinks[0])
        } catch (error) {
          console.log(error)
        }finally{
          setCargando(false)
        }
    }

    obtenerReceta()
  },[bebidaId])

  return (
    <BebidasContext.Provider 
        value={{
          obtenerBebidas,
          bebidas,
          handleModalClick,
          modal,
          handleBebibaIdClick,
          receta,
          cargando
          
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