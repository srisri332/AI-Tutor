"use client";
import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import { LampContainer } from "@/app/components/acernity/Lamp";
import { Button } from "@/components/ui/button";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthApiError } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export default function Login() {
  const { toast } = useToast();
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
      if (user) {
        redirect("/pages/dashboard");
      }
      setLoading(false);
    };
    getUser();
    () => {};
  }, []);

  const redirect = (path: string) => {
    router.push(path);
  };

  const clearInputFields = async () => {
    setEmail("");
    setPassword("");
  };

  const invalidCredToast = () => {
    toast({
      title: "Invalid email and password",
      variant: "destructive",
    });
  };

  const enterEmailToReset = () => {
    toast({
      title: "Enter your email to reset password",
      variant: "destructive",
    });
  };

  const checkEmailForResetLink = () => {
    toast({
      title: "Check your email for reset link",
    });
  };

  const serverErrorToast = () => {
    toast({
      title: "Server Error",
      variant: "destructive",
    });
  };

  const handleUserJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      invalidCredToast();
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error?.message === "Invalid login credentials") {
        invalidCredToast();
      } else {
        serverErrorToast();
      }
      return;
    }
    router.refresh();
    clearInputFields();
    redirectOnDemand();
  };

  // const handleResetPassword = async () => {
  //   if (!email) {
  //     enterEmailToReset();
  //     return;
  //   }
  //   const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  //     redirectTo: "http://localhost:3000/auth/reset",
  //   });
  //   if (error) {
  //     serverErrorToast();
  //     return;
  //   }
  //   checkEmailForResetLink();
  // };

  const redirectOnDemand = async () => {
    const userAlreadyHasPreferences = await checkIfUserAlreadyHasPreferences();
    redirect(
      userAlreadyHasPreferences ? "/pages/dashboard" : "/pages/planning"
    );
  };

  const checkIfUserAlreadyHasPreferences = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/skills",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    console.log("asdf response", response);
    if (response.data.length > 0) {
      console.log("asdf came here");
      return true;
    }
    return false;
  };

  if (loading) {
    return (
      <div>
        <LampContainer className="pt-32">
          <motion.div
            initial={{ opacity: 0.5, y: 150 }}
            whileInView={{ opacity: 1, y: 150 }}
            className="w-80 h-[22rem] bg-opacity-35 mx-auto my-auto tracking-tight rounded-none md:rounded-3xl sm:rounded-3xl p-24 md:p-10 shadow-input bg-slate-50  dark:bg-black pt-32"
          ></motion.div>
        </LampContainer>
      </div>
    );
  }

  if (user) {
    redirect("/");
  }

  return (
    <div>
      <LampContainer className="pt-32">
        <motion.div
          initial={{ opacity: 0.5, y: 300 }}
          whileInView={{ opacity: 1, y: 150 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="w-80 h-[22rem] dark:bg-opacity-85 mx-auto my-auto tracking-tight rounded-none md:rounded-3xl sm:rounded-3xl p-24 md:p-10 shadow-input bg-slate-50  dark:bg-black/50 pt-32 isolate aspect-video  bg-white/20 shadow-md ring-1 ring-black/5  backdrop-filter backdrop-blur-lg "
        >
          <form className="my-6" onSubmit={handleUserJoin}>
            <LabelInputContainer className="mb-4 ">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="spiderman@gmail.com"
                type="email"
                className="backdrop-filter backdrop-blur-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                className="backdrop-filter backdrop-blur-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>
            {/* <div
              className="text-xs underline z-10"
              onClick={(e) => handleResetPassword()}
            >
              Reset Password
            </div> */}
            <button
              className="bg-gradient-to-br mt-8 relative group/btn from-white dark:from-white dark:to-white  block dark:bg-zinc-800 w-full dark:text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Practice &rarr;
              <BottomGradient />
            </button>
          </form>
        </motion.div>
      </LampContainer>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
