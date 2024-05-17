"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

function ProfilePage({}: Props) {
  const [myPosts, setMyPosts] = useState([]);

  const router = useRouter();

  const { data: session }: any = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await res.json();

      setMyPosts(data);
    };

    if (session?.user?.id) fetchPosts();

    // console.log(myPosts);
  }, [session?.user?.id]);

  const handleEdit = (post: any) => {
    if (!session) {
      alert("You need to be authenticated to edit this prompt.");
      return;
    }
    if (post) router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: any) => {
    if (!session) {
      alert("You need to be authenticated to delete this prompt.");
      return;
    }
    const hasConfirmed = confirm("Are you sure you wan to delete this post?");
    // console.log(post);

    if (post && hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((p: any) => p._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
