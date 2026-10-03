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

Não há dependências NPM nem etapa de build. As bibliotecas externas utilizadas são Google Fonts e Bootstrap Icons, carregadas por CDN.

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

## Acessibilidade

A interface utiliza HTML semântico, headings organizados, textos alternativos nas imagens, rótulos associados aos campos e atributos ARIA na navegação. O link para pular ao conteúdo, o foco visível, a navegação por teclado, o fechamento do menu com `Escape` e o retorno do foco ao botão do menu foram verificados manualmente. Também foram realizados testes com zoom de 220% nos projetos e nos três formulários, sem sobreposição ou rolagem horizontal. A página inicial obteve 100 pontos no relatório de acessibilidade do Lighthouse.

## Otimização

A imagem principal possui versão WebP e dimensões declaradas no HTML para reduzir mudanças de layout. O carregamento da imagem principal utiliza prioridade alta e decodificação assíncrona. O logotipo do rodapé utiliza carregamento tardio e decodificação assíncrona. A aplicação mantém os arquivos estáticos organizados e não utiliza dependências de build.

## Deploy

O projeto está publicado no GitHub Pages:

<https://ronaldgeiner.github.io/ConectaJovem/index.html#/inicio>

O roteamento por hash permite que as rotas da SPA funcionem em uma hospedagem estática. Após o envio de alterações para a branch `main`, o GitHub Pages atualiza a versão publicada.

## Versionamento

O repositório utiliza GitFlow, com `main` para versões estáveis, `develop` para integração e branches `feature/` para alterações isoladas. As entregas são registradas com commits semânticos, pull requests e versionamento semântico. A primeira versão consolidada foi identificada pela tag `v1.0.0`.
