import React, { useState, useMemo, useCallback } from 'react';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, Search, Edit2, Trash2, ChevronDown, PlusCircle, Star, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';


interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface Order {
  id: string;
  customer: string;
  total: number;
  date: string;
  status: 'Pendiente' | 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado';
}

const mockProducts: Product[] = [
  { id: 'P001', name: 'Teclado Mecánico RGB (Quantum)', price: 79990, stock: 150, category: 'Periféricos' },
  { id: 'P002', name: 'Monitor Curvo 4K (Spectra)', price: 450000, stock: 45, category: 'Monitores' },
  { id: 'P003', name: 'Mouse Inalámbrico Ergonómico (Nova)', price: 35000, stock: 300, category: 'Periféricos' },
  { id: 'P004', name: 'Audífonos Gaming 7.1 (Vortex)', price: 85000, stock: 80, category: 'Audio' },
];

const mockOrders: Order[] = [
  { id: 'O1001', customer: 'Juan Pérez', total: 535000, date: '2024-11-20', status: 'Procesando' },
  { id: 'O1002', customer: 'María Garcés', total: 79990, date: '2024-11-19', status: 'Enviado' },
  { id: 'O1003', customer: 'Luis Rojas', total: 35000, date: '2024-11-18', status: 'Entregado' },
  { id: 'O1004', customer: 'Ana Soto', total: 450000, date: '2024-11-17', status: 'Pendiente' },
  { id: 'O1005', customer: 'Javier Muñoz', total: 165000, date: '2024-11-17', status: 'Cancelado' },
];



const formatCLP = (amount: number): string => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
};

const getStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'Entregado': return 'text-green-400 bg-green-900/50';
    case 'Enviado': return 'text-cyan-400 bg-cyan-900/50';
    case 'Procesando': return 'text-yellow-400 bg-yellow-900/50';
    case 'Pendiente': return 'text-orange-400 bg-orange-900/50';
    case 'Cancelado': return 'text-red-400 bg-red-900/50';
    default: return 'text-gray-400 bg-gray-900/50';
  }
};

// --- COMPONENTES DE VISTA ---

/**
 * Componente simple para el Dashboard
 */
const Dashboard: React.FC = () => {
  const totalRevenue = mockOrders
    .filter(o => o.status !== 'Cancelado')
    .reduce((sum, order) => sum + order.total, 0);
  
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'Pendiente').length;
  const lowStock = mockProducts.filter(p => p.stock < 50).length;

  const stats = [
    { title: 'Ingresos Totales (Mock)', value: formatCLP(totalRevenue), icon: DollarSign, color: 'text-green-400', shadow: 'shadow-green-900/50' },
    { title: 'Total Órdenes (Mock)', value: totalOrders, icon: ShoppingBag, color: 'text-cyan-400', shadow: 'shadow-cyan-900/50' },
    { title: 'Órdenes Pendientes', value: pendingOrders, icon: ChevronDown, color: 'text-orange-400', shadow: 'shadow-orange-900/50' },
    { title: 'Stock Crítico', value: lowStock, icon: Package, color: 'text-red-400', shadow: 'shadow-red-900/50' },
  ];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-extrabold text-teal-400 border-b border-gray-700 pb-2">Panel Principal</h2>
      
      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.title} 
            className={`p-5 bg-gray-800 rounded-xl shadow-xl border border-gray-700 hover:border-cyan-500 transition duration-300 transform hover:scale-[1.02] ${stat.shadow}`}
          >
            <div className="flex items-center">
              <stat.icon className={`h-8 w-8 mr-4 ${stat.color}`} />
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-cyan-800">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2"><TrendingUp/> Actividad Reciente</h3>
        <ul className="space-y-3 text-gray-400">
          <li className="flex items-center gap-2"><Star size={18} className="text-yellow-400"/> Nueva orden (O1006) recibida: ¡Monitor Curvo 4K!</li>
          <li className="flex items-center gap-2"><Package size={18} className="text-orange-400"/> Alerta de stock: Teclado Mecánico RGB ha bajado a 30 unidades.</li>
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400"/> Orden (O1003) marcada como Entregada.</li>
        </ul>
      </div>
    </div>
  );
};


/**
 * Muestra el listado de órdenes con filtros de estado y permite actualizar el estado.
 */
