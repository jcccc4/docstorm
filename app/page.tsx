"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { EditorState } from "lexical";
import { use, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { on } from "events";

const theme = {
  // Theme styling goes here
  //...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

export default function Home() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  function MyOnChangePlugin(props: {
    onChange: (editor: EditorState) => void;
  }) {
    const [editor] = useLexicalComposerContext();
    const { onChange } = props;
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      });
    }, [onChange]);
    return null;
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative h-[500px] w-full px-4">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="relative h-full w-full border border-solid border-white px-2 py-4"
                aria-placeholder={"Enter some text..."}
                placeholder={
                  <div className="absolute top-4 left-6">
                    Enter some text...
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />
          <MyOnChangePlugin
            onChange={(editorState) => console.log(editorState)}
          />
        </LexicalComposer>
      </div>
    </div>
  );
}
