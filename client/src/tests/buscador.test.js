import React from 'react';
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";


import Buscador from '../components/Buscador';

configure({ adapter: new Adapter() });

describe("<Buscador />", () => {
    let bus;
    // Si o si vas a tener que usar class component! No van a correr ninguno de los tests si no lo haces. <3
    beforeEach(() => {
       bus = shallow(<Buscador />);
    });
  
    it('Debería renderizar un text input', () => {
      // Podes importar el componente Link de react-router-dom.
      expect(bus.find('input').length).toBeGreaterThanOrEqual(1);
    });

  });