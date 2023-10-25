// from https://js.langchain.com/docs/modules/model_io/models/llms/integrations/huggingface_inference


import { HuggingFaceInference } from "langchain/llms/hf";

const model = new HuggingFaceInference({
	model: "HuggingFaceH4/zephyr-7b-alpha",
	apiKey: process.env.HUGGINGFACEHUB_API_KEY,
	// temperature: 0.5,
	// cache: true,
});
const outputText = await model.call("The answer to the universe is ");

console.log(outputText)