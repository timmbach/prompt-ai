import { connectToDB } from "@utils/database";
import { Prompt } from "@models/Prompt";
import { getSession } from "next-auth/react";

// GET - read request
export const GET = async (req, { params }) => {
  //   const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompt", { status: 500 });
  }
};

// PATCH - update request
export const PATCH = async (req, { params }) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE - delete request
export const DELETE = async (req, { params }) => {
  //   const { userId, prompt, tag } = await req.json();
  // const session = await getSession({ req });

  try {
    await connectToDB();
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
    console.log(deletedPrompt);

    return new Response("Prompt deleted successfully", { status: 200 });

    //

    // const prompt = await Prompt.findById(id);

    // if (!prompt) {
    //   return res.status(404).json({ error: "Prompt not found" });
    // }
    // if (prompt.userId !== session.user.id) {
    //   return res.status(403).json({ error: "Forbidden" });
    // }

    // await prompt.remove();
    // res.status(200).json({ message: "Prompt deleted successfully" });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
    // console.log(error);
  }
};