const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<'Todos' | Order['status']>('Todos');

  const filteredOrders = useMemo(() => {
    if (filter === 'Todos') return orders;
    return orders.filter(o => o.status === filter);
  }, [orders, filter]);

  const allStatuses: ('Todos' | Order['status'])[] = ['Todos', 'Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'];

  // Simulación de actualización de estado
  const handleStatusChange = useCallback((id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-extrabold text-teal-400 border-b border-gray-700 pb-2">Gestión de Órdenes</h2>

      {/* Filtros de Estado */}
      <div className="flex flex-wrap gap-2 bg-gray-800 p-3 rounded-lg shadow-inner border border-cyan-800">
        <span className="text-gray-400 self-center mr-2">Filtrar por:</span>
        {allStatuses.map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 text-sm rounded-full font-semibold transition-all ${
              filter === status
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tabla de Órdenes */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-2xl border border-cyan-800">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              {['ID', 'Cliente', 'Fecha', 'Total', 'Estado', 'Acciones'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-700/50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-cyan-400">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-400">{formatCLP(order.total)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* Selector de estado (simulado) */}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="p-1 bg-gray-900 border border-cyan-700 rounded-md text-white text-xs focus:ring-cyan-400 focus:border-cyan-400"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Procesando">Procesando</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <p className="p-6 text-center text-gray-500">No se encontraron órdenes con el filtro actual.</p>
        )}
      </div>
    </div>
  );
};

/**
 * Muestra el listado de productos y permite la gestión (simulada) de CRUD.
 */
