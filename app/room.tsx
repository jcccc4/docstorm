"use client";

import Editor from "@/components/editor";
import { LogoutButton } from "@/components/logout-button";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useSearchParams } from "next/navigation";
import Example from "./example";

// Learn how to structure your collaborative Next.js app
// https://liveblocks.io/docs/guides/how-to-use-liveblocks-with-nextjs-app-directory

export default function Room() {
  const roomId = useExampleRoomId("liveblocks:examples:nextjs-lexical");

  return (
    <LiveblocksProvider
      authEndpoint="/auth/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        if (userIds.length === 0) {
          return [];
        }

        const searchParams = new URLSearchParams(
          userIds.map((userId) => ["userIds", userId]),
        );

        const response = await fetch(`/users?${searchParams}`);

        if (!response.ok) {
          throw new Error("Problem resolving users");
        }
        
        const users = await response.json();

        return users;
      }}
      resolveMentionSuggestions={async ({ text }) => {
        const response = await fetch(
          `/users/search?text=${encodeURIComponent(text)}`,
        );

        if (!response.ok) {
          throw new Error("Problem resolving mention suggestions");
        }

        const userIds = await response.json();

        return userIds;
      }}
    >
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null,
        }}
      >
        <ClientSideSuspense fallback={<div>Loading...</div>}>
          <Editor />
          <Example />
          <LogoutButton />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useExampleRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params?.get("exampleId");
  return exampleId ? `${roomId}-${exampleId}` : roomId;
}
