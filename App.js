import React, {useState} from 'react' ;
import {Form, Card, Image, List} from 'semantic-ui-react';
import './App.css';
import Modal from './Modal';

function App() {

  const [openModal,   setOpenModal]   =  useState(false); /* Hooks */ 
  const [userName,    setUserName]    =  useState('');
  const [userInput,   setUserInput]   =  useState();
  const [reposit,       setReposit]   =  useState([]);
  const [avatar,         setAvatar]   =  useState('');
  const [error,           setError]   =  useState(null);
  const [myIndex,       setMyIndex]   =  useState();
  const setData = ({avatar_url}) => {setAvatar(avatar_url)};

  const handleSearch = e => { /* Gérer la Recherche quand l'utilisateur tape le nom d'un user Github */ 
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
      const MY_URL = `https://api.github.com/users/${userInput}`; /* 1er API CALL pour fetcher les Users et leurs infos*/
       fetch(MY_URL)
         .then(res => res.json())
         .then(data => {
          if (data.message) {
            setError(data.message)
          } else {
          setUserName(data.login)
          setData(data);
          setError(null)
          }
         });

      const MY_NEW_URL = MY_URL + '/repos'; /* 2eme API CALL pour fetcher les repos*/
        fetch(MY_NEW_URL) 
         .then(resp => resp.json())
         .then((dat, keys) => {
          if (dat.message) {
            setError(dat.message)
          } else {
            setReposit(dat);
          }
     });
  };

  
 return (
    <div className="App">
      <div className="navbar">  {/* LA BARRE DE NAVIGATION (NAV BAR) */}
        <a href="./" title="Github LINK" className="navbarLink"> Github Dashboard Sample </a>
       </div> 
  
      <div className="searchBar"> {/* LA BARRE DE RECHERCHE (SEARCH BAR) */}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input placeholder ='Github user' name='github user' onChange={handleSearch} />
              <Form.Button color='pink' content ='Search' /> 
              </Form.Group>
          </Form>
      </div>

    {/* LE DASHBOARD */}

    {/* Gestion ERREUR */}
    {error ? (<h1> {error} </h1>) : (     
    <div className="card">
      <Card>
        
        <Image  src={avatar} wrapped ui={false} /> {/* IMAGE (AVATAR DE L'UTILISATEUR) */}

        <Card.Content> {/* INFO UTILISATEUR + le Modal qui s'affiche sur une clique*/}      
            <Card.Header>  {userName}  </Card.Header>
            <List>
                <List.Item>
                  <List.Content>            
                        
                        {reposit.map((item, index) => (  
                          <li key={item.id} onClick={() => {setMyIndex(index); 
                                                           setOpenModal(true);}}>
                              <i className="folder icon" /> {item.name}
                          </li>
                          ))}                  
                      {openModal && <Modal repo={reposit} myIndex={myIndex} setOpenModal={setOpenModal}/> }  {/* Affichage Modal une clique du user*/}
                  </List.Content>
                </List.Item>   
            </List>
          </Card.Content>
      </Card>

    </div>
  )}
    </div>
  );
}

export default App;