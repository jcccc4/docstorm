import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  EditorConfig,
  ElementNode,
  LexicalNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { JSX } from "react";

export class BannerNode extends ElementNode {
  // Required constructor
  constructor(key?: string) {
    super(key);
  }
  static getType(): string {
    return "banner";
  }
  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement("div");
    element.className = config.theme.banner;
    return element;
  }
  updateDOM(prevNode: BannerNode, dom: HTMLElement, config: EditorConfig): boolean {
    return false;
  }
}

export function $createBannerNode(): BannerNode {
  return new BannerNode();
}

export function $isBannerNode(node: LexicalNode): node is BannerNode {
  return node instanceof BannerNode;
}

export const INSERT_BANNER_COMMAND = createCommand("insertBanner");
export function BannerPlugin(): null {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([BannerNode])) {
    throw new Error("BannerPlugin: BannerNode not registered on editor");
  }
  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createBannerNode());
      }
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );
  return null;
}

export default BannerPlugin;
