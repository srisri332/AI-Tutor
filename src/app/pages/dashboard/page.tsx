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

function Dashboard() {
  const [plans, setPlan]: any = useState([]);
  const [user, setUser] = useState<User | null>(null);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function navigateToSkillPage(skill: string) {
    router.push(`/pages/skill/${skill}`);
    console.log(skill);
  }

  return (
    <>
      {user !== undefined && user != null ? (
        <>
          <div className='flex justify-around mt-10 '>
            <span>
              <p className='text-4xl font-bold'>Hello User!</p>
              <p className='text-lg'>Pick a study-plan</p>
            </span>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <hr />
          <div className='flex justify-center '>
            <div className=' w-3/4 min-h-max  rounded-lg container  grid grid-cols-3'>
              {/* <div className='container m-auto grid grid-cols-3'> */}

              {plans.map((plan: any) => {
                return (
                  <div key={plan}>
                    <Card className='w-[250px] ml-10 mt-5'>
                      <CardHeader>
                        <CardTitle>{plan}</CardTitle>
                        <CardDescription>Everybody hates it</CardDescription>
                      </CardHeader>
                      {/* <CardContent><p>Card Content</p></CardContent> */}
                      <CardFooter>
                        <Button onClick={() => navigateToSkillPage(plan)}>
                          Practice
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className='flex justify-center align-middle min-h-screen min-w-screen'>
          <p>Sanka Naaku. Login Avvu mundu.</p>
        </div>
      )}
    </>
  );
}

export default Dashboard;
