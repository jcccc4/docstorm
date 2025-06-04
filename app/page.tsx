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
import BannerPlugin, { BannerNode } from "./plugin/BannerPlugin";

const theme = {
  // Theme styling goes here
  ltr: "test",
  rtl: "test-right",
  paragraph: "editor-paragraph",
  heading: {
    h1: "editor-h1",
    h2: "editor-h2",
    h3: "editor-h3",
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
    nodes: [HeadingNode, ListNode, ListItemNode, BannerNode],
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative h-[500px] w-full px-4">
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <BannerPlugin />
          <ListPlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="relative h-full w-full border border-solid border-white px-2 py-2"
                aria-placeholder={"Enter some text..."}
                placeholder={
                  <div className="absolute top-11 left-6">
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
