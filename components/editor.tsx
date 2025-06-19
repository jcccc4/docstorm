"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { ToolbarPlugin } from "@/app/plugin/ToolbarPlugin";

import {
  liveblocksConfig,
  LiveblocksPlugin,
  FloatingToolbar,
} from "@liveblocks/react-lexical";
import { Threads } from "@/app/threads";
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
export default function Editor() {
  const initialConfig = liveblocksConfig({
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode],
  });

  return (

          <div className="x-10 relative flex h-screen w-screen flex-col items-center pt-16">
            <LexicalComposer initialConfig={initialConfig}>
              <ToolbarPlugin />
              <ListPlugin />
              <HistoryPlugin />
              <div className="relative w-full max-w-[1120px]">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable
                      className="relative min-h-[150px] resize-none bg-white p-[15px_10px] text-[15px] caret-[#444] outline-none [tab-size:1]"
                      aria-placeholder={"Enter some text..."}
                      placeholder={
                        <div className="pointer-events-none absolute top-[15px] left-[10px] inline-block overflow-hidden text-[15px] text-ellipsis text-[#999] select-none">
                          Enter some text...
                        </div>
                      }
                    />
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <LiveblocksPlugin>
                   <Threads />
                  <FloatingToolbar />
                </LiveblocksPlugin>
              </div>
            </LexicalComposer>
          </div>

  );
}
