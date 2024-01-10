# Introduction

Este repositório contém código referente a aplicação de marcação de agendamentos

## Instalação

- Será necessário a instalação do Postman para efetuar as requests, você pode adquirir a partir dessa rota : `https://www.postman.com/downloads/`
- Será necessário a instalação do mariaDB para efetuar as alterações no banco de dados, você pode adquirir a partir dessa rota : `https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.4.0&os=windows&cpu=x86_64&pkg=msi&m=fder`
- Será necessário instalar o git na máquina para efetuar comandos git,  `https://www.git-scm.com/downloads` faça o download da sua versão
- Crie um diretório e clone para sua máquina `git clone https://github.com/EliasFernandes03/API_Appointment.git`
- Dentro do diretorio raiz faça `npm install`
## Environment

Atentar para a presença da variável de ambiente `.env`. O arquivo `.env.template` estabelece as variáveis necessárias.

## Production Database Setup

- Execute `DB_PWD=<senha do db> docker compose up db` para iniciar o banco de dados de produção.
- Crie o database e as tabelas de acordo com o arquivo db.sql
- `docker exec -it duna-web-platform-users-db-1 bash`
- `mysql -u root -p`
- Copie o cole o conteúdo de `db.sql` para o terminal do mysql.
- Dentro do arquivo .env certifique-se das credenciais do seu banco.

- Porta usada pela aplicação: 3306 (padrão) ou `.env.port`

OBS: Caso receba senha incorreta após os passos acima, deletar a pasta montada do banco de dados `db_data`. A senha passada pelo comando do docker `DB_PWD=<senha do db> ...` é setada na criação do container do banco de dados.

## Docker

- Tenha certeza que na .env se encontra preenchido `MONGODB_CONNECT`, é nele que a conexão com o banco de dados é feita. A mais comum, é uma string de conexão utilizando este formato `mongodb://localhost:27017/mydatabase`. Mas pode também ter estes formatos `mongodb://username:password@localhost:27017/mydatabase` e `mongodb+srv://cluster.mongodb.net/mydatabase`.

- Run `docker build -t duna-web-platform-users .`

- Run `docker compose up`

No modo desenvolvimento, usar:

- `RUN_MODE=dev docker compose up` ou `docker compose up`.

No modo produção, usar:

- `RUN_MODE=prod docker compose up`. Nesse modo, a pasta `crt` deve conter os certificados SSL.

## Development

Para desenvolvimento, recomenda-se que se suba apenas o banco de dados de produção (com a tabela já existente):

- `DB_PWD=<senha do db> docker compose up db`. Em seguida, basta rodar a aplicação na máquina HOST:

- `DB_HOST=localhost npm run dev`.

Dessa forma, modificações do código já serão compiladas e executadas.
OBS: Isso é temporário até implementarmos os development containers.

## Deployment

Certifique que is arquivos de certificados SSL estão na pasta `crt`.

- `DB_PWD=<senha do db> RUN_MODE=prod docker compose up`

## Testing

- Basta rodar `npm run test`

## Comandos

- Rode a compilação do codigo e suba a aplicação
  `npm run dev`

- Ambiente de testes
  `npm run test`
  `npm run test -- --testNamePattern="should return auth"` executa testes específicos conforme padrão.

- Ambiente de produção
  `npm run prod`

## Rest Client

- Para rodar as chamadas no rest client certifique-se de alterar os tokens para tokens válidos gerados nas chamadas
- Basta ir em file -> preferences -> settings
- Digitar rest client
- Edit in settings.json

## Requisições (API)

### Solicitar chave

`/api`

```
{
	key: "senha secreta" (verificar com BE)
}
```

### Reply

{
"api_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNjQ2ODg5ZS1lMGM5LTRmZWMtODNkNy1iMjg5NDljMjEyNTQiLCJpYXQiOjE2ODI1NTg2OTksImV4cCI6MTY4MjU2OTQ5OX0.FeboseY5S7O7f5-SjmnuMoqYpWt5_bFDPQQ5SSYF2rQ"
}

