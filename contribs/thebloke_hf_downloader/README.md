# TheBloke HuggingFace Downloader
Make a downloader for TheBloke's HuggingFace models for llama-cpp models

llma-cpp is about runinng models locally, so it makes sense to focus on downloading those models. Remote models don't need to be downloaded.

## Features to implement
- find the largest model i can run
- download the largest model i can run for a specific computer
- validate a downloaded model can run
  - download the model
  - use node-llama-cpp chat on it


## Usage

Download "zephyr-7B-alpha-GGUF" model with quantisation "Q6_K"

```
npx thebloke_hf_downloader -m TheBloke/zephyr-7B-alpha-GGUF -q Q6_K
```


