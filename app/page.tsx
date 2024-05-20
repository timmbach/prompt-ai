"use client";
import Feed from "@components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full flex_center flex-col">
      <h1 className="head_text text-center flex flex-col">
        <span>Discover and share</span>
        {/* <br className="hidden md:flex " /> */}
        <span className="orange_gradient text-center text-xl md:mt-3">
          AI-powered prompts
        </span>
      </h1>
      <p className="desc text-center">
        Promptai is an open-source AI promting tool for mordern world to
        discover, create and share creative prompts
      </p>

      <Feed />
    </main>
  );
}
