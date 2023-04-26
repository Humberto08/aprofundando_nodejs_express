
# Projeto: API de Lista de Tarefas - Workshop Gama Academy #48 - Back end

Uma API simples de lista de tarefas que permite aos usuários criar, ler, atualizar e excluir tarefas. Os usuários podem criar tarefas com um nome, descrição e status de conclusão, e também podem atualizar o status de conclusão das tarefas existentes.

## Funcionalidades

- CRUD de tarefas: Permitir que os usuários criem, leiam, atualizem e excluam tarefas.
- Gerenciamento de status de conclusão: Permitir que os usuários atualizem o status de conclusão de suas tarefas.
- Seeders de dados iniciais: Usar seeders para popular o banco de dados os possíveis status de tarefas, um usuário de teste e uma tarefa de teste.


## Stack utilizada

**Back-end:** 
- TypeScript: Para escrever o código em um ambiente tipado e seguro.
- PrismaJS: Para mapear os modelos de dados para o banco de dados e executar operações de CRUD.
- Express: Para construir a API do sistema.


## Instalação

→ Rode os comandos no seu terminal:

    → npm i -D typescript @types/node ts-node ts-node-dev prisma @types/express @types/cors @types/bcrypt npm i --save-dev @types/multer

    → npm i express body-parser dotenv cors bcrypt @prisma/client multer sharp
    → tsc --init



→ Crie o script "dev": "ts-node-dev src/." no arquivo package.json

→ Crie um banco de dados mysql no seu servidor local

→ Altere o arquivo .env informando as credenciais do seu banco de dados seguindo o padrão informado na documentação do Prisma

→ Ignore a parte da documentação que sugere rodar o comando npx prisma migrate dev

→ No arquivo prisma/schema.prisma, crie os Models(tabelas) de acordo com a necessidade do seu projeto, sempre usando a documentação como base

→ Após definir seu arquivo schema.prisma com as tabelas que deseja criar, Execute os comandos no seu terminal:

    → npx prisma generate
    → npx prisma db push

→ Adicione no arquivo package.json a entrada a seguir:
 "prisma":
  {
    "seed": "ts-node prisma/seed.ts"
 }

→ Crie o arquivo seed.ts na pasta prisma

→ Preencha este arquivo seguindo a sugestão da documentação e de acordo com sua necessidade.


+-----------------------+
| Observação importante |
+-----------------------+


Quando forem geradas novas tabelas OU alterar algum campo em alguma tabela no schema.prisma é preciso rodar o comando npx prisma generate para que a alteração surta efeito. Além disso é preciso reiniciar o servidor TypeScript.

    1 - Feche o vscode e abra novamente OU
    
    2 - Abrir um arquivo .ts → CTRL + SHIFT + P → Typescript: Reiniciar Servidor TS → clica e aguarda
    
## Autores

- [Humberto Luciano](https://www.github.com/humberto08)


## Mentores
- [Jhonatan Junio - Professor Backend](https://www.github.com/jhonatanjunio)


