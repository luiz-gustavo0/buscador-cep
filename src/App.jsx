import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { api } from './services/api';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);

  const getCepData = async () => {
    try {
      const response = await api.get(`${search}/json`);
      setData(response.data);
    } catch (e) {
      alert('Ops! Ocorreu um erro :(');
      setSearch('');
    }
  };

  const handleSearchCep = async () => {
    if (search === '') {
      return alert('Digite um cep');
    }
    await getCepData();
    setSearch('');
  };

  return (
    <div className='container'>
      <h1 className='title'>Buscador de Cep</h1>

      <div className='container-input'>
        <input
          type='text'
          placeholder='Digite seu cep...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearchCep}>
          <FiSearch size={24} color='#fff' />
        </button>
      </div>
      {data && (
        <main className='main-container'>
          <h2>Cep: {data.cep}</h2>
          <span>Logradouro: {data.logradouro}</span>
          <span>Bairro: {data.bairro}</span>
          <span>Cidade: {data.localidade}</span>
          <span>Estado: {data.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
