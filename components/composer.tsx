import {
  ComposerFormProps,
  Composer as ComposerPrimitive,
} from "@liveblocks/react-ui/primitives";
import clsx from "clsx";
import { Suspense } from "react";
import { Button } from "./ui/button";
// interface ComposerProps extends ComposerFormProps {
//   placeholder?: string;
//   submit?: string;
// }
// Render a custom composer that creates a thread on submit
export function Composer({ className, ...props }: ComposerFormProps) {
  return (
    <ComposerPrimitive.Form
      className={clsx(className, "flex flex-col gap-4 p-4")}
      {...props}
    >
      <ComposerPrimitive.Editor
        placeholder={"Placeholder"}
        className="prose prose-sm min-h-[theme(spacing.9)] max-w-none flex-1 rounded-md px-3 py-1.5 ring-blue-300 ring-offset-2  outline-1 -outline-offset-1 outline-gray-200 focus-visible:ring-2 [&_[data-placeholder]]:opacity-50"
        components={{
          Mention: ({ userId }) => {
            return (
              <ComposerPrimitive.Mention className="rounded bg-blue-50 px-1 py-0.5 font-semibold text-blue-500 data-[selected]:bg-blue-500 data-[selected]:text-white">
                
                <Suspense fallback={userId}>
                  <div>{userId} User</div>
                </Suspense>
              </ComposerPrimitive.Mention>
            );
          },
          MentionSuggestions: ({ userIds }) => {
            return (
              <ComposerPrimitive.Suggestions className="rounded-lg bg-white p-1 shadow-xl">
                <ComposerPrimitive.SuggestionsList>
                  {userIds.map((mention) => (
                    <ComposerPrimitive.SuggestionsListItem
                      key={mention}
                      value={mention}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm data-[selected]:bg-gray-100"
                    >
                      <Suspense
                        fallback={
                          <div className="relative aspect-square w-6 flex-none animate-pulse rounded-full bg-gray-100" />
                        }
                      >
                        <div className="relative aspect-square w-6 flex-none animate-pulse rounded-full bg-gray-100">{mention} Avatar</div>
                      </Suspense>
                      <Suspense fallback={mention}>
                        <div>{mention} User</div>
                      </Suspense>
                    </ComposerPrimitive.SuggestionsListItem>
                  ))}
                </ComposerPrimitive.SuggestionsList>
              </ComposerPrimitive.Suggestions>
            );
          },
        }}
      />
      <div className="flex gap-4 self-end">
        <ComposerPrimitive.Submit asChild>
          <Button>Send</Button>
        </ComposerPrimitive.Submit>
      </div>
    </ComposerPrimitive.Form>
  );
}
