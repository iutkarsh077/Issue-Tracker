"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface Issue {
  _id: string,
  title: string,
  description: string
}
export default function Home() {
  const [Issue1, setIssue1] = useState<Array<Issue>>([]);
  useEffect(() => {
    const fetchingIssues = async () => {
      await axios
        .get("/api/getIssues")
        .then((res) => {
          console.log(res.data);
          setIssue1(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    fetchingIssues();
  }, []);
  return (
    <div className="container mx-auto p-4">
      {Issue1.map((myissue) => (
        <div key={myissue._id} className="mb-4 p-4 border hover:bg-slate-200 ease-out hover:cursor-pointer rounded-lg shadow-md">
          <div className="text-lg font-semibold mb-2 text-red-600">{myissue.title}</div>
          <div className="text-gray-600">{myissue.description}</div>
        </div>
      ))}
    </div>
  );
}
