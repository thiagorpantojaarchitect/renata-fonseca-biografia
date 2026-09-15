# Documentação de desenvolvimento — acervo biográfico

Versão 2.0.0 · 14 de setembro de 2026.

## Escopo aprovado

Versão biográfica e informativa de Renata Fonseca para web e celular. O conteúdo reúne formação, experiências profissionais, registros de iniciativas e fotografias, com atribuição ao material de referência. O desenho editorial usa azul, rosa e branco, títulos serifados e composição com retrato em arco.

## Fontes e tratamento editorial

| Fonte | Uso | Limitação |
| --- | --- | --- |
| `biografia-renata-fonseca-web.pdf`, página 1 | Retrato e reconhecimentos | Material fornecido; sem confirmação independente |
| Mesmo PDF, página 2 | Formação, serviço público e 12 iniciativas | Datas profissionais, indicadores e situação atual não informados |
| `wwwrenata-fonseca-22333.zip`, pasta `public/assets/bio` | 21 imagens WebP | Fotografias já recortadas de material diagramado, algumas com moldura e baixa resolução |
| `DESENVOLVIMENTO.md` original | Entendimento da estrutura e do problema de prévia | A documentação antiga não representa a versão biográfica atual |
| Site e Instagram indicados | Tentativa de consulta | Site não recuperado; Instagram limitou a consulta; nenhum vídeo foi importado |

O PDF é composto por duas páginas rasterizadas, sem camada de texto. As páginas foram renderizadas e lidas visualmente. Os textos novos são resumos informativos. A sequência profissional é explicitamente temática, porque a fonte não fornece datas. Os anos 2023 e 2025 aparecem apenas nas duas homenagens que os informam. Não se afirma o exercício atual de cargo eletivo.

Não foram criados números de impacto, datas, depoimentos, contatos ou resultados. Os serviços são descritos como registros do material, sem atribuição exclusiva de autoria ou garantia de funcionamento atual.

## Arquitetura

Site estático com aprimoramento progressivo. O conteúdo principal está no HTML e permanece legível sem JavaScript. CSS usa Grid, Flexbox, propriedades personalizadas e media queries. JavaScript é executado com `defer` e não usa bibliotecas externas. Python é usado somente para geração e empacotamento.

| Arquivo | Responsabilidade |
| --- | --- |
| `public/index.html` | Conteúdo semântico pré-gerado |
| `public/styles.css` | Layout, cores, tipografia e movimento |
| `public/app.js` | Interações e estados acessíveis |
| `public/assets/*.webp` | Fotografias locais |
| `public/favicon.svg` | Monograma tipográfico simples |
| `scripts/build.py` | Fonte editorial e gerador HTML |
| `scripts/package.py` | HTML autônomo e ZIP reproduzíveis |
| `vercel.json` | Diretório de saída, cache e cabeçalhos |

## Identidade

| Token | Cor | Uso |
| --- | --- | --- |
| Azul | `#142CAD` | Abertura, controles ativos |
| Azul profundo | `#122348` | Texto e reconhecimentos |
| Rosa | `#B82368` | Destaques em fundo claro |
| Rosa claro | `#FFBBD9` | Destaques em fundo escuro |
| Fundo | `#F0F2FA` | Separação editorial |

Georgia e fontes de sistema eliminam falhas e dependência de carregamento de fontes externas. A fotografia original é exibida sem alteração de rosto; o recorte visual é feito por `object-fit`.

## Responsividade

- Desktop: abertura em duas colunas, três colunas para iniciativas e quatro para a galeria.
- Até 1050 px: redução de espaçamentos e três colunas na galeria.
- Até 760 px: menu móvel, abertura vertical, seções de uma coluna e duas colunas para iniciativas.
- Até 480 px: iniciativas em uma coluna e galeria em duas colunas.
- Textos longos podem quebrar; a interface usa unidades relativas nos tamanhos de texto.

Esses comportamentos foram implementados no CSS. A renderização real em diferentes aparelhos ainda requer verificação visual.

