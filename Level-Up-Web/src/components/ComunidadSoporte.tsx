// src/components/ComunidadSoporte.tsx

import React from 'react';

const ComunidadSoporte: React.FC = () => {

  const noticias = [
    { id: 1, titulo: "Mejora tu FPS: Guía de optimización de PC Gamer", autor: "LevelUp Pro", fecha: "25/10/2025" },
    { id: 2, titulo: "¿Cómo elegir tu primera silla gamer?", autor: "Duoc UC Gaming", fecha: "18/10/2025" },
    { id: 3, titulo: "Top 5 Juegos de Mesa para la comunidad", autor: "Admin", fecha: "01/10/2025" },
  ];

  const whatsappLink = "https://wa.me/56912345678?text=Hola%20necesito%20soporte%20t%C3%A9cnico%20con%20mi%20equipo.";

  return (
    <div style={containerStyle}>
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#39FF14', borderBottom: '2px solid #1E90FF', paddingBottom: '10px', textAlign: 'center' }}>
        📢 Comunidad y Soporte Técnico
      </h2>

      {/* SECCIÓN 1: Contenido Educativo y de Comunidad (Blogs/Noticias) */}
      <section style={{ marginBottom: '30px' }}>
        <h3 style={sectionTitleStyle}>📰 Novedades y Guías Level-Up</h3>
        <p style={{color: '#D3D3D3'}}>Encuentra consejos y noticias para mejorar tu experiencia de juego.</p>
        
        <div style={gridStyle}>
          {noticias.map(noticia => (
            <div key={noticia.id} style={cardStyle}>
              <h4 style={{ margin: '0 0 10px 0', color: '#1E90FF' }}>{noticia.titulo}</h4>
              <p style={{ margin: '0', fontSize: '0.8em', color: '#D3D3D3' }}>{noticia.autor} | {noticia.fecha}</p>
              <button style={buttonStyle} onClick={() => alert(`Abriendo artículo: ${noticia.titulo}`)}>
                Leer Guía
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 2: Servicio de soporte técnico (Chat a WhatsApp) */}
      <section style={{ marginBottom: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={sectionTitleStyle}>🛠️ Soporte Técnico Inmediato</h3>
        <p style={{color: '#D3D3D3', marginBottom: '15px'}}>¿Problemas con tu PC Gamer o accesorios? Contacta a nuestro equipo de soporte.</p>
        <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
        >
            {/* Requisito: Añadir un chat que redirecciones a WhatsApp */}
            <button style={{...buttonStyle, backgroundColor: '#39FF14', color: '#000000', width: '100%'}}>
                Abrir Chat de WhatsApp (Soporte Técnico)
            </button>
        </a>
      </section>
      
      {/* SECCIÓN 3: Integración con Redes Sociales */}
      <section style={{ borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={sectionTitleStyle}>🌐 Síguenos en Redes Sociales</h3>
        <div style={{display: 'flex', gap: '20px'}}>
            <button style={socialButtonStyle} onClick={() => alert('Compartiendo en Facebook...')}>Facebook</button>
            <button style={socialButtonStyle} onClick={() => alert('Compartiendo en Instagram...')}>Instagram</button>
            <button style={socialButtonStyle} onClick={() => alert('Compartiendo en X (Twitter)...')}>X (Twitter)</button>
        </div>
        <p style={{color: '#D3D3D3', fontSize: '0.9em', marginTop: '10px'}}>Facilita el compartir productos y promociones en redes sociales (Requisito).</p>
      </section>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #1E90FF',
  borderRadius: '8px',
  backgroundColor: '#111',
  color: '#FFFFFF',
};

const sectionTitleStyle: React.CSSProperties = {
    fontFamily: 'Roboto, sans-serif',
    color: '#D3D3D3',
    fontSize: '1.4em',
    borderBottom: '1px dotted #333',
    paddingBottom: '5px',
    marginBottom: '15px',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
};

const cardStyle: React.CSSProperties = {
  padding: '15px',
  border: '1px solid #1E90FF',
  borderRadius: '8px',
  backgroundColor: '#222',
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 15px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#1E90FF',
  color: '#000000', 
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'Roboto, sans-serif',
  marginTop: '15px',
  transition: 'background-color 0.3s',
};

const socialButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#333',
    color: '#FFFFFF',
    border: '1px solid #D3D3D3',
    marginTop: 0
};

export default ComunidadSoporte;
