"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { skills } from "@/app/utils/skills";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { checkIfUserAlreadyHasPreferences } from "@/app/utils/internal-request";

export default function Planning() {
  const [value, setValue] = React.useState<Option[]>([]);
  const [experience, setExperience] = useState(3);
  const [duration, setDuration] = useState(2);
  const [questions, setQuestions] = useState(1);
  const router = useRouter();
  const { toast } = useToast();
  const redirect = (path: string) => {
    router.push(path);
  };

  const selectSkills = () => {
    toast({
      title: "Please select at least one skill",
      variant: "destructive",
    });
  };

  useEffect(() => {
    const check = async () => {
      const res = await checkIfUserAlreadyHasPreferences();
      console.log("check", res);
      if (res) redirect("/pages/dashboard");
      return res;
    };
    check();
    return () => {};
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value?.length === 0) {
      selectSkills();
      return;
    }

    let data = JSON.stringify({
      experience,
      skills: value.map((e) => e.label).join(","),
      weeks: duration,
      questions,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${window?.location?.origin}/api/debut`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    if (response && response?.data?.message === "success") {
      router.push("/pages/dashboard");
    }
  };
  const OPTIONS: Option[] = skills;

  return (
    <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
        Tell About Yourself
      </h2>
      <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
        The study plan will be based on the details you enter.
      </p>

      <form className='my-8' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <Label htmlFor='skills'>Skills</Label>
          <div className='my-4'>
            <MultipleSelector
              defaultOptions={OPTIONS}
              placeholder='Type something that does not exist in dropdowns...'
              value={value}
              onChange={setValue}
              creatable
            />
          </div>
        </div>
        <div className='mb-4'>
          <Label htmlFor='experience'>Experience</Label>
          <div className='flex flex-col md:flex-row md:space-y-0 md:space-x-2 my-4'>
            <Slider
              className='mr-2'
              defaultValue={[experience]}
              max={20}
              step={1}
              onValueChange={(e) => {
                setExperience(e[0]);
              }}
            />
            <Label
              htmlFor='experiencevalue'
              className='w-24'>{`${experience} Years`}</Label>
          </div>
        </div>
        <div className='mb-4'>
          <Label htmlFor='duration'>Course Duration</Label>
          <div className='flex flex-col md:flex-row md:space-y-0 md:space-x-2 my-4'>
            <Slider
              className='mr-2'
              defaultValue={[duration]}
              max={4}
              step={1}
              onValueChange={(e) => {
                setDuration(e[0]);
              }}
            />
            <Label
              htmlFor='durationvalue'
              className='w-24'>{`${duration} Weeks`}</Label>
          </div>
        </div>
        <div className='mb-8'>
          <Label htmlFor='questions'>Questions per week</Label>
          <div className='flex flex-col md:flex-row md:space-y-0 md:space-x-2 my-4'>
            <Slider
              className='mr-2'
              defaultValue={[questions]}
              max={10}
              step={1}
              onValueChange={(e) => {
                setQuestions(e[0]);
              }}
            />
            <Label htmlFor='questionsvalue' className='w-24'>
              {`${questions} Ques.`}
            </Label>
          </div>
        </div>

        <button
          className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
          type='submit'>
          Let&apos;s Get Started &rarr;
          <BottomGradient />
        </button>

        <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
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
