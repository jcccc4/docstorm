"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { ToolbarPlugin } from "./plugin/ToolbarPlugin";

const theme = {
  // Theme styling goes here
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "editor-paragraph",
  heading: {
    h1: "editor-h1",
    h2: "editor-h2",
    h3: "editor-h3",
  },
  text: {
    bold: "editor-text-bold",
    code: "editor-text-code",
    hashtag: "editor-text-hashtag",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    strikethrough: "editor-text-strikethrough",
    underline: "editor-text-underline",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
  },
  banner: "editor-banner",
};

function onError(error: Error) {
  console.error(error);
}
export default function Home() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode],
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center pt-16">
      <div className="relative h-[500px] w-full max-w-[1120px] px-4">
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <ListPlugin />
          <HistoryPlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="relative mt-2 h-full w-full border border-solid border-white px-2 py-2"
                aria-placeholder={"Enter some text..."}
                placeholder={
                  <div className="absolute top-15 left-6">
                    Enter some text...
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />
        </LexicalComposer>
      </div>
    </div>
  );
}
