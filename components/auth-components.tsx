// /components/auth-components.tsx
import { signIn, signOut } from "@/lib/auth";
import React from 'react';

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button className="bg-neutral-700 text-white p-2 rounded-md hover:bg-neutral-600 transition-colors">
        Zaloguj się z {provider}
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <button className="bg-red-600 text-white p-2 rounded-md w-full hover:bg-red-700 transition-colors">
        Wyloguj się
      </button>
    </form>
  );
}