import React, { useState } from 'react';
import { Zap, LayoutDashboard, Package, MessageCircle, Settings } from 'lucide-react';

// Importaciones de tipos y subcomponentes
// CORRECCIÓN: Se ajustan las rutas de importación de los subcomponentes.
import type { Producto } from '../../types.ts'; 
import ProductManagement from './ProductManagement.tsx';
import AdminNavButton from './AdminNavButton.tsx';

// Definición de tipos de vista interna
export type AdminView = 'dashboard' | 'products' | 'community' | 'settings';

interface AdminPanelProps {
    products: Producto[];
    setProducts: React.Dispatch<React.SetStateAction<Producto[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts }) => {
    const [adminView, setAdminView] = useState<AdminView>('products'); // Vista predeterminada: Gestión de Productos

    const renderAdminContent = () => {
        switch (adminView) {
            case 'products':
                // Subcomponente encargado del CRUD de productos
                return <ProductManagement products={products} setProducts={setProducts} />;
            case 'community':
                return <div className="p-6 text-gray-400">Funcionalidad para gestionar noticias y usuarios (TBD).</div>;
            case 'settings':
                return <div className="p-6 text-gray-400">Configuración del sistema (TBD).</div>;
            case 'dashboard':
            default:
                return (
                    // Dashboard simulado con métricas básicas
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                            <LayoutDashboard className="w-5 h-5"/> Resumen del Panel
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-800 rounded-lg border border-cyan-700">
                                <p className="text-sm text-gray-400">Total de Productos</p>
                                <p className="text-3xl font-bold text-green-400">{products.length}</p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg border border-cyan-700">
                                <p className="text-sm text-gray-400">Ventas (Simuladas)</p>
                                <p className="text-3xl font-bold text-green-400">54</p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg border border-cyan-700">
                                <p className="text-sm text-gray-400">Usuarios Registrados</p>
                                <p className="text-3xl font-bold text-green-400">128</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const headerClasses = 'text-3xl lg:text-4xl font-extrabold pb-3 mb-6 border-b-2 border-green-400 text-cyan-400 flex items-center gap-3';
    
    return (
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl border border-blue-900/50 col-span-1 lg:col-span-2 min-h-[500px]">
            <h2 className={headerClasses}>
                <Zap className="w-7 h-7"/> Panel de Administración
            </h2>

            {/* Navegación interna del panel */}
            <div className="flex border-b border-gray-700 mb-4">
                <AdminNavButton label="Dashboard" view="dashboard" current={adminView} setView={setAdminView} Icon={LayoutDashboard} />
                <AdminNavButton label="Productos" view="products" current={adminView} setView={setAdminView} Icon={Package} />
                <AdminNavButton label="Comunidad" view="community" current={adminView} setView={setAdminView} Icon={MessageCircle} />
                <AdminNavButton label="Configuración" view="settings" current={adminView} setView={setAdminView} Icon={Settings} />
            </div>

            {renderAdminContent()}
        </div>
    );
};

export default AdminPanel;