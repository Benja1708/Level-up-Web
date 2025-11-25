import React from 'react';
// Importa el tipo AdminView desde el componente principal del panel
import type { AdminView } from './AdminPanel.tsx'; 

interface AdminNavButtonProps {
    label: string;
    view: AdminView;
    current: AdminView;
    setView: (view: AdminView) => void;
    Icon: React.ElementType;
}

const AdminNavButton: React.FC<AdminNavButtonProps> = ({ label, view, current, setView, Icon }) => {
    const isActive = current === view;
    const activeClasses = 'border-b-2 border-green-400 text-green-400';
    const inactiveClasses = 'text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-gray-500';

    return (
        <button
            onClick={() => setView(view)}
            className={`flex items-center gap-2 px-4 py-2 font-semibold transition duration-300 ${isActive ? activeClasses : inactiveClasses}`}
        >
            <Icon className="w-5 h-5"/>
            {label}
        </button>
    );
};

export default AdminNavButton;