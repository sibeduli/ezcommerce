"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyPassword, createSession, logout } from "@/lib/auth";

export async function loginAction(
  lang: string,
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  await createSession(user.id);

  redirect(`/${lang}/dashboard`);
}

export async function logoutAction(lang: string) {
  await logout();
  redirect(`/${lang}/login`);
}
