import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { JSX } from "react";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Headings = Object.freeze({
  H1: "h1",
  H2: "h2",
  H3: "h3",
});
export type HeadingKey = keyof typeof Headings;
function HeadingToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const onClick = (tag: HeadingTagType): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => onClick(Headings.H1)}
        key={Headings.H1}
      >
        <Heading1 />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onClick(Headings.H2)}
        key={Headings.H2}
      >
        <Heading2 />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onClick(Headings.H3)}
        key={Headings.H3}
      >
        <Heading3 />
      </Button>
    </div>
  );
}

function HistoryToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Undo2 />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Redo2 />
      </Button>
    </div>
  );
}

function FormatElementToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
      >
        <AlignLeft />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
      >
        <AlignCenter />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
      >
        <AlignRight />
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
      >
        <AlignJustify />
      </Button>
    </div>
  );
}

function FormatTextToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <Bold />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <Italic />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <Underline />
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
      >
        <Strikethrough />
      </Button>
    </div>
  );
}

export function ToolbarPlugin(): JSX.Element {
  return (
    <div className="flex justify-left items-center gap-4 h-11 p-2  bg-primary-foreground rounded-sm">
      <HistoryToolbarPlugin />
      <Separator orientation="vertical"/>
      <HeadingToolbarPlugin />
      <Separator orientation="vertical" />
      <FormatTextToolbarPlugin />
      <Separator orientation="vertical" />
      <FormatElementToolbarPlugin />
    </div>
  );
}
