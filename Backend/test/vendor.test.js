const request = require('supertest');
const app = require('../src/app'); 

let newVendorId;

describe('API CRUD de Vendedores (/api/vendedores)', () => {

  const newVendor = {
    name: 'Ana García',
    email: 'ana.garcia@concesionaria.com',
    codigoEmpleado: 'B456',
    especialidad: 'Autos Usados'
  };

  // 1. Prueba de CREACIÓN (POST)
  test('POST / -> debe crear un nuevo vendedor', async () => {
    const res = await request(app)
      .post('/api/vendedores')
      .send(newVendor);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newVendor.name);

    newVendorId = res.body.id;
  });

  // 2. Prueba de LECTURA (GET by ID)
  test('GET /:id -> debe obtener un vendedor por su ID', async () => {
    const res = await request(app).get(`/api/vendedores/${newVendorId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newVendorId);
    expect(res.body.name).toBe(newVendor.name);
  });

  // 3. Prueba de LECTURA (GET ALL)
  test('GET / -> debe obtener todos los vendedores', async () => {
    const res = await request(app).get('/api/vendedores');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toBe(newVendor.name);
  });

  // 4. Prueba de ACTUALIZACIÓN (PUT)
  test('PUT /:id -> debe actualizar un vendedor existente', async () => {
    const updatedData = {
      name: 'Ana García (Actualizada)',
      especialidad: 'Gerente de Usados'
    };

    const res = await request(app)
      .put(`/api/vendedores/${newVendorId}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedData.name);
    expect(res.body.especialidad).toBe(updatedData.especialidad);
    expect(res.body.email).toBe(newVendor.email);
  });

  // 5. Prueba de ELIMINACIÓN (DELETE)
  test('DELETE /:id -> debe eliminar un vendedor', async () => {
    const res = await request(app).delete(`/api/vendedores/${newVendorId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Vendedor eliminado exitosamente');
  });

  // 6. Prueba de VERIFICACIÓN (GET by ID después de DELETE)
  test('GET /:id -> debe devolver 404 si el vendedor fue eliminado', async () => {
    const res = await request(app).get(`/api/vendedores/${newVendorId}`);
    expect(res.statusCode).toBe(404);
  });

  test('GET /:id -> debe devolver 404 para un ID inexistente', async () => {
    const res = await request(app).get('/api/vendedores/999999');
    expect(res.statusCode).toBe(404);
  });

  test('POST / -> debe devolver 400 si faltan datos (ej. email)', async () => {
    const res = await request(app)
      .post('/api/vendedores')
      .send({ name: 'Vendedor Incompleto' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('El nombre y el email son requeridos');
  });

});