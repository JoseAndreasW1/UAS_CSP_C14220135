"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";


export async function register(prevState: { error: string } | null, formData: FormData): Promise<{ error: string } | null>  {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };
  redirect("/login");
}

export async function login(prevState: { error: string } | null, formData: FormData): Promise<{ error: string } | null>  {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  
  redirect("/login");
}
