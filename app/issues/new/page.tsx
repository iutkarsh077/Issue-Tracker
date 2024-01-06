"use client";
import { Callout } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
// import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../../components/Spinner";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const data: IssueForm = {
    title,
    description,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const res = await axios.post("/api/issue", data);
      console.log(res);
      setIsSubmit(true);
      router.push("/issues");
    } catch (err) {
      setIsSubmit(false);
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-xl">
    {error && (
      <Callout.Root color="red" className="mb-5 font-bold">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
    )}
    <form className="max-w-xl space-y-3 border-black flex flex-col" onSubmit={handleSubmit}>
      <label className="flex flex-col">
        <span>Title</span>
        <input
          className="border-black border-2 rounded-md h-8 p-2 m-2"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="flex flex-col">
        <span>Description:</span>
        <textarea
          className="border-black border-2 rounded-md h-20 p-2 m-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
  
      <Button disabled={isSubmit} type="submit">
        Submit New issue {isSubmit && <Spinner />}
      </Button>
    </form>
  </div>
  );
};

export default NewIssuePage;