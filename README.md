# Shortly-API

- Vamos ser francos: passar uma URL gigante de um meme, vídeo ou qualquer outra coisa na internet para um(a) amigo(a) é uma situação embaraçosa. Tudo piora quando a pessoa que recebe o link não tem como abri-lo diretamente e é obrigada a escrever o link caractere por caractere;
- Para evitar este tipo de situação e de quebra conseguir monitorar os acessos a este link, surgiram os encurtadores de URL.

# Rotas

POST */signup*

POST */signin*

GET */urls/:id*

GET */urls/open/:shortUrl*

DELETE */urls/:id*

GET */users/me*

GET */ranking*

## Tecnologias 

As seguintes ferramentas e frameworks foram utilizados na construção do projeto:

- Cors
- Dotenv
- Express
- Joi
- Pg
- Bcrypt
- Nanoid
- Uuid
- Postgres