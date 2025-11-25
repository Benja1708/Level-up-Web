
export const DESIGN_COLORS = {
    MAIN_BG: '#111',
    ACCENT_BLUE: '#1E90FF',
    NEON_GREEN: '#39FF14',
    TEXT_PRIMARY: '#FFFFFF',
    TEXT_SECONDARY: '#D3D3D3',
    ERROR_RED: '#FF4500', 
};


export const cleanCurrencyToNumber = (priceString: string): number => {
  if (!priceString) return 0;
  const cleanString = priceString
    .replace('$', '')
    .replace(/\./g, '') // eliminar separadores de miles
    .replace(' CLP', '')
    .trim();

  return parseInt(cleanString, 10) || 0;
};

export const formatTotalCLP = (amount: number): string => {
  
  return `${amount.toLocaleString("es-CL")} CLP`;
};

