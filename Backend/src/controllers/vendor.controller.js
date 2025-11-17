let vendedores = [];
let nextId = 1;


function createVendor(req, res) {
  const { name, email, codigoEmpleado, especialidad } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'El nombre y el email son requeridos' });
  }

  const newVendedor = {
    id: nextId++,
    name,
    email,
    codigoEmpleado: codigoEmpleado || null, 
    especialidad: especialidad || 'General', 
  };

  vendedores.push(newVendedor);

  res.status(201).json(newVendedor);
}

function getAllVendors(req, res) {
  res.json(vendedores);
}

function getVendorById(req, res) {
  const id = parseInt(req.params.id);
  const vendedor = vendedores.find(v => v.id === id);

  if (!vendedor) {
    return res.status(404).json({ message: 'Vendedor no encontrado' });
  }

  res.json(vendedor);
}


function updateVendor(req, res) {
  const id = parseInt(req.params.id);
  const { name, email, codigoEmpleado, especialidad } = req.body;

  const vendorIndex = vendedores.findIndex(v => v.id === id);

  if (vendorIndex === -1) {
    return res.status(404).json({ message: 'Vendedor no encontrado' });
  }

  const updatedVendedor = {
    ...vendedores[vendorIndex],
    name: name || vendedores[vendorIndex].name,
    email: email || vendedores[vendorIndex].email,
    codigoEmpleado: codigoEmpleado || vendedores[vendorIndex].codigoEmpleado,
    especialidad: especialidad || vendedores[vendorIndex].especialidad,
  };

  vendedores[vendorIndex] = updatedVendedor;

  res.json(updatedVendedor);
}

function deleteVendor(req, res) {
  const id = parseInt(req.params.id);
  const vendorIndex = vendedores.findIndex(v => v.id === id);

  if (vendorIndex === -1) {
    return res.status(404).json({ message: 'Vendedor no encontrado' });
  }

  vendedores.splice(vendorIndex, 1);

  res.status(200).json({ message: 'Vendedor eliminado exitosamente' });
}

module.exports = {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};