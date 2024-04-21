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
    <div className="bg-black h-screen">
      {/* // <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      <nav
        // className="sticky bg-white top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 bg-white/20 shadow-md ring-1 ring-black/5  backdrop-filter backdrop-blur-lg"
        className="sticky h-24 w-screen top-0 dark:bg-opacity-45 mx-auto my-auto rounded-none pt-5 shadow-input bg-slate-50  dark:bg-white/5 bg-white/20 shadow-md ring-1 ring-black/5 backdrop-filter backdrop-blur-lg"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-white font-semibold">AI Tutor</span>
            <div className="flex space-x-4 text-white">
              <a href="#">Dashboard</a>
              <a href="#">About</a>
              <a href="#">Projects</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-grey-100">
        <BentoGrid className="max-w-4xl h-10 py-10 mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
      {/* {!user ? (
        <div>
          <Link href={"/auth/login"}>LOGIN HERE</Link>
        </div>
      ) : (
        <div>
          <Button onClick={logOutUser}>Sign Out</Button>
        </div>
      )} */}
      {/* </main> */}
    </div>
  );
}

const Skeleton = () => (
  // <div className="flex bg-test-image flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
  <div></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    className: "md:col-span-1 dark:bg-black",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
