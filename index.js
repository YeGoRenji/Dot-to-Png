import { instance } from "@viz-js/viz";
import cstp from "convert-svg-to-png";
import { writeFileSync } from "fs";


instance().then(async (viz) => {
	const svg = viz.render("digraph { a -> b }", {format: "svg"});
	console.log(svg.output);

	const png = await cstp.convert(svg.output, {height: 1000});
	writeFileSync("file.png", png);
});