const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const openEditModal = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  }, []);

  const openAddModal = useCallback(() => {
    setEditingProduct(null);
    setIsModalOpen(true);
  }, []);

  // Simulación de guardar producto
  const handleSaveProduct = (productData: Product) => {
    if (editingProduct) {
      // Editar
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      // Agregar (Generar ID simple para la simulación)
      const newId = 'P' + String(products.length + 1).padStart(3, '0');
      setProducts(prev => [...prev, { ...productData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  // Simulación de eliminar producto
  const handleDeleteProduct = (id: string) => {
    // Usamos un simple setMensaje aquí para simular el feedback sin usar alert/confirm
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-extrabold text-teal-400 border-b border-gray-700 pb-2">Gestión de Productos</h2>

      {/* Barra de Herramientas */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-3 rounded-lg shadow-inner border border-cyan-800">
        <div className="relative w-full md:w-1/3 mb-3 md:mb-0">
          <input
            type="text"
            placeholder="Buscar por ID o Nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-cyan-600 rounded-lg text-white focus:ring-cyan-400 focus:border-cyan-400 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400" />
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition-transform duration-200 transform hover:scale-[1.02] shadow-lg shadow-green-900/50"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Añadir Producto</span>
        </button>
      </div>

      {/* Tabla de Productos */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-2xl border border-cyan-800">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              {['ID', 'Nombre', 'Precio', 'Stock', 'Categoría', 'Acciones'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-700/50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-cyan-400">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">{formatCLP(product.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold" style={{ color: product.stock < 50 ? '#ff6347' : '#2ecc71' }}>{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-cyan-400 hover:text-cyan-300 p-2 rounded-full hover:bg-gray-700 transition"
                      aria-label="Editar"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-gray-700 transition"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <p className="p-6 text-center text-gray-500">No se encontraron productos.</p>
        )}
      </div>

      {/* Modal para Agregar/Editar Producto */}
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

// Modal de Formulario (Componente interno)
interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'price'> & { id: string, price: string }>(() => ({
    id: product?.id || '',
    name: product?.name || '',
    price: product ? String(product.price) : '0',
    stock: product?.stock || 0,
    category: product?.category || 'Electrónica',
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'stock' || name === 'price') ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData: Product = {
      id: product ? product.id : formData.id, 
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
    };
    onSave(finalData);
  };

  const inputStyle = "w-full p-2 bg-gray-900 border border-cyan-700 rounded-md text-white focus:ring-cyan-400 focus:border-cyan-400";
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-neon max-w-lg w-full border border-cyan-600">
        <h3 className="text-2xl font-bold text-teal-400 mb-4">{product ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelStyle}>Nombre:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputStyle} />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className={labelStyle}>Precio (CLP):</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" className={inputStyle} />
            </div>
            <div className="w-1/2">
              <label className={labelStyle}>Stock:</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" className={inputStyle} />
            </div>
          </div>
          <div>
            <label className={labelStyle}>Categoría:</label>
            <select name="category" value={formData.category} onChange={handleChange} required className={inputStyle}>
              <option value="Periféricos">Periféricos</option>
              <option value="Monitores">Monitores</option>
              <option value="Audio">Audio</option>
              <option value="Componentes">Componentes</option>
              <option value="Otros">Otros</option>
              <option value="Electrónica">Electrónica</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold transition-transform duration-200 transform hover:scale-[1.02]">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---

type View = 'Dashboard' | 'Products' | 'Orders' | 'Users' | 'Settings';

/**
 * Componente de barra lateral de navegación
 */
interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems: { name: View; icon: React.ElementType; label: string }[] = [
    { name: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { name: 'Products', icon: Package, label: 'Productos' },
    { name: 'Orders', icon: ShoppingBag, label: 'Órdenes' },
    { name: 'Users', icon: Users, label: 'Usuarios' },
    { name: 'Settings', icon: Settings, label: 'Configuración' },
  ];

  const linkStyle = (view: View) =>
    `flex items-center space-x-3 p-3 rounded-xl font-semibold transition-all duration-200 group w-full ${
      currentView === view
        ? 'bg-cyan-800/50 text-teal-400 border border-teal-400 shadow-neon-sm'
        : 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400 border border-transparent'
    }`;

  return (
    <div className="w-full md:w-64 bg-gray-900 border-r border-cyan-900/50 shadow-2xl p-4 flex flex-col h-full">
      <div className="text-2xl font-black text-cyan-400 mb-8 border-b border-gray-700 pb-3 flex items-center gap-2">
        <Star size={28}/> ADMIN LEVEL-UP
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate(item.name)}
            className={linkStyle(item.name)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">Panel de gestión simulado.</p>
      </div>
    </div>
  );
};


/**
 * El componente principal del Admin Panel que maneja la navegación.
 */
const AdminPanel: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Products':
        return <ProductManagement />;
      case 'Orders':
        return <OrderManagement />;
      case 'Users':
        return (
          <div className="p-4">
            <h2 className="text-3xl font-extrabold text-teal-400 border-b border-gray-700 pb-2">Gestión de Usuarios</h2>
            <div className="mt-4 p-6 bg-gray-800 rounded-lg border border-cyan-800 text-gray-400 flex items-center gap-3">
              <Users size={24} className="text-cyan-400"/>
              Módulo de Usuarios en Desarrollo. Aquí se gestionaría la información de los clientes y sus niveles de fidelización.
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="p-4">
            <h2 className="text-3xl font-extrabold text-teal-400 border-b border-gray-700 pb-2">Configuración del Sistema</h2>
            <div className="mt-4 p-6 bg-gray-800 rounded-lg border border-cyan-800 text-gray-400 flex items-center gap-3">
              <Settings size={24} className="text-cyan-400"/>
              Módulo de Configuración en Desarrollo. Se manejarían ajustes globales de la tienda.
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-white">
      <style>
        {`
        /* Estilos globales para un look de consola/terminal */
        body {
          font-family: 'Inter', sans-serif;
          background-color: #0d1117; /* Darkest background */
        }
        /* Custom neon shadow for visual flair */
        .shadow-neon {
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.5), 0 0 5px rgba(30, 144, 255, 0.5);
        }
        .shadow-neon-sm {
          box-shadow: 0 0 8px rgba(30, 144, 255, 0.3);
        }
        /* Ensure table content wraps on small screens */
        @media (max-width: 768px) {
            .overflow-x-auto table {
                min-width: 600px; /* Ensure table minimum width for small screens */
            }
        }
        `}
      </style>
      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Sidebar */}
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        
        {/* Contenido Principal */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <header className="mb-6 pb-2 border-b border-gray-800">
            <h1 className="text-4xl font-extrabold text-cyan-400">
              {/* Muestra el título traducido o el nombre de la vista */}
              {navItems.find(item => item.name === currentView)?.label || currentView.toUpperCase()}
            </h1>
            <p className="text-gray-500">
              {currentView === 'Dashboard' && 'Vista general del rendimiento de la tienda.'}
              {currentView === 'Products' && 'Administración completa del inventario.'}
              {currentView === 'Orders' && 'Revisión y gestión de pedidos de clientes.'}
              {(currentView === 'Users' || currentView === 'Settings') && 'Módulo en desarrollo.'}
            </p>
          </header>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Items para la traducción en el encabezado
const navItems = [
    { name: 'Dashboard', label: 'Dashboard' },
    { name: 'Products', label: 'Productos' },
    { name: 'Orders', label: 'Órdenes' },
    { name: 'Users', label: 'Usuarios' },
    { name: 'Settings', label: 'Configuración' },
];

export default AdminPanel;