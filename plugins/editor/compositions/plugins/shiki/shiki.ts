/**
 * @description copy from milkdown shiki demo
 *              @link  https://stackblitz.com/github/Milkdown/examples/tree/main/vanilla-shiki-highlight?file=src%2Fshiki.ts
 * @author 阿怪
 * @date 2023/12/11 16:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import type { Highlighter } from 'shiki';
import { getHighlighter } from 'shiki';
import { $proseAsync } from '@milkdown/utils';
import { Node } from '@milkdown/prose/model';
import { Plugin, PluginKey } from '@milkdown/prose/state';
import { Decoration, DecorationSet } from '@milkdown/prose/view';
import { findChildren } from '@milkdown/prose';
import { codeBlockSchema } from '@milkdown/preset-commonmark';
import ShuimoTheme from '~/plugins/editor/compositions/plugins/shiki/shuimo.theme';

function getDecorations(ctx: any, doc: Node, highlighter: Highlighter) {
  const decorations: Decoration[] = [];

  const children = findChildren((node) => node.type === codeBlockSchema.type(ctx))(doc);
  children.forEach(async (block) => {
    let from = block.pos + 1;
    const { language } = block.node.attrs;
    if (!language) return;
    const nodes = highlighter
      .codeToThemedTokens(block.node.textContent, { lang: language })
      .map((token) =>
        token.map(({ content, color }) => ({ content, color })));
    // console.log(nodes);
    nodes.forEach((block) => {
      block.forEach((node) => {
        const to = from + node.content.length;
        const decoration = Decoration.inline(from, to, {
          style: `color: ${node.color}`
        });
        decorations.push(decoration);
        from = to;
      });
      from += 1;
    });
  });

  return DecorationSet.create(doc, decorations);
}

export const milkShiki = $proseAsync(async (ctx) => {

  const highlighter = await getHighlighter({
    themes: [ShuimoTheme],
    langs: [
      'javascript', 'js', 'jsx',
      'typescript', 'ts', 'tsx',
      'wasm',
      'vue',
      'markdown',
      'shell', 'awk',
      'java',
      'rust',
      'sql',
      'json', 'json5',
      'c',
      'html','css'
    ]
  });
  const key = new PluginKey('shiki');

  return new Plugin({
    key,
    state: {
      init: (_, { doc }) => getDecorations(ctx, doc, highlighter),
      apply: (tr, value, oldState, newState) => {
        const codeBlockType = codeBlockSchema.type(ctx);
        const isNodeName = newState.selection.$head.parent.type === codeBlockType;
        const isPreviousNodeName = oldState.selection.$head.parent.type === codeBlockType;
        const oldNode = findChildren((node) => node.type === codeBlockType)(oldState.doc);
        const newNode = findChildren((node) => node.type === codeBlockType)(newState.doc);

        const codeBlockChanged =
          tr.docChanged &&
          (isNodeName ||
            isPreviousNodeName ||
            oldNode.length !== newNode.length ||
            oldNode[0]?.node.attrs.language !== newNode[0]?.node.attrs.language);

        if (codeBlockChanged) {
          return getDecorations(ctx, tr.doc, highlighter);
        }

        return value.map(tr.mapping, tr.doc);
      }
    },
    props: {
      decorations(state) {
        return key.getState(state);
      }
    }
  });
});
