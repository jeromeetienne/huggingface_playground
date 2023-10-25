/**
 * from https://huggingface.co/docs/huggingface.js/index#huggingfaceinference-examples
 */

import { HfInference } from "@huggingface/inference";

// sanity check - make sure the HF_ACCESS_TOKEN environment variable is set
console.assert(process.env.HF_ACCESS_TOKEN, 'Please set the HF_ACCESS_TOKEN environment variable')

// Create an instance of the Hugging Face Inference API client
const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
const inference = new HfInference(HF_ACCESS_TOKEN);

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


