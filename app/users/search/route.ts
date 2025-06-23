import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

/**
 * Returns a list of user IDs from a partial search input
 * For `resolveMentionSuggestions` in liveblocks.config.ts
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") as string;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("name")
    .ilike("name", `%${text}%`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Extract just the names from the array of objects
  const filteredUserNames = data?.map((user) => user.name) || [];
  return NextResponse.json(filteredUserNames);
}
