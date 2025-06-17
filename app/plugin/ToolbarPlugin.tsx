import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { JSX, useCallback, useEffect, useState } from "react";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";

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
function HeadingToolbarPlugin({
  editor,
}: {
  editor: LexicalEditor;
}): JSX.Element {
  const onClick = (tag: HeadingTagType): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };
  return (
    <div className="flex">
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

function HistoryToolbarPlugin({
  editor,
  canUndo,
  canRedo,
}: {
  editor: LexicalEditor;
  canUndo: boolean;
  canRedo: boolean;
}) {
  return (
    <div className="flex">
      <Button
        className={canUndo ? "" : "text-border pointer-events-none"}
        variant="ghost"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Undo2 />
      </Button>
      <Button
        className={canRedo ? "" : "text-border pointer-events-none"}
        variant="ghost"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Redo2 />
      </Button>
    </div>
  );
}

function FormatElementToolbarPlugin({ editor }: { editor: LexicalEditor }) {
  return (
    <div className="flex">
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

function FormatTextToolbarPlugin({
  editor,
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
}: {
  editor: LexicalEditor;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
}) {
  return (
    <div className="flex">
      <Button
        variant={isBold ? "default" : "ghost"}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <Bold />
      </Button>
      <Button
        variant={isItalic ? "default" : "ghost"}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <Italic />
      </Button>
      <Button
        variant={isUnderline ? "default" : "ghost"}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <Underline />
      </Button>
      <Button
        variant={isStrikethrough ? "default" : "ghost"}
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
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="justify-left border-b-border flex h-11 w-full max-w-[1120px] items-center gap-4 rounded-t-sm border bg-white p-2">
      <HistoryToolbarPlugin
        editor={editor}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <Separator orientation="vertical" className="w-2" />
      <HeadingToolbarPlugin editor={editor} />
      <Separator orientation="vertical" />
      <FormatTextToolbarPlugin
        editor={editor}
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        isStrikethrough={isStrikethrough}
      />
      <Separator orientation="vertical" />
      <FormatElementToolbarPlugin editor={editor} />
    </div>
  );
}
