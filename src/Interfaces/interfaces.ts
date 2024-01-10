export interface ClientAttributes {
    id?: string;
    nome: string;
    telefone: string;
    modeloCarro: string;
    placaCarro: string;
  }

//Appointments
  export interface AppointmentAttributes {
    id?: string;
    dia: string;
    horario: string;
    ClientId: string;
    deleted:boolean;
  }
  