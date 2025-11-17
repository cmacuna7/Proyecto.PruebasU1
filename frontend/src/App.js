import React from 'react';
import './App.css';
import EmpleadoDetalle from './components/EmpleadoDetalle';

// ErrorBoundary simple para evitar "pantalla blanca" y mostrar información de diagnóstico
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // guardamos info para mostrarla y la enviamos a consola
    this.setState({ info });
    console.error('ErrorBoundary captured:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24 }}>
          <h2 style={{ color: '#b91c1c' }}>Ha ocurrido un error al cargar la aplicación</h2>
          <p>Revisa la consola del navegador (F12 → Console) y la terminal donde ejecutaste <code>npm start</code>.</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>
            <summary style={{ cursor: 'pointer' }}>Detalles (mostrar/ocultar)</summary>
            <div>
              {String(this.state.error && this.state.error.toString())}
              {this.state.info?.componentStack ? '\n\n' + this.state.info.componentStack : ''}
            </div>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const detalle = { nombreCompleto: 'Administrador', id: 'admin-1' };

  return (
    <div className="App">
      <div className="app-container">
        <h1 className="app-title">Concesionaria - Panel</h1>

        <ErrorBoundary>
          {/* Panel CRUD autos */}
          <EmpleadoDetalle detalle={detalle} />
        </ErrorBoundary>

        {/* VentasForm eliminado */}
      </div>
    </div>
  );
}

export default App;
