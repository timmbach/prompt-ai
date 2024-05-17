"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  post: any;
  handleTagClick?: any;
  handleEdit: any;
  handleDelete: any;
  // key?: any;
};

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }: Props) {
  const [copied, setCopied] = useState("");

  const { data: session }: any = useSession();

  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    // console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center cursor-pointer gap-3 "
          onClick={handleProfileClick}
        >
          <Image
            src={post?.creator?.image}
            alt="user Img"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* copy prompt */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={15}
            height={14}
            alt="_"
          />
        </div>
      </div>

      {/* display prompt */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user?.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex_center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer font-semibold hover:font-bold"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-600 cursor-pointer font-semibold hover:font-bold"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
