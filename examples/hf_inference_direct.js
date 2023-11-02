/**
 * from https://huggingface.co/docs/huggingface.js/index#huggingfaceinference-examples
 */

import { HfInference } from "@huggingface/inference";

// sanity check - make sure the HUGGINGFACEHUB_API_KEY environment variable is set
console.assert(process.env.HUGGINGFACEHUB_API_KEY, 'Please set the HUGGINGFACEHUB_API_KEY environment variable')

// Create an instance of the Hugging Face Inference API client
const inference = new HfInference(process.env.HUGGINGFACEHUB_API_KEY);

// generate text
const result = await inference.textGeneration({
        // model: 'gpt2',
        model: 'HuggingFaceH4/zephyr-7b-alpha',
        inputs: 'The answer to the universe is',
        parameters: {
                temperature: 1,
        }
}, {
        use_cache: true
})

// display results
console.log({result})