## Interações

| Recurso | Implementação |
| --- | --- |
| Menu móvel | `aria-expanded`, foco inicial, ciclo de Tab, Escape, área principal `inert` |
| Filtros | Botões com `aria-pressed`, atributo `hidden`, contagem em região `aria-live` |
| Galeria | `dialog` nativo, imagens locais, fechamento com Escape, navegação por setas, restauração de foco |
| Entrada de blocos | `IntersectionObserver`, opacidade e deslocamento de 22 px |
| Abertura | Animação CSS discreta do texto e retrato |
| Progresso de leitura | Evento passivo de rolagem, atualização via `requestAnimationFrame` |
| Navegação ativa | Observação das seções, `aria-current="location"` |
| Fontes | Acordeões nativos `details` / `summary` |

`prefers-reduced-motion` desativa transições e animações. O texto fica visível por padrão: a ocultação inicial só é aplicada quando o observador está disponível. A troca de filtros revela imediatamente os resultados.

## Imagens e prévia autônoma

Foram conferidas as 21 imagens locais, com 22 posições no HTML por reutilização do registro profissional. O conjunto soma 590.586 bytes. As fotos secundárias usam carregamento preguiçoso, e o retrato inicial tem prioridade alta.

Abrir somente o HTML de produção em uma prévia que não leva os arquivos vizinhos pode impedir o carregamento de CSS, JavaScript e imagens. Por isso, a versão autônoma incorpora esses recursos no mesmo arquivo, inclusive as imagens usadas no diálogo. O pacote de produção mantém arquivos separados para cache e manutenção.

Não se usa hotlink de redes sociais. A resolução original do PDF limita o detalhamento; a ampliação não inventa qualidade ausente.

## Acessibilidade e privacidade

HTML em português, um H1, hierarquia de títulos, regiões semânticas, link para pular ao conteúdo, textos alternativos, foco visível e diálogo nativo. Nenhum formulário fictício, cookie de rastreamento, pixel, SDK de rede social ou backend. O link externo para Instagram só é acionado por decisão do visitante.

## Verificações executadas e pendentes

Confirmado nesta sessão:

- `node --check public/app.js` sem erro de sintaxe.
- Todas as referências locais e todas as âncoras existem.
- Nenhum ID duplicado.
- As imagens passam na decodificação com Pillow.
- Todos os elementos de imagem com fonte têm texto alternativo.
- O conteúdo foi comparado com as páginas renderizadas do PDF.

Limitação: o navegador remoto bloqueou o servidor local e o acesso a arquivo local. Não foram contornadas as restrições. Não se afirma execução bem-sucedida de menus, filtros, diálogos, auditoria de contraste ou ausência de overflow em navegador.

Antes da homologação, conferir Chrome e Safari em 390, 768 e 1366 px, zoom de 200%, navegação por Tab, menu e Escape, alternância entre os quatro filtros, abertura e navegação da galeria, preferência por movimento reduzido e carregamento das imagens na hospedagem.

## Publicação e manutenção

A pasta pode ser importada na Vercel como site estático, com saída `public`, sem instalação ou build obrigatório. A versão final do HTML já está no repositório. Alterações editoriais devem ser feitas em `scripts/build.py` e regeneradas antes do commit.

A publicação usa um repositório próprio, `thiagorpantojaarchitect/renata-fonseca-biografia`, na branch `main`. O repositório anterior do usuário permanece inalterado. A integração inicialmente recusou escrita com HTTP 403; em 15/09/2026, uma credencial fornecida pelo usuário permitiu autenticação direta na API do GitHub. Credenciais não integram arquivos, commits ou configurações persistentes do projeto. Não há mudança de domínio ou DNS nesta entrega.

Para adicionar novas fotos, usar arquivos autorizados e incluir uma legenda factual. Para vídeos futuros, usar arquivo autorizado ou URL pública verificada, com controles e poster; não presumir disponibilidade a partir do perfil do Instagram.
