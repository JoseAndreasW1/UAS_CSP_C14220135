import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AnnouncementComponent() {
  const supabase = await createSupabaseServerClient();

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col items-center space-y-12">
      {announcements?.map((a) => (
        <div
          key={a.id}
          className="w-full h-96 bg-white rounded-lg shadow-2xl text-black flex flex-col justify-between"
        >
          <div className="bg-blue-400 text-white font-bold p-4 rounded-t-lg">
            <h2>{a.title}</h2>
          </div>

          <p className="p-4">{a.content}</p>

          <div />
        </div>
      ))}
    </div>
  );
}
