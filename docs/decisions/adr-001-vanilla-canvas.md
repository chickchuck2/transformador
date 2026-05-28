# ADR 001 - Vanilla JavaScript com Canvas 2D

## Status

Aceita.

## Contexto

O projeto parte de documentos conceituais e precisa de uma primeira versao executavel, fluida, sem custo de setup alto e com controle total da renderizacao.

## Decisao

Usar HTML, CSS e JavaScript modular com Canvas 2D. O app deve rodar como site estatico servido localmente.

## Consequencias

- Baixa friccao para abrir e iterar.
- Sem dependencia inicial de bundler.
- Boa performance para particulas, nucleo e osciloscopio.
- Testes unitarios formais podem ser adicionados depois com runner dedicado.
