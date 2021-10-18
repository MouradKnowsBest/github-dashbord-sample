import React  from 'react'
import "./Modal.css"
import moment from 'moment'


function Modal(props) {

  const CreationDate = moment(props.repo[props.myIndex].created_at).format('DD MMM, YYYY');  /* Formater les dates pour les rendre mieux lisibles */
  const UpdateDate   = moment(props.repo[props.myIndex].updated_at).format('DD MMM, YYYY');

  return (
    <div className="modalBackground">
      <div className="modalContainer">

          <button onClick={() => {props.setOpenModal(false)}} class="mini ui red button" > X </button>  {/* Bouton X de Sortie */}

          <div className="title"> 
              <h1> {props.repo[props.myIndex].name} </h1> {/* nom du depo*/}            
          </div> 

          <div className="body"> 
              <li > 
                <i> <p className="descriptionText"> {props.repo[props.myIndex].description} </p> </i> {/* nDescription du depo*/}   
              </li> 

              <i class="star icon"></i>{props.repo[props.myIndex].stargazers_count} {/* Nb de Stars + Icon */}   

              <li>  Language : {props.repo[props.myIndex].language} </li> {/* Language */} 

              <li>  Created : {CreationDate} </li> {/* Creation Date */} 

              <li>  Updated : {UpdateDate} </li> {/* Update Date */} 
          </div>

          <li> 
              <i class="arrow right icon"></i>
              <a href={props.repo[props.myIndex].html_url} title="Github LINK" target="_blank" rel="noreferrer"> Github link </a>  {/* Github LINK + Icon*/}       
          </li>
      </div>
    </div>
  )
}

export default Modal