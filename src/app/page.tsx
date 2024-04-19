"use client";
import Image from "next/image";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
    () => {};
  }, []);

  const logOutUser = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!user ? (
        <div>
          <Link href={"/auth/login"}>LOGIN HERE</Link>
        </div>
      ) : (
        <div>
          <Button onClick={logOutUser}>Sign Out</Button>
        </div>
      )}
    </main>
  );
}
