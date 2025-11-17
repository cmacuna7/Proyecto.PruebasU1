const request = require('supertest');
const app = require('../src/app.js');

describe('API de Autos', () => {
  // GET
  // Prueba: solicita la lista de autos inicialmente y espera un arreglo (vacío al inicio)
  test('GET /autos debería devolver lista (vacía inicialmente)', async () => {
    const res = await request(app).get('/autos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST
  // Prueba: crea un nuevo auto con datos válidos y espera código 201 y que el objeto devuelto tenga id y los campos enviados
  test('POST /autos debería crear un nuevo auto', async () => {
    const nuevoAuto = {
      marca: 'Toyota',
      modelo: 'Corolla',
      año: 2020,
      color: 'Blanco',
      numeroSerie: '1HGCM82633A004352'
    };

    const res = await request(app).post('/autos').send(nuevoAuto);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.marca).toBe('Toyota');
    expect(res.body.modelo).toBe('Corolla');
  });

  // POST: datos inválidos
  // Prueba: intenta crear un auto con datos incompletos y espera rechazo 400 con mensaje de validación
  test('POST /autos debería rechazar datos inválidos', async () => {
    const res = await request(app).post('/autos').send({ marca: 'Ford' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Marca, Modelo, Año, Color y Número de Serie son requeridos');
  });

  // PUT
  // Prueba: crea un auto, luego actualiza un campo (color) vía PUT y valida el cambio
  test('PUT /autos/:id debería actualizar un auto existente', async () => {
    const auto = {
      marca: 'Honda',
      modelo: 'Civic',
      año: 2018,
      color: 'Rojo',
      numeroSerie: 'JH4KA8260MC000000'
    };

    const creado = await request(app).post('/autos').send(auto);
    const id = creado.body.id;

    const actualizado = await request(app)
      .put(`/autos/${id}`)
      .send({ color: 'Negro' });

    expect(actualizado.statusCode).toBe(200);
    expect(actualizado.body.color).toBe('Negro');
  });

  // DELETE
  // Prueba: crea un auto, lo elimina y verifica que ya no aparece en la lista
  test('DELETE /autos/:id debería eliminar un auto', async () => {
    const auto = {
      marca: 'Ford',
      modelo: 'Focus',
      año: 2015,
      color: 'Azul',
      numeroSerie: '1FAHP3F20CL000000'
    };

    const creado = await request(app).post('/autos').send(auto);
    const id = creado.body.id;

    const eliminado = await request(app).delete(`/autos/${id}`);
    expect(eliminado.statusCode).toBe(200);
    expect(eliminado.body.marca).toBe('Ford');

    const res = await request(app).get('/autos');
    expect(res.body.find(a => a.id === id)).toBeUndefined();
  });
});
