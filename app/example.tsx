"use client";


import {
  useCreateThread,
  useThreads,
} from "@liveblocks/react/suspense";

import { Thread } from "@liveblocks/react-ui";
import { Composer } from "@/components/composer";

/**
 * Displays a list of threads, each allowing comment replies, along
 * with a composer for creating new threads.
 */

export default function Example() {
  const { threads } = useThreads();
  const createThread = useCreateThread();

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-16">
      {threads.map((thread) => {
        return (
          <Thread
            key={thread.id}
            thread={thread}
            className="rounded-xl bg-white shadow-md"
          />
        );
      })}
      <Composer
        onComposerSubmit={({ body, attachments }) => {
          createThread({ body, attachments });
        }}
        className="rounded-xl bg-white shadow-md"
      />
    </main>
  );
}
