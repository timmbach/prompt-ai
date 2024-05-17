import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface Post {
  prompt: string;
  tag: string;
}

type Props = {
  type: string;
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: any) => void;
};

function Form({ type, post, setPost, submitting, handleSubmit }: Props) {
  return (
    <section className="w-full max-w-full flex_start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient ">{type}</span> Post
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing AI prompts with the world
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            name=""
            id=""
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            id=""
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          ></input>
        </label>
        <div className="flex_end mb-5 mx-3 gap-3">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
