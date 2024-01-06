"use client";
import { Callout, TextField } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../../components/Spinner";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [Error, setError] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <div className="max-w-xl">
      {Error && (
        <Callout.Root color="red" className="mb-5 font-bold">
          <Callout.Text>{Error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(
          async (data) =>
            await axios
              .post("/api/issue", data)
              .then((res) => {
                setIsSubmit(true);
                // console.log(res);
                router.push("/issues");
              })
              .catch((err) => {
                setIsSubmit(false);
                console.log(err);
                setError("An unexpected error occured.");
              })
        )}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button disabled={isSubmit}>
          Submit New issue{isSubmit && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
