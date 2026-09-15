# Renata Fonseca — acervo biográfico

Site informativo responsivo, versão 2.0.0, criado em 14/09/2026 a partir do PDF e dos arquivos fornecidos. HTML, CSS e JavaScript nativos, sem dependências de execução ou fontes remotas.

## Abrir

- Prévia autônoma: abra `preview-renata-biografia.html` no navegador. Todas as imagens, estilos e interações estão incorporados.
- Site de produção: abra `public/index.html` mantendo a pasta `public/assets`, `styles.css` e `app.js` juntos.
- Servidor local: `python3 -m http.server 3000 --directory public`.

## Desenvolvimento

- `public/styles.css`: identidade, responsividade e animações.
- `public/app.js`: menu, filtros, ampliação de imagens, navegação por teclado e progresso de leitura.
- `scripts/build.py`: conteúdo e geração do HTML. Execute `python3 scripts/build.py` após editar os textos.
- `scripts/package.py`: gera a prévia autônoma e o ZIP na pasta `dist/`.
- `docs/DESENVOLVIMENTO.md`: fontes, decisões e limitações da validação.

## GitHub e Vercel

Repositório público: https://github.com/thiagorpantojaarchitect/renata-fonseca-biografia

Para importar na Vercel: branch `main`; Root Directory = raiz; Framework Preset = Other; Output Directory = `public`; Install Command e Build Command vazios. O HTML já está gerado: não é preciso executar Python na hospedagem.

O arquivo `vercel.json` inclui cabeçalhos básicos de segurança e cache de um dia para imagens. Assets não têm cache imutável, pois os nomes não contêm hash.

## Conteúdo

Seis seções: apresentação, trajetória, iniciativas, reconhecimentos, acervo e fontes. Contém 12 registros de iniciativas e 8 fotografias na galeria. Não há formulário, coleta de dados, rastreadores ou reprodução automática.

Datas e afirmações são limitadas ao documento fornecido. Informações do material não foram verificadas independentemente. A consulta direta ao Instagram falhou; não houve extração de novos vídeos ou publicações.

## Validação

Sintaxe JavaScript, integridade das imagens, referências locais, IDs e âncoras foram conferidos. A execução visual e as interações no navegador não puderam ser validadas nesta sessão porque o navegador conectado bloqueou o acesso à prévia local. Isso não equivale a homologação em Chrome, Safari, iOS ou Android; veja a lista de verificações pendentes na documentação.

As fotografias mantêm os direitos de seus titulares. Este projeto não concede licença de reutilização sobre imagens e identidade de terceiros.
