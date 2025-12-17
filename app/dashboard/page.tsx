import { logout } from "@/actions/auth";
import AnnouncementComponent from "@/components/announcement";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Suspense fallback={<p>Loading UI ...</p>}>
        <main className="min-h-screen bg-gray-50 flex flex-col px-4 py-2 text-black">
          <div className="flex items-center gap-4 bg-indigo-500 text-white p-4 rounded-lg shadow-md mb-4">
            <div className="h-16 w-16 p-2 bg-white shadow-2xl rounded-full">
              <img src="profile.svg" alt="" />
            </div>
            <p>
              Login sebagai:
              <Suspense fallback={<p>Memuat email...</p>}>
                <b>{user?.email}</b>
              </Suspense>
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

          <Suspense fallback={<p>Memuat announcements...</p>}>
            <AnnouncementComponent />
          </Suspense>
        </main>
      </Suspense>
    </>
  );
}
