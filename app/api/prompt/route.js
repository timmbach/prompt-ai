import { connectToDB } from "@utils/database";
import { Prompt } from "@models/Prompt";

export const GET = async (req, res) => {
  //   const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get all prompts", { status: 500 });
  }
};
