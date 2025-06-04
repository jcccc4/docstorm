import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { JSX, MouseEvent } from "react";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { INSERT_BANNER_COMMAND } from "./BannerPlugin";

type HeadingTag = "h1" | "h2" | "h3";
type listTag = "ol" | "ul";

function HeadingToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const headingTags: HeadingTag[] = ["h1", "h2", "h3"];
  const onClick = (tag: HeadingTag): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };
  return (
    <div className="flex gap-2">
      {headingTags.map((tag) => (
        <Button onClick={() => onClick(tag)} key={tag}>
          {tag.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

function ListToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const listTags: listTag[] = ["ol", "ul"];

  const onClick = (tag: listTag): void => {
    if (tag === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };
  return (
    <div className="flex gap-2">
      {listTags.map((tag) => (
        <Button onClick={() => onClick(tag)} key={tag}>
          {tag.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

function BannerToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
  };
  return <Button onClick={onClick}>Banner</Button>;
}

export function ToolbarPlugin(): JSX.Element {
  return (
    <div className="flex gap-4">
      <HeadingToolbarPlugin />
      <ListToolbarPlugin />
      <BannerToolbarPlugin />
    </div>
  );
}
