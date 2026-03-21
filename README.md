# Mist - Previsão do Tempo

Mist é uma aplicação web de previsão do tempo, desenvolvida com Next.js, que permite aos usuários buscar cidades e visualizar as condições meteorológicas atuais, previsões horárias e para os próximos dias.

> Este projeto foi desenvolvido como um laboratório prático para consolidar conceitos do ecossistema front-end moderno utilizando Next.js e TailwindCSS.

## Funcionalidades

- **Busca de Cidades:** Permite a pesquisa por cidades de todo o mundo, fornecendo sugestões de autocompletar.
- **Clima Atual:** Exibição da temperatura atual do local (incluindo máxima, mínima e sensação térmica), nível de umidade e velocidade do vento.
- **Previsão:** Separação da previsão meteorológica usando abas para as próximas *48 horas* ou para os próximos *7 dias*.
- **Dark Mode:** Alternância nativa de interface (Claro / Escuro).
- **Estados de Requisição:** Tratamento dos estados de requisição (cenários de Carregamento, Erro de API e Tela Inicial).
- **Histórico de Cidades:** As cidades pesquisadas ficam salvas localmente no navegador (usando Local Storage + Zustand).

## Como rodar o projeto

### Pré-requisitos

Possuir `Node.js` instalado na máquina local.

### Instalação

1. Clone o Repositório
```
https://github.com/davimilioli/mist
```

2. Acesse a pasta projeto
```
cd mist
```

3. Instale as dependências
```
npm install
```

4. Rode o projeto
```
npm run dev
```

## Tecnologias e Bibliotecas Utilizadas

- Next.js
- React
- Tailwind CSS
- Shadcn UI
- Lucide React
- Axios
- Next-themes
- Zustand

## APIs

Utilização de APIs gratuitas da **[Open-Meteo](https://open-meteo.com/)**:

- **Busca de Cidades**: A **[Geocoding API](https://open-meteo.com/en/docs/geocoding-api)** converte o nome da cidade em coordenadas (latitude e longitude).
- **Dados do Clima**: A **[Weather API](https://open-meteo.com/en/docs)** pega essas coordenadas e retorna tudo: temperatura de agora, umidade, vento e a previsão para as próximas horas e dias.

## Estrutura do Projeto

O projeto foi organizado da seguinte forma:

**`app/`**
- **`api/`** → Rotas de chamadas internas da aplicação (Proxy para evitar CORS)
- **`stores/`** → Gerenciamento de estado global (ex.: histórico no Local Storage)

**`components/`**
  - **`ui/`** → Botões, inputs e peças básicas (Shadcn UI)
  - **`header/`** → Pesquisa inicial e troca de temas
  - **`currentweather/`** → Layout do clima atual de uma cidade
  - **`forecast/`** → Previsão do tempo detalhada (horas/dias)
  - **`states/`** → Telas de carregamento, erros e tela inicial
  - **`WeatherContent.tsx`** → Orquestrador que agrupa a tela e decide se exibirá o conteúdo, o erro ou o loading

**`types`** → Definições de tipagem global TypeScript, moldando as respostas das APIs

**`services`** → Camada que agrupa toda a lógica da aplicação, a busca externa e a organização/estruturação dos dados que vêm das APIs

**`lib`** → Configurações e instâncias (ex.: Axios)

## Conceitos Praticados

Durante o desenvolvimento deste projeto, foram colocados em prática e aprimorados os seguintes tópicos:
- **Consumo de APIs Externas:** Realização de chamadas assíncronas e estruturação dos dados recebidos (Axios + Open-Meteo e Geocoding API).
- **Componentização:** Separação da interface em pequenas peças modulares e reaproveitáveis (React + Shadcn UI).
- **Gerenciamento de Estado Global:** Compartilhamento e controle de informações entre múltiplos componentes (Zustand).
- **Estilização e Responsividade:** Construção de layouts que se ajustam a qualquer tamanho de tela sem perder qualidade (Tailwind CSS).

## Autor

Desenvolvido por **Davi Milioli**