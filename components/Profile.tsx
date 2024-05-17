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
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>

      {/* user prompts */}
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
    </section>
  );
}

export default Profile;
