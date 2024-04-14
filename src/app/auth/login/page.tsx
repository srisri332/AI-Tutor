"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  const reRoute = () => {
    router.push("/");
  };

  const clearInputFields = async () => {
    setEmail("");
    setPassword("");
  };

  const handleUserSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    router.refresh();
    setUser(data.user);
    clearInputFields();
    reRoute()
  };

  const handleUserSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
    setUser(data.user);
    clearInputFields();
    reRoute();
  };

  const logOutUser = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div>
        <Button onClick={logOutUser}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div>
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      ></Input>

      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <Button onClick={handleUserSignUp}>Sign Up</Button>
      <Button onClick={handleUserSignIn}>Sign In</Button>
    </div>
  );
}
