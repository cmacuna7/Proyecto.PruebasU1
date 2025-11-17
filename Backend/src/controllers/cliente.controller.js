const clientes = [];

// GET
function getAllClientes(req, res) {
  res.json(clientes);
}

// POST
function addNewCliente(req, res) {
  const { nombre, email, telefono, direccion, ciudad } = req.body;

  // Validación básica de entrada
  if (!nombre || !email || !telefono || !direccion || !ciudad) {
    return res.status(400).json({ message: 'Nombre, Email, Teléfono, Dirección y Ciudad son requeridos' });
  }

  // Creamos un objeto cliente
  const newCliente = {
    id: Date.now(), // ID simulado
    nombre,
    email,
    telefono,
    direccion,
    ciudad
  };

  // Lo añadimos al arreglo de clientes
  clientes.push(newCliente);

  // Respondemos con el cliente creado
  res.status(201).json(newCliente);
}

// PUT
function updateCliente(req, res) {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, ciudad } = req.body;

  const i = clientes.findIndex(c => c.id == id);
  if (i === -1) return res.status(404).json({ message: 'Cliente no encontrado' });

  if (nombre !== undefined) clientes[i].nombre = nombre;
  if (email !== undefined) clientes[i].email = email;
  if (telefono !== undefined) clientes[i].telefono = telefono;
  if (direccion !== undefined) clientes[i].direccion = direccion;
  if (ciudad !== undefined) clientes[i].ciudad = ciudad;

  res.json(clientes[i]);
}

// DELETE
function deleteCliente(req, res) {
  const { id } = req.params;
  
  const index = clientes.findIndex(c => c.id == id);
  if (index === -1) return res.status(404).json({ message: 'Cliente no encontrado' });

  const deleted = clientes.splice(index, 1);

  res.json(deleted[0]);
}

module.exports = { getAllClientes, addNewCliente, updateCliente, deleteCliente };
