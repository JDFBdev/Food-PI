import React from 'react';
import {shallow} from 'enzyme';
import '@testing-library/jest-dom'
import Buscador from '../components/Buscador';

describe('Pruebas en <Buscador />', () => { 

  test('<Buscador /> se renderiza bien', () => {
      const inputs = shallow(<Buscador/>);
      expect(inputs.find(<input/>)).to.have.lengthOf(1);
  })

});