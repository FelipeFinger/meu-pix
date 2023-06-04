# MeuPix

## Descrição do Projeto

O projeto MeuPix é uma aplicação web que permite aos usuários gerar QR Codes para pagamentos via Pix. Com essa aplicação, os usuários podem inserir informações como valor da transação, chave Pix e dados adicionais, se necessário, e gerar um QR Code válido para realizar o pagamento utilizando o Pix.

## Funcionalidades

### Geração de QR Codes do Pix

A aplicação permite que os usuários gerem QR Codes válidos para pagamentos via Pix. Eles podem fornecer as informações necessárias, como valor da transação, chave Pix e dados adicionais, e a aplicação irá gerar um QR Code correspondente.

### Validação dos dados

A aplicação realiza a validação dos dados inseridos pelos usuários para garantir que sejam fornecidos corretamente e estejam em conformidade com as regras do Pix. Dessa forma, evita-se a geração de QR Codes inválidos.

### Compatibilidade com diferentes dispositivos

A aplicação web é responsiva e compatível com uma variedade de dispositivos, incluindo computadores, tablets e smartphones. Isso permite que os usuários acessem e utilizem a aplicação em qualquer dispositivo, facilitando a geração de QR Codes em qualquer lugar e a qualquer momento.

### Suporte a múltiplas chaves Pix

Caso a aplicação permita que os usuários gerenciem várias chaves Pix, é disponibilizada uma opção para selecionar a chave correta antes de gerar o QR Code. Isso possibilita que os usuários escolham a chave desejada para o pagamento.

### Histórico de QR Codes

A aplicação mantém um histórico dos QR Codes gerados pelos usuários. Os usuários podem visualizar e acessar facilmente os códigos gerados anteriormente para referência ou reutilização. O histórico é limitado aos últimos 5 QR Codes gerados.

### Personalização do design do QR Code

A aplicação permite que os usuários personalizem o design do QR Code de acordo com suas preferências. Eles podem escolher cores, logotipos ou imagens relacionadas à sua empresa para tornar o QR Code mais personalizado e identificável.

## Tecnologias Utilizadas

- React.js
- Next.js
- TypeScript
- Mantine UI (biblioteca de componentes)
- qrcode.react (biblioteca para geração de QR Codes)

## Instalação e Execução

1. Faça o clone deste repositório em sua máquina local.
2. Navegue até o diretório do projeto: `cd meu-pix`.
3. Instale as dependências do projeto: `yarn install`.
4. Inicie a aplicação em modo desenvolvimento: `yarn dev`.
5. Acesse a aplicação no navegador: `http://localhost:3000`.

## Considerações Finais

O projeto MeuPix é uma solução prática e fácil de usar para gerar QR Codes para pagamentos via Pix. Com suas funcionalidades de geração, validação, histórico e personalização, os usuários podem desfrutar de uma experiência completa ao utilizar o Pix como forma de pagamento.
