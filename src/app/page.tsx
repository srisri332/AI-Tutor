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
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { SparklesCore } from "@/components/ui/sparkles";

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
    // <div className="bg-black h-screen">
    // <div className="h-full relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
    // <div className="relative w-full min-h-screen h-full bg-black flex flex-col items-center justify-center rounded-md">
    <div className='relative w-full min-h-screen h-full bg-black flex flex-col items-center  rounded-md'>
      <div className='w-full absolute inset-0'>
        <SparklesCore
          id='tsparticlesfullpage'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className='w-full h-full min-h-screen'
          particleColor='#FFFFFF'
        />
      </div>
      {/* <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Build great products
      </h1> */}
      <div className='bg-black h-auto'>
        <nav
          // className="sticky bg-white top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-white/20 shadow-md ring-1 ring-black/5  backdrop-filter backdrop-blur-lg"
          // className="sticky h-24 w-screen top-0 dark:bg-opacity-90 mx-auto my-auto rounded-none pt-5 shadow-input bg-slate-50  dark:bg-white/5 bg-white/20 shadow-md ring-1 ring-black/5 backdrop-filter backdrop-blur-lg"
          // className="sticky h-24 w-screen top-0 dark:bg-opacity-90 mx-auto my-auto rounded-none pt-5 shadow-input bg-slate-50  dark:bg-white/5 bg-white/20 shadow-md ring-1 ring-black/5 backdrop-filter backdrop-blur-lg"
          className='pt-10'>
          <div className='max-w-5xl mx-auto px-4'>
            <div className='flex items-center justify-between'>
              <span className='text-2xl text-white font-semibold z-10'>
                AI Tutor
              </span>
              <div className='flex space-x-4 text-white text-xl font-semibold z-10'>
                {/* <a href="/auth/login" className="underline underline-offset-4">&nbsp;Join&#160;</a> */}
                <a href='/auth/enroll' className='underline underline-offset-4'>
                  Enroll
                </a>
                <a href='/auth/login' className='underline underline-offset-4'>
                  Practice
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className='bg-grey-100 mb-10'>
          <BentoGrid className='max-w-4xl py-10 mx-auto md:auto-rows-[20rem]'>
            <TL />
            <TR />
            <BL />
            <BR />
          </BentoGrid>
        </div>
      </div>
    </div>
  );
}

const TL = () => {
  return (
    <div
      className='py-10 md:col-span-2 z-10 row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-end flex flex-col space-y-4'
      style={{
        backgroundImage:
          'url("https://necatikcl.dev/images/card-hello-background.png")',
        // 'url("/public/card-hello-background.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <div className='z-1 flex'>
        {/* <Skeleton /> */}
        <div className='group-hover/bento:translate-x-2 transition duration-200'>
          <div className='font-sans font-bold text-4xl text-neutral-600 dark:text-neutral-200 mb-2 mt-2'>
            {"Customized Study Plan"}
          </div>
          <div className='font-sans font-bold text-lg text-gray-500'>
            {
              "Our State of the art AI model creates a study plan to suite your needs based on: "
            }
            <ul className='pt-4'>
              <li>&#8226; Skills &amp; Technologies</li>
              <li>&#8226; Years of Experience</li>
              <li>&#8226; Preparation Time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const TR = () => {
  return (
    <div className='md:col-span-1 z-10 row-span-1 bg-gradient-to-br from-bentoPurpleStart via-bentoPurpleVia to-bentoPurpleStart rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4'>
      <div className='z-1 h-full'>
        {/* <Skeleton /> */}
        <div className='flex flex-col justify-evenly align-middle items-center content-center group-hover/bento:translate-x-2 transition duration-200  0 h-full rounded-lg'>
          {/* <div className='font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2'>
            {"AI"}
          </div> */}
          <Image src='/ui1.png' alt='abc' width='160' height='160' />
        </div>
      </div>
    </div>
  );
};

const BL = () => {
  return (
    <div
      className='md:col-span-1 z-10 row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-gradient-to-br from-bentoOrangeStart  to-bentoOrangeEnd dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4' // "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
      style={{
        // backgroundImage:
        //   'url("https://necatikcl.dev/images/card-hello-background.png")',
        // 'url("/public/card-hello-background.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <div className='z-1 h-full'>
        {/* <Skeleton /> */}
        <div className=' flex flex-col justify-evenly align-middle items-center content-center group-hover/bento:translate-x-2 transition duration-200 h-full'>
          <Image src='/brain.png' alt='abc' width='190' height='190' />
        </div>
      </div>
    </div>
  );
};

const BR = () => {
  return (
    <div
      className='md:col-span-2 z-10 row-span-1 rounded-xl hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden'
      style={{
        backgroundImage:
          'url("https://necatikcl.dev/images/card-skills-background.png")',
        // 'url("/public/card-hello-background.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      // https://necatikcl.dev/images/card-skills-tree-row.png
    >
      <div className='z-1 relative'>
        <div>
          <img
            src='https://necatikcl.dev/images/card-skills-tree-row.png'
            className='rotate-12 absolute -top-10 left-44 z-10 '
            width='80'
            height='80'
          />
          <img
            src='https://necatikcl.dev/images/card-skills-tree-row.png'
            className='rotate-12 absolute -top-[22rem] left-[23rem] z-10 '
            width='80'
            height='80'
          />
          <img
            src='https://necatikcl.dev/images/card-skills-tree-row.png'
            className='rotate-12 absolute -top-[57rem] left-[26.5rem] z-10 '
            width='80'
            height='80'
          />
        </div>
        <div className='group-hover/bento:translate-x-2 transition duration-200 w-2/5 pt-10 mt-5 ml-10'>
          <div className='font-sans font-bold text-2xl text-neutral-600 dark:text-neutral-200 mb-2 '>
            {"Multiple Skills "}
            &amp;
            {" Technologies"}
          </div>
          <div className='font-sans  text-lg text-gray-500'>
            {"Crack interviews with ease with the "}

            {" help of curated plans just for you!"}
          </div>
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => (
  // <div className="flex bg-test-image flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
  <div></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    className: "md:col-span-2 z-10",
    icon: <IconClipboardCopy className='h-4 w-4 text-neutral-500' />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    className: "md:col-span-1 dark:bg-black",
    icon: <IconFileBroken className='h-4 w-4 text-neutral-500' />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className='h-4 w-4 text-neutral-500' />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    className: "md:col-span-2 z-10",
    icon: <IconTableColumn className='h-4 w-4 text-neutral-500' />,
  },
];
