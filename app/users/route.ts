import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userIds = searchParams.getAll("userIds");

  if (!userIds || !Array.isArray(userIds)) {
    return new NextResponse("Missing or invalid userIds", { status: 400 });
  }

  const supabase = await createClient();

  const { data: usernames, error } = await supabase
    .from("profiles")
    .select("name, avatar_url")
    .in("name", userIds);

  if (error) {
    console.error("Supabase query error:", error);
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(
    usernames.map(({ name, avatar_url }) => {
      return {
        name,
        avatar: avatar_url,
      };
    }),
    { status: 200 },
  );
}
