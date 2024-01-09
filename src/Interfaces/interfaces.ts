// Arquivo interfaces.ts

export interface ClientAttributes {
    id?: string;
    nome: string;
    telefone: string;
    modeloCarro: string;
    placaCarro: string;
  }
  
  export interface ConsultAttributes {
    id?: string;
    dia: Date;
    horario: string;
    ClientId: string;
  }
  