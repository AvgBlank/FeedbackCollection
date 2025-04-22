"use client";
import { useEffect, useRef, useState } from "react";
import { Notyf } from "notyf";
import dotenv from "dotenv";
import Input from "@/components/UI/Input";
import Rating from "@/components/UI/Rating";
import "notyf/notyf.min.css";

dotenv.config();

const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLTextAreaElement>(null);
  const [rating, setRating] = useState(0.5);
  const [notyf, setNotyf] = useState<Notyf | null>(null);

  useEffect(() => {
    setNotyf(new Notyf());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const feedback = feedbackRef.current?.value;
    if (!name || name.trim().length < 3) {
      if (notyf) {
        notyf.error("Please enter a valid name");
      }
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (notyf) {
        notyf.error("Please enter a valid email");
      }
      return;
    }
    if (!phone || !/^\d+$/.test(phone)) {
      if (notyf) {
        notyf.error("Please enter a valid phone number");
      }
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5269/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            feedback,
            rating,
          }),
        },
      );
      if (response.ok) {
        if (notyf) {
          notyf.success("Feedback submitted successfully");
        }
        nameRef.current!.value = "";
        emailRef.current!.value = "";
        phoneRef.current!.value = "";
        feedbackRef.current!.value = "";
        setRating(0.5);
      } else {
        if (notyf) {
          notyf.error("Failed to submit feedback");
        }
      }
    } catch {
      if (notyf) {
        notyf.error("Internal server error");
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-6 items-center justify-center w-full"
      onSubmit={handleSubmit}
    >
      <Input name="Name" placeholder="Name" ref={nameRef} type="text" />
      <Input name="Email" placeholder="Email" ref={emailRef} type="text" />
      <Input name="Phone" placeholder="Phone" ref={phoneRef} type="text" />

      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-3xl">Rating</h3>
        <Rating rating={rating} setRating={setRating} />
      </div>

      <div className="flex flex-col gap-2 items-center">
        <div className="flex justify-start w-4/5">
          <h3 className="text-3xl">Words to the chef</h3>
        </div>
        <textarea
          name="Feedback"
          className="text-2xl placeholder-white placeholder:opacity-60 outline-none rounded-2xl border-1 border-[#C4A38A] pt-3 pl-4 w-4/5 resize-none"
          ref={feedbackRef}
          rows={4}
          cols={50}
          autoComplete="on"
        />
      </div>

      <button
        type="submit"
        className="px-6 pt-2 pb-1 text-3xl border-1 border-[#C4A38A] rounded-lg flex"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
