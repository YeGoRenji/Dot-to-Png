#!/usr/local/bin/node
import { instance } from "@viz-js/viz";
import cstp from "convert-svg-to-png";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { argv, exit } from "process";

if (argv.length != 5)
{
	console.log("Usage: node index.js [height] [dotfile] [output.png]")
	exit(0)
}

const height = parseInt(argv[2])
const dotFilename = argv[3]
const outputFilename = argv[4]

if (!existsSync(dotFilename))
{
	console.error(`File ${dotFilename} does not exist !`);
	exit(-1)
}

instance().then(async (viz) => {
	console.log("Generating...")

	const dotData = readFileSync(dotFilename)

	const svg = viz.render(dotData.toString(), {format: "svg"});
	const png = await cstp.convert(svg.output, {height});

	writeFileSync(outputFilename, png);

	console.log("Done !")
});
