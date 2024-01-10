# Introduction

Este repositório contém código referente a aplicação de marcação de agendamentos

## Instalação

- Será necessário a instalação do Postman para efetuar as requests, você pode adquirir a partir dessa rota : `https://www.postman.com/downloads/`
- Será necessário a instalação do mariaDB para efetuar as alterações no banco de dados, você pode adquirir a partir dessa rota : `https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.4.0&os=windows&cpu=x86_64&pkg=msi&m=fder`
- Será necessário instalar o git na máquina para efetuar comandos git,  `https://www.git-scm.com/downloads` faça o download da sua versão
- Crie um diretório e clone para sua máquina `git clone https://github.com/EliasFernandes03/API_Appointment.git`
- Dentro do diretorio raiz faça `npm install`
## Environment

- Atentar para a presença da variável de ambiente `.env`. O arquivo `.env.template` estabelece as variáveis necessárias.

## Running
- Para iniciar a aplicação basta abrir o terminal e digitar `npm run dev`

## Rest Client

- Para rodar as chamadas no rest client certifique-se de alterar os tokens para tokens válidos gerados nas chamadas
- Basta ir em file -> preferences -> settings
- Digitar rest client
- Edit in settings.json

## Requisições (API)

### Create Appoitment

`/api//create-appointment`

Utilize o postman para fazer as chamadas,crie uma requisição do tipo POST e passe esse corpo nela.

```
{
    "nome": "João",
    "telefone": "2345923",
    "modeloCarro": "Modelo X",
    "placaCarro": "ABC123",
    "dia": "2022-04-16",
    "horario": "12:00"
}
```


### Update Appointment

Crie uma nova request com o metodo PUT e coloque essa rota:

`/api/update-appointment/:id`

- Utilize o postman para fazer a chamada do tipo PUT, você precisará do id que é gerado na requisição de criação da revisão, esse id é o identificador único da revisão. Depois passe esse corpo atualizando os dados da revisão.
 

  ```
  {
      "dia": "2018-05-08",
      "horario": "9:00"
  }
    ```


### Delete Appointment

Crie uma nova request com o metodo PUT e coloque essa rota:

`/api/delete-appointment/:id`

-Utilize o postman para fazer a chamada do tipo PUT, você precisará do id que é gerado na requisição de criação da revisão, esse id é o identificador único da revisão.  Optei por fazer uma técnica chamada soft delete.


### Get Appointment

Crie uma nova request to tipo GET e passe essa rota:

`/api/get-appointment/:id`

- Utilize o postman para fazer a chamada do tipo GET, você precisará do id que é gerado na requisição de criação da revisão, esse id é o identificador único da revisão. 


### List Appointments(Day)

Crie uma nova request to tipo GET e passe essa rota:
`/api/appointments-day/:data`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi cadastrado na .env como TOKEN .
- Nessa request não será necessário passar um corpo, :data tem esse formato `YYYY-MM-DD`

### List Appointments(Week)

Crie uma nova request to tipo GET e passe essa rota:
`/api/appointments-week/:data`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi cadastrado na .env como TOKEN .
- Nessa request não será necessário passar um corpo, :data tem esse formato `YYYY-MM-DD`

### List Appointments(Month)

Crie uma nova request to tipo GET e passe essa rota:
`/api/appointments-day/:data`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi cadastrado na .env como TOKEN .
- Nessa request não será necessário passar um corpo, :data tem esse formato `YYYY-MM-DD`
