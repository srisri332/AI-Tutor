"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Underdog } from "next/font/google";
import { useRouter } from "next/navigation";
import { BackgroundBeams } from "@/app/components/acernity/background-beams";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { skills as allSkills } from "@/app/utils/skills";

function Dashboard() {
  const [plans, setPlan]: any = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const [puns, setPuns]: any = useState({});

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    axios
      .get("http://localhost:3000/api/skills")
      .then((data: any) => {
        // the data of skills should be comma separated values
        let skills = data.data[0].skills.replace(/\s+/g, "").split(",");
        setPlan([...skills]);

        let temp: any = {};
        Promise.all(
          allSkills.map((skill: any) => {
            if (skills.includes(skill.value)) {
              temp[skill.value] = skill.pun;
            }
          })
        );
        // console.log(temp);
        setPuns(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function navigateToSkillPage(skill: string) {
    router.push(`/pages/skill/${skill}`);
    //     console.log(skill);
  }

  async function signOutUser() {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
    setUser(null);
  }

  return (
    <>
      <>
        {user !== undefined && user != null && puns != undefined ? (
          <>
            <div className='flex justify-around mt-10 '>
              <span>
                <p className='text-4xl font-bold'>
                  Hello {user?.user_metadata?.first_name || "User"}!
                </p>
                <p className='text-lg'>Pick a study-plan</p>
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant='outline' className='z-10'>
                    Open
                  </Button> */}
                  <Avatar className='z-10 hover:cursor-pointer'>
                    <AvatarImage
                      src='https://github.com/shadcn.png'
                      alt='@shadcn'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  {/* <DropdownMenuItem>My Account</DropdownMenuItem> */}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuItem onClick={signOutUser}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <hr />
            <div className='flex justify-center '>
              <div className=' w-3/4 min-h-max  rounded-lg container  grid grid-cols-3'>
                {/* <div className='container m-auto grid grid-cols-3'> */}

                {plans.map((plan: any) => {
                  return (
                    <div key={plan}>
                      <Card className='w-[250px] ml-10 mt-5 bg-slate-800'>
                        <CardHeader>
                          <CardTitle>{plan}</CardTitle>
                          <CardDescription>{puns[plan]}</CardDescription>
                        </CardHeader>
                        {/* <CardContent><p>Card Content</p></CardContent> */}
                        <CardFooter>
                          <Button
                            className='z-10  w-full'
                            onClick={() => navigateToSkillPage(plan)}>
                            Practice
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })}
              </div>
              <BackgroundBeams />
            </div>
          </>
        ) : (
          <div className='h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased'>
            <div className='max-w-2xl mx-auto p-4'>Loading...</div>
          </div>
        )}
      </>
    </>
  );
}

export default Dashboard;