ATENÇÃO: ESTE TOKEN DEVE SER USADO EM TODAS AS CHAMADAS SEGUINTES. ADICIONE O SEGUINTE Header no request:
{
Authorization: Bearer <token>
}

![](</Fluxograma%20(2).jpg>)

### Login Usuario

Crie uma nova request com o metodo post e coloque essa rota:

`/login`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Passe esse corpo no json como um exemplo de email e conta existente no banco de dados que voce criou:

  ```
  {
  	"email": "exemplo@gmail.com",
  	"password":  "1234"
  }
  ```

  #### Retorno

  ```
  < HTTP/1.1 200 OK
  < Content-Type: application/json; charset=utf-8

  ```

  #### Erros

  | Status Code | Description                                                     |
  | ----------- | --------------------------------------------------------------- |
  | 401         | Unauthorized:Verifique se as credenciais estão corretas         |
  | 401         | Email address not registered: Email nao cadastrado              |
  | 401         | Incorrect password: Senha incorreta                             |
  | 400         | Syntax error:Verifique se o corpo do json esta no formato certo |

### Criar Usuario

Crie uma nova request com o metodo post e coloque essa rota e passando esse json no corpo como exemplo:

`/user`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Passe esse corpo no json com os dados que voce deseja:

  ```
    {
      "name": "Teste",
      "lastName": "Create _id",
      "email": "teste@gmail.com",
      "password": "1234",
      "actingField": "ex1",
      "useObjective": "ex2",
      "imagePath": "ex4",
      "phoneNumber":"903298439"
      "postalCode": "ex5",
      "street": "ex6",
      "number": "ex7",
      "complement": "ex8"
  }
  ```

  #### Retorno

  ```
  < HTTP/1.1 200 OK
  < Content-Type: application/json; charset=utf-8
  ```

  | Status Code | Description                                                      |
  | ----------- | ---------------------------------------------------------------- |
  | 401         | Unauthorized: Verifique se as credenciais estão corretas         |
  | 400         | Syntax error: Verifique se o corpo do json esta no formato certo |
  | 400         | Email ja existente                                               |

### Confirmar Cadastro

Crie uma nova request to tipo GET e passe essa rota:
`/validate-mail/:token`

#### Retorno

         ```
         < HTTP/1.1 200 OK
         < Content-Type: application/json; charset=utf-8
         ```

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| 403         | Invalid format ----------------------------------------- |
| 500         | Internal Server Error ---------------------------------- |

### Listar Usuários

Crie uma nova request to tipo GET e passe essa rota:
`/users`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Nessa request não será necessário passar um corpo

  #### Retorno

         ```
         < HTTP/1.1 200 OK
         < Content-Type: application/json; charset=utf-8
         ```

  | Status Code | Description                                              |
  | ----------- | -------------------------------------------------------- |
  | 401         | Unauthorized: Verifique se as credenciais estão corretas |

### Listar um usuário

Crie uma nova request to tipo GET e passe essa rota:
`/user/:uuid`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Nessa request não será necessário passar um corpo

  #### Retorno

  ```
  <HTTP/1.1 200 OK
  < Content-Type: application/json; charset=utf-8
  ```

  | Status Code | Description                                              |
  | ----------- | -------------------------------------------------------- |
  | 401         | Unauthorized: Verifique se as credenciais estão corretas |

### Atualizar Usuario

Crie uma nova request to tipo PUT e passe essa rota:
`/user/:uuid`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Nessa requisicao voce terá que passar um corpo json como o citado abaixo. **O JSON poderá conter pelomenos um dos campos!**
  ```
  {
    "name": "Marcus",
    "lastName": "Forte",
    "email": "exemplo@gmail.com",
    "password": "1234",
    "address": "Exemplo 543 ",
    "actingField": "SLAM",
    "useObjective": "SLAM"
  }
  ```
  #### Retorno
  ```
  < HTTP/1.1 200 OK
  < Content-Type: application/json; charset=utf-8
  ```
  | Status Code | Description                                                              |
  | ----------- | ------------------------------------------------------------------------ |
  | 401         | Unauthorized: Verifique se as credenciais estão corretas                 |
  | 400         | Syntax error: Verifique se o corpo do json esta no formato certo         |
  | 400         | User Not Updated: Verifique se o uuid esta correto e os valores passados |

