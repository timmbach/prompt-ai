import { connectToDB } from "@utils/database";
import { Prompt } from "@models/Prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  // console.log(req.body);

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
