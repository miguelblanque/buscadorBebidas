import { Button, Modal, Image, ModalBody } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const ModalBebida = () => {

    const {modal, handleModalClick, receta, cargando} = useBebidas()
   
    //console.log('receta',receta)

    /**
     * Funcion para mostrar los ingredientes informados en la receta del 1 al 15
     * @returns 
     */
    const mostrarIngredientes =  () =>{
      let ingredientes = []
      for(let i = 1 ; i <16;i++){
        if(receta[`strIngredient${i}`]){
          ingredientes.push(
            <li>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</li>
          )
        }
      }
      return ingredientes
    }

   

    
  return (
    !cargando && (
        <Modal show={modal } onHide={ () =>{
          handleModalClick()
          }}>
          <Image
           className='card-img-top'
            src={receta.strDrinkThumb}
            alt={`Imagen receta ${receta.strDrink}`}
          />
          <Modal.Header>
            <Modal.Title>{receta.strDrink}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
                <div className='p-3'>
                    <h2>Instrucciones</h2>
                    {receta.strIntructions}
                    <h2>Ingredientes y Cantidad</h2>
                    {mostrarIngredientes()}
                </div>

               

            </Modal.Body>
            
        </Modal>
    )
  )
}

export default ModalBebida