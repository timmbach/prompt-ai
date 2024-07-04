// import React from 'react'

// type Props = {}

// function Profile({}: Props) {
//   return (
//     <div>Profile</div>
//   )
// }

// export default Profile

import React from "react";
import PromptCard from "./PromptCard";
import Loading from "@app/profile/loading";

type Props = {
  name: string | null;
  desc: string;
  data: any;

  handleEdit?: any;
  handleDelete?: any;
};

function Profile({ name, desc, data, handleEdit, handleDelete }: Props) {
  // console.log(data);
  return (
    <section className="w-full h-full">
      <h1 className="text-3xl font-semibold text-left blue_gradient">{name}</h1>
      <p className="desc text-left">{desc}</p>

      {/* user prompts */}
      {data.length === 0 ? (
        <Loading />
      ) : (
        <div className="mt-16 prompt_layout">
          {data.map((post: any) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Profile;
