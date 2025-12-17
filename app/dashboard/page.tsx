import { logout } from "@/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at");

  return (
    <>
      <main className="min-h-screen bg-gray-50 flex flex-col px-4 py-2 text-black">
        <div className="flex items-center gap-4 bg-indigo-500 text-white p-4 rounded-lg shadow-md mb-4">
          <div className="h-16 w-16 p-2 bg-white shadow-2xl rounded-full">
            <img src="profile.svg" alt="" />
          </div>
          <p>
            Login sebagai: <b>{user?.email}</b>
          </p>
          <form action={logout} className="ml-auto">
            <button
              type="submit"
              className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center space-y-12">
          {announcements?.map((a) => (
            <div
              key={a.id}
              className="w-full h-96 bg-white rounded-lg shadow-2xl text-black flex flex-col justify-between"
            >
            <div className=" bg-blue-400 text-white font-bold p-4 rounded-t-lg"> 
              <h2 className="font-bold">{a.title}</h2>
            </div>
              <p className="p-4">{a.content}</p>
              <div></div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