### Delete Usuario

Crie uma nova request to tipo DELETE e passe essa rota:
`/user/:uuid`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Nessa request não será necessário passar um corpo

  #### Retorno

  ```
  < HTTP/1.1 200 OK
  < Content-Type: text/html; charset=utf-8
  ```

  | Status Code | Description                                                    |
  | ----------- | -------------------------------------------------------------- |
  | 401         | Unauthorized: Verifique se as credenciais estão corretas       |
  | 404         | Not Found: Verifique se foi passado algum uuid                 |
  | 400         | Usuario nao encontrado: Verifique se o uuid passado foi valido |

### Upload Foto

Crie uma nova request to tipo POST e passe essa rota:
`users/profile-img/:id`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Nessa request não será necessário passar um corpo de json
- Ira marcar o campo form data, na chave voce passara photo e value a sua foto de perfil.
  ```
  key : photo,
  value : photo.jpg
  ```
- Voce precisa modificar o content-type para multipart/form-data, ele vem como application/json;

  #### Retorno

  ```
  < HTTP/1.1 200 OK
  < Content-Type: application/json; charset=utf-8
  < Content-length: 40
  ```

  | Status Code | Description                |
  | ----------- | -------------------------- |
  | 400         | No file uploaded           |
  | 500         | Failed to upload file      |
  | 200         | File uploaded successfully |

  ### Contact us

Crie uma nova request to tipo POST e passe essa rota:
`/support`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado no login
- Nessa request voce podera enviar um json

  ```
  {
      "topic":"example",
      "email":"example@gmail.com",
      "name":"Example",
      "category":"example",
      "comment":"example",
      "screenshot":"base64"
  }
  ```

  #### Retorno

  ```
  < HTTP/1.1 200 OK
  < Content-Type: application/json; charset=utf-8
  ```

  | Status Code | Description                                |
  | ----------- | ------------------------------------------ |
  | 500         | An error occurred while sending the email. |

  ### Stripe Create

Crie uma nova request to tipo POST e passe essa rota:
`/payment`

- Nessa request voce podera enviar um json

  ```
  {
    "email": "teste32@example.com",
    "name": "teste23",
    "description": "example"
  }
  ```

  #### Retorno

  ```
  < HTTP/1.1 200 OK
  < Content-Type: application/json; charset=utf-8
  ```

  | Status Code | Description                     |
  | ----------- | ------------------------------- |
  | 500         | Failed to create Payment Intent |

### Listar Subscriptions

Crie uma nova request to tipo GET e passe essa rota:
`/payment/subscriptions`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Nessa request não será necessário passar um corpo

  #### Retorno

           ```
           < HTTP/1.1 200 OK
           < Content-Type: application/json; charset=utf-8
           ```

  /payment/subscription/:customerId
  | Status Code | Description |
  | ----------- | --------------------- |
  | 500 | Internal server Error |

### Listar User Subscriptions

Crie uma nova request to tipo GET e passe essa rota:
`/payment/subscription/:customerId`

- No Header dessa request tem de passar Authorization: Bearer < token > que foi gerado na api.
- Nessa request não será necessário passar um corpo

  #### Retorno

         ```
         < HTTP/1.1 200 OK
         < Content-Type: application/json; charset=utf-8
         ```

  | Status Code | Description           |
  | ----------- | --------------------- |
  | 500         | Internal server Error |

## Instale o Insomnia ou Postman (Debug)

- `https://insomnia.rest/download`

- `https://www.postman.com/downloads/`
