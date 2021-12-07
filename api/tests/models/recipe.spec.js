const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai').expect;

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Recipe Model', () => {
    beforeEach(async () => await Recipe.sync({ force: true }));

    describe('Validations', function () {
      it('error sin title', function(done) {
         Recipe.create({
          summary: 'Hola',
         })
          .then(() => done('No debería haberse creado'))  // done invocada con sin error de la promesa
          .catch(() => done());   // la promesa tiro error, por ende el test deberia pasar.
      });

      it('error sin summary', function(done) {
        Recipe.create({
         title: 'Hola',
        })
         .then(() => done('No debería haberse creado'))
         .catch(() => done());
     });

    });

  });
});
