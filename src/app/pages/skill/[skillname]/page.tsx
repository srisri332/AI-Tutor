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

interface PageProps {
  params: {
    skillname: string;
  };
}

function AccordionDemo() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function Page({ params }: PageProps) {
  const [weeklyQuestions, setWeeklyQuestions]: any = useState([]);
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
      <div>
        <p className='text-3xl font-bold mt-10'>{params.skillname}</p>
      </div>

      {weeklyQuestions.map((week: any) => {
        console.log(week.questions);
        return (
          <div
            key={week.week}
            className=' w-3/4 min-h-max mt-5 mb-5 dark:bg-black/30 p-10 backdrop-filter backdrop-blur-lg '>
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
