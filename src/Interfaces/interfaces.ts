// Arquivo interfaces.ts

export interface ClienteAttributes {
    id: number;
    nome: string;
    telefone: string;
    modeloCarro: string;
    placaCarro: string;
  }
  
  export interface ConsultaAttributes {
    id: number;
    dia: Date;
    horario: string;
    ClienteId: number;
  }
  