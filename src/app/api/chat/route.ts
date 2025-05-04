import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { searchPropertyByAddress } from '@/lib/rapidapi/zillow56'; // Import our function

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the available functions for the AI
const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'searchPropertyByAddress',
      description: 'Get detailed information about a specific property using its address.',
      parameters: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
            description: 'The full property address, e.g., 123 Main St, Anytown, CA 91234',
          },
        },
        required: ['address'],
      },
    },
  },
  // TODO: Add functions for calculators later
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Ensure messages is always an array, even if only one message is sent
    const incomingMessages = Array.isArray(body.messages) ? body.messages : [body.messages];

    if (!incomingMessages || incomingMessages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    // Add a system message to define Iris's role
    const systemMessage = {
      role: 'system',
      content: 'You are Iris, a helpful real estate assistant. You can look up property details and answer questions about real estate. Be concise and informative.'
    };
    
    const messagesForAPI = [systemMessage, ...incomingMessages];

    console.log("Sending messages to OpenAI:", messagesForAPI);

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Or your preferred model
      messages: messagesForAPI,
      tools: tools,
      tool_choice: 'auto', // Let the model decide whether to call a function
    });

    console.log("OpenAI response:", response);

    const responseMessage = response.choices[0].message;

    // Check if the model wants to call a function
    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      const toolCall = responseMessage.tool_calls[0]; // Handle first tool call
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);

      console.log(`Function call requested: ${functionName}`, functionArgs);

      let functionResult;
      if (functionName === 'searchPropertyByAddress') {
        functionResult = await searchPropertyByAddress(functionArgs.address);
         // TODO: Potentially filter/summarize result before sending back to user/AI
      } else {
        console.warn(`Function ${functionName} not implemented.`);
        functionResult = { error: `Function ${functionName} not available.` };
      }
      
       console.log("Function call result:", functionResult);

      // For now, directly return the result of the function call
      // In a more complex flow, you might send this result back to OpenAI 
      // for a natural language summary.
       return NextResponse.json({ 
         response: {
           role: 'assistant', // Or 'tool' role depending on your flow
           content: `Function ${functionName} executed.`, // Placeholder confirmation
           tool_call_id: toolCall.id, 
           function_name: functionName,
           function_result: functionResult // Sending back the raw data for now
         }
       });

    } else {
      // If no function call, return the text response
      return NextResponse.json({ response: responseMessage });
    }

  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Internal server error: ${errorMessage}` }, { status: 500 });
  }
} 