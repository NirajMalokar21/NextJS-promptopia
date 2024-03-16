// GET (read)
// PATCH (update)
// DELET (delete)

import { connectToDB } from "../../../../utils/database";
import Prompt from "../../../../models/prompt"

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        
        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch prompts", {status: 500});
    }
}

export const PATCH = async(request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to update prompt", { status: 500})
    }
}

// export const DELETE = async(request, { params }) => {
//     console.log("HELLO DELETE REQ ")
//     try {
//         console.log("HELLO TRY")
//         await connectToDB();
        
//         await Prompt.findByIdAndRemove(params.id);

//         return new Response ("Prompt deleted successfully!", { status: 200 });
//     } catch (error) {
//         console.log("HELLO CATCH REQ")
//         return new Response("Could not delete prompt", { status: 500 });
//     }
// }
export const DELETE = async (request, { params }) => {
    try {
        console.log("HELLO DELETE REQ ");
        console.log("Params:", params);

        await connectToDB();
        
        console.log("Database connected");

        await Prompt.findByIdAndDelete(params.id);

        console.log("Prompt deleted successfully!");

        return new Response ("Prompt deleted successfully!", { status: 200 });
    } catch (error) {
        console.log("Error:", error);

        return new Response("Could not delete prompt", { status: 500 });
    }
}
