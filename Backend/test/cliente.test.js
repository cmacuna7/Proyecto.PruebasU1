const request = require('supertest');
const app = require('../src/app.js');

describe('API de Clientes', () => {
  // GET
  test('GET /api/clientes debería devolver lista vacía inicialmente', async () => {
    const res = await request(app).get('/api/clientes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // POST
  test('POST /api/clientes debería crear un nuevo cliente', async () => {
    const nuevoCliente = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@email.com',
      telefono: '0998765432',
      direccion: 'Av. Principal 123',
      ciudad: 'Quito'
    };

    const res = await request(app).post('/api/clientes').send(nuevoCliente);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nombre).toBe('Juan Pérez');
    expect(res.body.email).toBe('juan.perez@email.com');
  });

  // POST: datos inválidos
  test('POST /api/clientes debería rechazar datos inválidos', async () => {
    const res = await request(app).post('/api/clientes').send({ nombre: 'María' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Nombre, Email, Teléfono, Dirección y Ciudad son requeridos');
  });

  // PUT
  test('PUT /api/clientes/:id debería actualizar un cliente existente', async () => {
    const cliente = {
      nombre: 'Ana López',
      email: 'ana.lopez@email.com',
      telefono: '0987654321',
      direccion: 'Calle Secundaria 456',
      ciudad: 'Guayaquil'
    };

    const creado = await request(app).post('/api/clientes').send(cliente);
    const id = creado.body.id;

    const actualizado = await request(app)
      .put(`/api/clientes/${id}`)
      .send({ telefono: '0999999999' });

    expect(actualizado.statusCode).toBe(200);
    expect(actualizado.body.telefono).toBe('0999999999');
  });

  // DELETE
  test('DELETE /api/clientes/:id debería eliminar un cliente', async () => {
    const cliente = {
      nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      telefono: '0976543210',
      direccion: 'Av. Tercera 789',
      ciudad: 'Cuenca'
    };

    const creado = await request(app).post('/api/clientes').send(cliente);
    const id = creado.body.id;

    const eliminado = await request(app).delete(`/api/clientes/${id}`);
    expect(eliminado.statusCode).toBe(200);
    expect(eliminado.body.nombre).toBe('Carlos Rodríguez');

    const res = await request(app).get('/api/clientes');
    expect(res.body.find(c => c.id === id)).toBeUndefined();
  });
});
