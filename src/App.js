import React from 'react';
import styled from 'styled-components';
import './App.css';
//import Login from './components/Login/Login';
import AdvancedFilter from './components/Filtro/AdvancedFiltro';



class App extends React.Component {
  render() {
    return (
      <AdvancedFilter />
    );
  }
}

export default App;

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: auto;
`;
