export interface ClientAttributes {
    id?: string;
    nome: string;
    telefone: string;
    modeloCarro: string;
    placaCarro: string;
  }


  export interface AppointmentAttributes {
    id?: string;
    dia: string;
    horario: string;
    ClientId: string;
    deleted:boolean;
  }
  