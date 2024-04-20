"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";

interface PageProps {
  params: {
    skillname: string;
  };
}

function Page({ params }: PageProps) {
  const [questions, setQuestions]: any = useState({});
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
        console.log(response.data[0].questions);
        setQuestions(response.data[0].questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>{params.skillname}</div>;
}

export default Page;
