// "use client";
import Image from "next/image";
import {
  createClientComponentClient,
  createServerComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);
  // const router = useRouter();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  // const supabase = createClientComponentClient();

  // useEffect(() => {
  //   const getUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     setUser(user);
  //     setLoading(false);
  //   };
  //   getUser();
  //   () => {};
  // }, []);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const logOutUser = async () => {
  //   await supabase.auth.signOut();
  // };

  console.log("asdf", user);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {!user ? (
        <div>
          <Link href={"/auth/login"}>LOGIN HERE</Link>
        </div>
      ) : (
        <div>
          <Link href={"/auth/login"}>LOGOUT HERE</Link>
        </div>
      )}
    </main>
  );
}
