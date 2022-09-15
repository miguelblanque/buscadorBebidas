import {useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext= createContext()

const BebidasProvider = ({children}) => {

  const [bebidas, setBebidas] = useState([])

  const [favoritos, setFavoritos] = useState([])

  const[modal, setModal] = useState(false)

  const [bebidaId, setBebidaId] = useState(null)

  const [receta, setReceta] = useState({})

  const [cargando, setCargando] = useState(false)





  //obtenemos los favoritos de LocalStorage
  useEffect(() => {
    obtenerBebidas()
    const obtenerLs=()=>{
        const favoritosLS = JSON.parse(localStorage.getItem('favoritos')) ?? []; 
      
        setFavoritos(favoritosLS);
        console.log('Obteniendo LS Favoritos: ',favoritosLS)

        }
    obtenerLs();
     
    }, [])

  //guardamos los favoritos en LocalStorage
  useEffect(()=> {
    console.log('Guardando localStorage')
    if(favoritos.length>0){
    localStorage.setItem('favoritos', JSON.stringify(favoritos)) ;
        console.log('Guardando en LS: ',favoritos)
    }
  }, [favoritos])



  const obtenerBebidas = async datos => {
    try{
        const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

        const { data } = await axios(url)
        //console.log(data)
        setBebidas(data.drinks)
    } catch (error ) {
        console.log(error)
    }
  }

  /**
   * UseEffect para obtener las Bebidas
   
  useEffect(() =>{
      obtenerBebidas()
  }, [])
 */
  /**
   * Funcion para controlar cuando se muestra el modal con la bebida al hacer click 
   */
  const handleModalClick =() =>{

    setModal(!modal)
  }

  const handleBebibaIdClick = id => {
    setBebidaId(id)
  }

  const handleAgregarFavoritos = (receta) => {
    console.log('receta handleAgregarFavoritos',receta)
    //if(favoritos?.some(rece => rece.bebidaId===receta.bebidaId)){
     //return
    //}
    localStorage.setItem('favoritos', JSON.stringify(receta)) ;
    setFavoritos([...favoritos,receta])
   console.log('add Favorite - ',favoritos)
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
          cargando,
          handleAgregarFavoritos
          
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