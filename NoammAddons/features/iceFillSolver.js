/// <reference types="../../CTAutocomplete" />

import Settings from "../Settings";
import { Render } from "../utils";


register("step", () => {
	try {
		const lines = Scoreboard.getLines()
		const line = ChatLib.removeFormatting(lines[lines.length - 1])
		if (line.includes("-132,-492")) {
			if (!Settings.IcefillSolver) return
			if (pattern.length) return
			pattern = solve()
			if (!pattern) {
				pattern = []
				return
			}
			path = pattern.map(point => [point[0], point[2]])
			renderTrigger.register()
		} else {
			while (pattern.length) pattern.pop()
			while (path.length) path.pop()
			renderTrigger.unregister()
		}
	} catch (error) {}
}).setFps(2)



let path = []
let pattern = []
const start = [[15,7],[23,15],[15,23],[7,15]]
const representativeFloors = [[[0,-1,2,-1],[0,1,2,1],[2,1,0,1],[2,-1,0,-1]],[[1,0,1,-1],[2,1,2,0],[2,1,1,-1],[0,-2,1,0],[3,0,0,-2],[2,-1,2,0]],[[4,2,4,1],[3,-1,2,-1],[2,3,2,2],[3,0,3,-1],[3,2,3,1]]]
const floors = [
	[[[0,0,-1],[1,0,-1],[1,0,0],[1,0,1],[2,0,1],[2,0,0],[3,0,0]],[[0,0,1],[1,0,1],[1,0,0],[1,0,-1],[2,0,-1],[2,0,0],[3,0,0]],[[1,0,0],[1,0,1],[2,0,1],[2,0,0],[3,0,0]],[[1,0,0],[1,0,-1],[2,0,-1],[2,0,0],[3,0,0]]],

	[[[0,0,-1],[0,0,-2],[1,0,-2],[2,0,-2],[3,0,-2],[3,0,-1],[2,0,-1],[2,0,0],[1,0,0],[1,0,1],[0,0,1],[0,0,2],[1,0,2],[2,0,2],[3,0,2],[4,0,2],[4,0,1],[3,0,1],[3,0,0],[4,0,0],[5,0,0]],
	[[1,0,0],[1,0,-1],[0,0,-1],[0,0,-2],[1,0,-2],[2,0,-2],[3,0,-2],[4,0,-2],[4,0,-1],[3,0,-1],[3,0,0],[3,0,1],[2,0,1],[1,0,1],[0,0,1],[0,0,2],[1,0,2],[2,0,2],[3,0,2],[4,0,2],[4,0,1],[4,0,0],[5,0,0]],
	[[0,0,-1],[0,0,-2],[1,0,-2],[2,0,-2],[3,0,-2],[4,0,-2],[4,0,-1],[3,0,-1],[2,0,-1],[2,0,0],[2,0,1],[1,0,1],[0,0,1],[0,0,2],[1,0,2],[2,0,2],[3,0,2],[4,0,2],[4,0,1],[4,0,0],[5,0,0]],
	[[0,0,-1],[0,0,-2],[1,0,-2],[1,0,-1],[2,0,-1],[2,0,-2],[3,0,-2],[4,0,-2],[4,0,-1],[3,0,-1],[3,0,0],[2,0,0],[2,0,1],[1,0,1],[0,0,1],[0,0,2],[1,0,2],[2,0,2],[3,0,2],[4,0,2],[4,0,1],[4,0,0],[5,0,0]],
	[[0,0,-1],[1,0,-1],[1,0,-2],[2,0,-2],[2,0,-1],[3,0,-1],[3,0,0],[2,0,0],[2,0,1],[1,0,1],[0,0,1],[0,0,2],[1,0,2],[2,0,2],[3,0,2],[4,0,2],[4,0,1],[4,0,0],[5,0,0]],
	[[1,0,0],[1,0,1],[0,0,1],[0,0,2],[1,0,2],[2,0,2],[3,0,2],[4,0,2],[4,0,1],[3,0,1],[3,0,0],[3,0,-1],[2,0,-1],[1,0,-1],[0,0,-1],[0,0,-2],[1,0,-2],[2,0,-2],[3,0,-2],[4,0,-2],[4,0,-1],[4,0,0],[5,0,0]]],
	
	[[[1,0,0],[2,0,0],[3,0,0],[3,0,-1],[2,0,-1],[1,0,-1],[0,0,-1],[0,0,-2],[1,0,-2],[1,0,-3],[2,0,-3],[2,0,-2],[3,0,-2],[3,0,-3],[4,0,-3],[5,0,-3],[6,0,-3],[6,0,-2],[5,0,-2],[4,0,-2],[4,0,-1],[5,0,-1],[5,0,0],[5,0,1],[5,0,2],[4,0,2],[3,0,2],[3,0,1],[2,0,1],[1,0,1],[0,0,1],[0,0,2],[0,0,3],[1,0,3],[1,0,2],[2,0,2],[2,0,3],[3,0,3],[4,0,3],[5,0,3],[6,0,3],[6,0,2],[6,0,1],[6,0,0],[7,0,0]],
	[[1,0,0],[1,0,-1],[0,0,-1],[0,0,-2],[0,0,-3],[1,0,-3],[1,0,-2],[2,0,-2],[2,0,-3],[3,0,-3],[4,0,-3],[5,0,-3],[6,0,-3],[6,0,-2],[5,0,-2],[4,0,-2],[3,0,-2],[3,0,-1],[4,0,-1],[4,0,0],[3,0,0],[3,0,1],[4,0,1],[4,0,2],[3,0,2],[2,0,2],[1,0,2],[1,0,1],[0,0,1],[0,0,2],[0,0,3],[1,0,3],[2,0,3],[3,0,3],[4,0,3],[5,0,3],[6,0,3],[6,0,2],[5,0,2],[5,0,1],[5,0,0],[6,0,0],[7,0,0]],
	[[0,0,1],[1,0,1],[1,0,2],[0,0,2],[0,0,3],[1,0,3],[2,0,3],[3,0,3],[4,0,3],[5,0,3],[5,0,2],[6,0,2],[6,0,1],[5,0,1],[4,0,1],[4,0,2],[3,0,2],[3,0,1],[3,0,0],[2,0,0],[2,0,-1],[1,0,-1],[0,0,-1],[0,0,-2],[0,0,-3],[1,0,-3],[1,0,-2],[2,0,-2],[2,0,-3],[3,0,-3],[4,0,-3],[5,0,-3],[6,0,-3],[6,0,-2],[5,0,-2],[4,0,-2],[3,0,-2],[3,0,-1],[4,0,-1],[5,0,-1],[5,0,0],[6,0,0],[7,0,0]],
	[[1,0,0],[1,0,-1],[0,0,-1],[0,0,-2],[0,0,-3],[1,0,-3],[1,0,-2],[2,0,-2],[2,0,-3],[3,0,-3],[4,0,-3],[5,0,-3],[6,0,-3],[6,0,-2],[5,0,-2],[4,0,-2],[4,0,-1],[5,0,-1],[5,0,0],[4,0,0],[3,0,0],[2,0,0],[2,0,1],[3,0,1],[4,0,1],[4,0,2],[3,0,2],[2,0,2],[1,0,2],[0,0,2],[0,0,3],[1,0,3],[2,0,3],[3,0,3],[4,0,3],[5,0,3],[6,0,3],[6,0,2],[6,0,1],[6,0,0],[7,0,0]],
	[[0,0,-1],[1,0,-1],[2,0,-1],[2,0,-2],[1,0,-2],[0,0,-2],[0,0,-3],[1,0,-3],[2,0,-3],[3,0,-3],[4,0,-3],[5,0,-3],[6,0,-3],[6,0,-2],[5,0,-2],[4,0,-2],[4,0,-1],[5,0,-1],[5,0,0],[5,0,1],[4,0,1],[4,0,2],[3,0,2],[2,0,2],[2,0,1],[1,0,1],[0,0,1],[0,0,2],[0,0,3],[1,0,3],[2,0,3],[3,0,3],[4,0,3],[5,0,3],[5,0,2],[6,0,2],[6,0,1],[6,0,0],[7,0,0]]]
]


