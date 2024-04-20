"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    skillname: string;
  };
}

function Page({ params }: PageProps) {
  const [weeklyQuestions, setWeeklyQuestions]: any = useState([]);
  const router = useRouter();

  useEffect(() => {
    let data = JSON.stringify({
      skill: `${params.skillname}`,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/questions",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setWeeklyQuestions([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.skillname]);

  if (weeklyQuestions.length < 1) return <div>Loading...</div>;

  return (
    <div className='flex flex-col justify-center items-center min-w-screen min-h-max '>
      <Button
        onClick={() => {
          router.back();
        }}
        className='absolute left-0 top-0 m-5'>
        back
      </Button>
      <div>
        <p className='text-3xl font-bold mt-10'>{params.skillname}</p>
      </div>

      {weeklyQuestions.map((week: any) => {
        return (
          <div
            key={week.week}
            className=' w-3/4 min-h-max mt-5 mb-5 bg-slate-900 p-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-md shadow-gray-900'>
            <p className='text-2xl font-bold mb-2'>{week.week}</p>
            {week.questions.map((question: any) => {
              return (
                <Accordion
                  type='single'
                  collapsible
                  className='w-full'
                  key={question}>
                  <AccordionItem value='item-1'>
                    <AccordionTrigger>{question.question}</AccordionTrigger>
                    <AccordionContent>
                      <div className='grid w-full gap-2'>
                        <Textarea placeholder='Type your answer here' />
                        <Button>Submit Answer</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Page;
