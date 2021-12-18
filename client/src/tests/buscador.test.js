import React from 'react';
import {shallow} from 'enzyme';
import "./setupTest"
import '@testing-library/jest-dom'
import Buscador from '../components/Buscador';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);


describe('Pruebas en <Buscador />', () => { 
  let initialState, store, bus;
  beforeEach(() => {
    initialState = {
      recipesLoaded: [],
    };
    store = mockStore(initialState);
    bus = shallow(<Buscador store={store} />);
  });


  test('<Buscador /> se renderiza bien', () => {
    expect(bus.find("h2")).toBe({});
  })

});