function scanAllFloors(pos, rotation) {
	const fullPattern = [];
	const starts = [pos, addPositions(pos, transformTo([5, 1, 0], rotation)), addPositions(pos, transformTo([12, 2, 0], rotation))]
	for (let i = 0; i < starts.length; ++i) {
		let pattern = [...scan(starts[i], i, rotation)]
		pattern.unshift([0, 0, 0])
		pattern.push(addPositions(pattern[pattern.length - 1], [1, 1, 0]))
		pattern = pattern.map(point => addPositions(transformTo(point, rotation), starts[i]))
		fullPattern.push(...pattern)
	}
	return fullPattern;
}

function scan(pos, floorIndex, rotation) {
	const floorHeight = representativeFloors[floorIndex]
	
	for (let i = 0; i < floorHeight.length; ++i) {
		let p1 = transform(floorHeight[i][0], floorHeight[i][1], rotation)
		p1.splice(1, 0, 0)
		let p2 = transform(floorHeight[i][2], floorHeight[i][3], rotation)
		p2.splice(1, 0, 0)
		if (isAir(addPositions(pos, p1)) && !isAir(addPositions(pos, p2))) return floors[floorIndex][i]
		
	}
}

function transform(x, z, rotation) {
	if (rotation === 0) return [-z, x]
	else if (rotation === 1) return [-x, -z]
	else if (rotation === 2) return [z, -x]
	else if (rotation === 3) return [x, z]
}

function transformTo(vec, rotation) {
	if (rotation === 0) return [-vec[2], vec[1], vec[0]]
	else if (rotation === 1) return [-vec[0], vec[1], -vec[2]]
	else if (rotation === 2) return [vec[2], vec[1], -vec[0]]
	else if (rotation === 3) return [vec[0], vec[1], vec[2]]
}

function addPositions(pos1, pos2) {
	const newPosition = [...pos1]
	pos2.forEach((x, i) => newPosition[i] += x)
	return newPosition
}

function isAir(pos) {
	return World.getBlockAt(...pos)?.type?.getID() === 0
}

function solve() {
	const offsetX = Math.floor((Player.getX() + 200) / 32) * 32 - 200
	const offsetZ = Math.floor((Player.getZ() + 200) / 32) * 32 - 200
	
	for (let i = 0; i < start.length; ++i) {
		let [x, z] = start[i]
		let [fx, fz] = [offsetX + x, offsetZ + z]
		let block = World.getBlockAt(fx, 69, fz)
		if (block.type.getID() !== 79 && block.type.getID() !== 174) continue
		return scanAllFloors([fx, 70, fz], i)
	}
}

function render(path) {
	for (let i = 0; i < path.length - 1; ++i) {
		let [x1, y1, z1] = path[i]
		let [x2, y2, z2] = path[i + 1]
		const [r, g, b, a] = [ Settings.IcefillSolverColor.getRed()/255, Settings.IcefillSolverColor.getGreen()/255, Settings.IcefillSolverColor.getBlue()/255, Settings.IcefillSolverColor.getAlpha()/255 ]
		Render.Line(x1 + 0.5, y1, z1 + 0.5, x2 + 0.5, y2, z2 + 0.5, r, g, b, a, true, 5)
	}
}

const renderTrigger = register("renderWorld", () => render(pattern)).unregister();