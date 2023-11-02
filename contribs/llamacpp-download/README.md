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

## How to Install
This package is published on npmjs.com [here](https://www.npmjs.com/package/thebloke_hf_downloader), nevertheless most people don't need to install it. because it is meant to be used with npx.

```
npm install thebloke_hf_downloader
```


## How to Publish
```
npm login
npm run release
```

Internally it use [np](https://www.npmjs.com/package/np) to publish the package. It will ask you some questions (e.g. version number), 
will do a bunch of checks and then it will publish it. See this [article](https://zellwk.com/blog/publish-to-npm/) for more details.