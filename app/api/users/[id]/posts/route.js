import { connectToDB } from "@utils/database";
import { Prompt } from "@models/Prompt";

export const GET = async (req, { params }) => {
  //   const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
