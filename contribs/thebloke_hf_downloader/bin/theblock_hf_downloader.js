#!/usr/bin/env node

/**
 * from https://huggingface.co/docs/huggingface.js/hub/README
 */

// node imports
import Fs from 'fs';
import ChildProcess from 'child_process';
import Path from 'path'

// npm imports
import * as HfHub from "@huggingface/hub";
import CliColor from 'cli-color'
import * as Commander from "commander"


// local imports 
import Utils from '../src/utils.js'

// get __dirname and __filename in esm module
import Url from "url";
const __filename = Url.fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//	
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


async function mainAsync() {

	const quantizationMethods = [
		'Q2_K',
		'Q3_K_S',
		'Q3_K_M',
		'Q3_K_L',
		'Q4_0',
		'Q4_K_S',
		'Q4_K_M',
		'Q5_0',
		'Q5_K_S',
		'Q5_K_M',
		'Q6_K',
		'Q8_0',
	]

	/////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////
	//	Parse command line
	/////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////

	// parse command line
	const cmdline = new Commander.Command()
	cmdline.name(`${Path.basename(__filename)}`)
	const MyPackageJson = JSON.parse(await Fs.promises.readFile(Path.join(__dirname, '../package.json'), 'utf8'))
	cmdline.version(MyPackageJson.version)
	cmdline.description(`Play with CSV files and LlamaCpp models.`)

	// add command line options
	cmdline.option('-s, --maxFileSizeGbyte <number>', 'the maximum size of the file in Gbyte. Used to pick the higuest level of quantization supported.', parseFloat)
	cmdline.requiredOption('-m, --modelName <string>', 'the name of the model e.g. "TheBloke/zephyr-7B-alpha-GGUF"')
	cmdline.addOption(new Commander.Option('-q, --quantizationMethod <string>', 'the level of quantisation e.g. "Q6_K"').choices(quantizationMethods))

	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////
	//	parse command line
	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////

	// parse command line
	cmdline.parse(process.argv)
	const cmdlineOptions = cmdline.opts()

	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////
	//	
	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////


	// get all models
	const modelList = await Utils.modelList()

	// const modelName = 'TheBloke/zephyr-7B-alpha-GGUF'
	const modelName = cmdlineOptions.modelName
	const modelEntry = modelList.find(model => model.name === modelName)
	if (modelEntry === undefined) {
		throw new Error(`Model ${modelName} not found`)
	}

	// console.log({ modelEntry })
	const modelPageUrl = `https://huggingface.co/${modelName}`


	let fileEntries = await Utils.fileList(modelEntry.name)

	let fileEntryToDownload = null
	// filter file entries to keep only the ones that are smaller or equal than the maxFileSizeGbyte
	if (cmdlineOptions.maxFileSizeGbyte !== undefined) {
		const maxFileSizeByte = cmdlineOptions.maxFileSizeGbyte * 1024 * 1024 * 1024
		fileEntries = fileEntries.filter(fileEntry => {
			if (fileEntry.path.endsWith('.gguf') === false) return false
			if (fileEntry.size > maxFileSizeByte) return false
			return true
		})

		if (fileEntries.length === 0) {
			throw new Error(`No file found for model ${modelName} with a size smaller or equal than ${cmdlineOptions.maxFileSizeGbyte} Gbyte`)
		} else {
			const lastFileEntry = fileEntries[fileEntries.length - 1]
			const quantisationMethod = lastFileEntry.path.split('.')[1]

			console.log(`Found ${fileEntries.length} quantisation level for model ${modelName} with a size smaller or equal than ${cmdlineOptions.maxFileSizeGbyte} Gbyte`)
			console.log(`Highest quantisation level: ${CliColor.blue(quantisationMethod)}`)
		}

		// sort file entries by size in ascending order
		fileEntries.sort((a, b) => a.size - b.size)
		// pick the last file entry - aka the largest we can handle
		fileEntryToDownload = fileEntries[fileEntries.length - 1]
	} else if (cmdlineOptions.quantizationMethod !== undefined) {
		fileEntries = fileEntries.filter(fileEntry => {
			const quantisationMethod = fileEntry.path.split('.')[1]
			if (quantisationMethod !== cmdlineOptions.quantizationMethod) return false
			return true
		})

		if (fileEntries.length === 0) {
			throw new Error(`No file found for model ${modelName} with a quantization method ${cmdlineOptions.quantisationMethod}`)
		}

		fileEntryToDownload = fileEntries[0]
	} else {
		throw new Error(`Either --maxFileSizeGbyte or --quantizationMethod must be specified`)
	}

	const quantisationMethod = fileEntryToDownload.path.split('.')[1]
	console.log('Model Name:', CliColor.blue(modelName))
	console.log('- webpage:', CliColor.blue(modelPageUrl))
	console.log(`- quantisation method: ${CliColor.blue(quantisationMethod)}`)

	// download file entry
	const downloadUrl = `https://huggingface.co/${modelName}/resolve/main/${fileEntryToDownload.path}`
	const dstPath = Path.join(__dirname, `../data/models/${fileEntryToDownload.path}`)
	await Utils.downloadFile(downloadUrl, dstPath, fileEntryToDownload.size)
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//	call main async function (without async prefix because of top level await)
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

void mainAsync()

