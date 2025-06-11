import React, { createContext, useContext, useState, ReactNode } from 'react';

type Alerta = {
  id: any;
  peca: string;
  dataUltimaTroca: string;
  status: string;
  kmRestante: number;
  mesesRestantes: number;
};

type AlertaContextType = {
  alertas: Alerta[];
  setAlertas: (alertas: Alerta[]) => void;
};

const AlertaContext = createContext<AlertaContextType | undefined>(undefined);

export const AlertaProvider = ({ children }: { children: ReactNode }) => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  return (
    <AlertaContext.Provider value={{ alertas, setAlertas }}>
      {children}
    </AlertaContext.Provider>
  );
};

export const useAlertas = () => {
  const context = useContext(AlertaContext);
  if (!context) {
    throw new Error("useAlertas deve ser usado dentro de um AlertaProvider");
  }
  return context;
};
