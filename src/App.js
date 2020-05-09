import React, { useState, useEffect }from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "My three Repositories",
      url: "Github",
      techs: ["C#", "Golang", "F#"],

    });

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    try {

      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repositorie => repositorie.id !== id));

    } catch (err) {
        alert('Erro ao deletar, tente novamente.');
    }
    
  }

    return (
      <div>
        
        <ul data-testid="repository-list">
          
          {repositories.map(repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}
    
            <button onClick={() => handleRemoveRepository(`${repositorie.id}`)}>
              Remover
            </button>

          </li>
          ))}
        </ul>
  
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    );
  }

export default App;
