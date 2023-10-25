/**
 * from https://js.langchain.com/docs/modules/data_connection/text_embedding/integrations/hugging_face_inference
 */
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";

const embeddings = new HuggingFaceInferenceEmbeddings({
        model: 'Xenova/all-MiniLM-L6-v2',
});

/* Embed queries */
const res = await embeddings.embedQuery("Hello world");

console.log({res})
// debugger