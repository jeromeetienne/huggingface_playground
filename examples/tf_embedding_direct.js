/**
 * https://huggingface.co/docs/transformers.js/api/pipelines#module_pipelines.FeatureExtractionPipeline
 */

import { pipeline } from '@xenova/transformers';

let extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
let output = await extractor("Hello world");

console.log({output})