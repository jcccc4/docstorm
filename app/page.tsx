import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";

import Room from "./room";


// Learn how to structure your collaborative Next.js app
// https://liveblocks.io/docs/guides/how-to-use-liveblocks-with-nextjs-app-directory

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  return (
    <Room />
  );
}
