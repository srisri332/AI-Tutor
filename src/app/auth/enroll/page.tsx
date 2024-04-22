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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
      title: "Invalid Email and Password",
      variant: "destructive",
    });
  };

  const userExistsToast = () => {
    toast({
      title: "Email Already Exists",
      variant: "destructive",
    });
  };

  const weakPasswordToast = () => {
    toast({
      title: "Weak Password",
      description: "Please create a stronger password.",
      variant: "destructive",
    });
  };

  const serverErrorToast = () => {
    toast({
      title: "Server Error",
      variant: "destructive",
    });
  };

  const emailAlreadyExists = () => {
    toast({
      title: "Email Already Exists",
      description: "Please login or try enrolling with a different email.",
      variant: "destructive",
    });
  };

  const checkEmailForVerificationLink = () => {
    toast({
      title: "Verification Link Sent",
      description: "Please check your email, this may take a few minutes.",
    });
  };

  const handleUserEnroll = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      invalidCredToast();
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: name,
        },
        emailRedirectTo: `${window?.location?.origin}/auth/callback`,
      },
    });
    if (data?.user?.identities?.length === 0) {
      emailAlreadyExists();
      return;
    }
    if (error) {
      if (error.message === "User already registered") {
        userExistsToast();
      } else if (error?.code === "weak_password") {
        weakPasswordToast();
      } else {
        serverErrorToast();
      }
      return;
    } else {
      checkEmailForVerificationLink();
    }
    // clearInputFields();
    router.refresh();
    setTimeout(() => {
      redirect("/");
    }, 5000);
  };

  if (loading) {
    return (
      <div>
        <LampContainer className="pt-32">
          <motion.div
            initial={{ opacity: 0.5, y: 150 }}
            whileInView={{ opacity: 1, y: 150 }}
            className="w-80 h-[26rem] bg-opacity-35 mx-auto my-auto tracking-tight rounded-none md:rounded-3xl sm:rounded-3xl p-24 md:p-10 shadow-input bg-slate-50  dark:bg-black pt-32"
          ></motion.div>
        </LampContainer>
      </div>
    );
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
          className="w-80 h-[26rem] dark:bg-opacity-85 mx-auto my-auto tracking-tight rounded-none md:rounded-3xl sm:rounded-3xl p-24 md:p-10 shadow-input bg-slate-50  dark:bg-black/50 pt-32 isolate aspect-video  bg-white/20 shadow-md ring-1 ring-black/5  backdrop-filter backdrop-blur-lg "
        >
          <form className="my-6" onSubmit={handleUserEnroll}>
            <LabelInputContainer className="mb-4 ">
              <Label htmlFor="name">Given Name</Label>
              <Input
                id="name"
                placeholder="Peter Parker"
                type="text"
                className="backdrop-filter backdrop-blur-lg"
                onChange={(e) => setName(e.target.value)}
              />
            </LabelInputContainer>
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
            <button
              className="bg-gradient-to-br mt-8 relative group/btn from-white dark:from-white dark:to-white  block dark:bg-zinc-800 w-full dark:text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Join &rarr;
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
