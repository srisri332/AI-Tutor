"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Threads } from "openai/resources/beta/threads/threads.mjs";

interface PageProps {
  params: {
    skillname: string;
  };
}

function displayCompletedIcon(completed: boolean) {
  return completed ? (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      className='ml-3 mr-3'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z'
        fill='green'
        fillRule='evenodd'
        clipRule='evenodd'></path>
    </svg>
  ) : (
    <svg
      width='20'
      height='20'
      viewBox='0 0 15 15'
      fill='none'
      className='ml-3 mr-3'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.5 9.125C8.39746 9.125 9.125 8.39746 9.125 7.5C9.125 6.60254 8.39746 5.875 7.5 5.875C6.60254 5.875 5.875 6.60254 5.875 7.5C5.875 8.39746 6.60254 9.125 7.5 9.125ZM7.5 10.125C8.94975 10.125 10.125 8.94975 10.125 7.5C10.125 6.05025 8.94975 4.875 7.5 4.875C6.05025 4.875 4.875 6.05025 4.875 7.5C4.875 8.94975 6.05025 10.125 7.5 10.125Z'
        fill='orange'
        fillRule='evenodd'
        clipRule='evenodd'></path>
    </svg>
  );
}

function Page({ params }: PageProps) {
  const [weeklyQuestions, setWeeklyQuestions]: any = useState([]);
  const [planID, setPlanID]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  const [answer, setAnswer]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  const router = useRouter();
  const { toast } = useToast();

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
        // console.log(response.data);
        setWeeklyQuestions([...response.data.questions]);
        setPlanID(response.data.planID);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.skillname]);

  function submitAnswer(questionID: number, question: string) {
    if (!answer) {
      throw new Error("Answer is empty, please enter an answer");
    }

    const axios = require("axios");
    let data = JSON.stringify({
      plan_id: planID,
      question_id: questionID,
      question: question,
      answer: answer,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/answer",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(async (response: any) => {
        // console.log(JSON.stringify(response.data));
        if (response.data.message === "success") {
          toast({
            title: "Answer is correct",
          });
          await new Promise((r) => setTimeout(r, 2500));
          window.location.reload();
        } else {
          toast({
            title: "Answer is not correct",
            variant: "destructive",
          });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });

    console.log(planID, questionID, answer);
  }

  if (weeklyQuestions.length < 1)
    return (
      <div className='flex flex-col justify-center items-center min-w-screen min-h-screen '>
        <p className='text-3xl font-bold mt-10'></p>
        <div className=' w-3/4 min-h-40 mt-5 mb-5 bg-slate-900 p-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-md shadow-gray-900'></div>
        <div className=' w-3/4 min-h-40 mt-5 mb-5 bg-slate-900 p-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-md shadow-gray-900'></div>
      </div>
    );

  return (
    <>
      {/*  <div className='flex flex-col justify-center items-center min-w-screen min-h-max '> */}
      <div className='flex flex-col justify-center items-center min-w-screen min-h-max  dark:bg-black bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.2]'>
        {/* Radial gradient for the container to give a faded look */}
        {/* <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div> */}
        <div>
          <p className='text-4xl font-bold mt-10 text-blue-500'>
            {params.skillname}
          </p>
          {weeklyQuestions.map((week: any) => {
            return (
              <div
                key={week.week}
                className=' w-f min-h-max mt-5 mb-5 bg-slate-900 p-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-md shadow-gray-900'>
                <p className='text-2xl font-bold mb-2'>{week.week}</p>
                {week.questions.map((question: any) => {
                  return (
                    <div
                      key={question.id}
                      className='flex align-middle items-center  w-full'>
                      {displayCompletedIcon(question.completed)}
                      <Accordion type='single' collapsible className='w-full'>
                        <AccordionItem value='item-1'>
                          <AccordionTrigger>
                            {question.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {question.completed ? (
                              <div className='max-w-xl'>
                                <div className='m-2'>
                                  <p className='font-bold'> Explanation</p>
                                  <p className='text-slate-400'>
                                    {question.explanation}
                                  </p>
                                </div>
                                <div className='m-2 whitespace-pre-line'>
                                  <p className='font-bold'>Answer</p>
                                  <p className='text-slate-400'>
                                    {question.answer}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className='grid w-full gap-2'>
                                <Textarea
                                  placeholder='Type your answer here'
                                  onChange={(e) => {
                                    setAnswer(e.target.value);
                                  }}
                                />
                                <AlertDialog>
                                  <AlertDialogTrigger className='bg-white text-black h-10 rounded-xl'>
                                    Submit Answer
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to submit the
                                        following as answer? You won&apos;t be
                                        able to submit another answer for the
                                        next 1 hour.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => {
                                          submitAnswer(
                                            question.id,
                                            question.question
                                          );
                                        }}>
                                        Submit
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        onClick={() => {
          router.back();
        }}
        className='absolute left-0 top-0 m-5 rounded-full bg-blue-500'>
        <svg
          width='15'
          height='15'
          viewBox='0 0 15 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z'
            fill='currentColor'
            fill-rule='evenodd'
            clip-rule='evenodd'></path>
        </svg>
      </Button>
    </>
  );
}

export default Page;
