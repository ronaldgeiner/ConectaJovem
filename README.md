# ConectaJovem

Site institucional acadêmico desenvolvido para a ONG fictícia ConectaJovem, voltada à educação tecnológica, inclusão social e preparação de jovens para oportunidades em programação e desenvolvimento web.

## Sobre o projeto

O site apresenta a organização, seus projetos, formas de participação, voluntariado e apoio. A proposta é conectar jovens de 14 a 24 anos a conhecimentos, experiências práticas e oportunidades acadêmicas e profissionais.

Este trabalho foi desenvolvido para fins acadêmicos e utiliza informações fictícias.

## Tecnologias

- HTML5 semântico
- CSS3
- CSS Grid
- Flexbox
- JavaScript
- Google Fonts
- Bootstrap Icons por CDN

## Recursos implementados

- Design System com variáveis CSS;
- Layout responsivo;
- Grid de 12 colunas;
- Cinco breakpoints;
- Menu hambúrguer e submenu;
- Cards com ícones e badges;
- Formulário com validação local;
- Estados de foco, hover e disabled;
- Feedback visual;
- Navegação por teclado;
- Aplicação SPA com roteamento por hash;
- Templates HTML carregados com `fetch` e cache;
- Validação personalizada de formulários;
- Persistência local com `localStorage`;
- Código JavaScript organizado em módulos ES6.

## Como executar

Execute o projeto por um servidor local, como a extensão Live Server no Visual Studio Code. O servidor é necessário porque a SPA utiliza `fetch` para carregar os fragmentos HTML e os módulos JavaScript.

## Estrutura principal

- `index.html`: ponto de entrada da SPA, com cabeçalho, navegação, área principal e rodapé;
- `html/`: fragmentos das rotas carregadas dinamicamente;
- `css/`: folha de estilos e Design System;
- `imagens/`: logotipos e ilustrações;
- `js/`: módulos de navegação, templates, menu, formulários, validação e armazenamento.

## Persistência e limitações

Os formulários possuem validação personalizada e feedback visual. Após a validação, os registros são armazenados localmente no navegador pela chave `conectaJovemRegistros`, utilizando JSON. Os dados não são enviados para um servidor ou banco de dados. Em uma etapa posterior, o módulo `armazenamento.js` poderá ser substituído por uma camada de comunicação com API, mantendo as regras da interface separadas.

## Observação acadêmica

Este projeto foi desenvolvido para fins acadêmicos, com informações institucionais fictícias e sem processamento real de inscrições, voluntariado ou doações.
