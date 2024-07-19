import { assertExists } from "./assertions";
import { CubeLayer, Direction, Notation, autoplay, next } from "./cube-constants";
import { turn, turnCube, turnEnabled } from "./rotations";
import { TDirection, TNotation, TranslatedNotation } from "./types";

const solveSteps = assertExists(document.getElementById('solve-steps'))
const previousStep = assertExists(document.getElementById('previous-step'))
const currentStep = assertExists(document.getElementById('current-step'))
const nextStep = assertExists(document.getElementById('next-step'))

function stringNotation(notation: TNotation): string {
	switch (notation) {
		case Notation.L:
			return "L"
		case Notation.Lp:
			return "L'"
		case Notation.L2:
			return "L2"

		case Notation.R:
			return "R"
		case Notation.Rp:
			return "R'"
		case Notation.R2:
			return "R2"

		case Notation.F:
			return "F"
		case Notation.Fp:
			return "F'"
		case Notation.F2:
			return "F2"

		case Notation.B:
			return "B"
		case Notation.Bp:
			return "B'"
		case Notation.B2:
			return "B2"

		case Notation.U:
			return "U"
		case Notation.Up:
			return "U'"
		case Notation.U2:
			return "U2"

		case Notation.D:
			return "D"
		case Notation.Dp:
			return "D'"
		case Notation.D2:
			return "D2"

		case Notation.M:
			return "M"
		case Notation.Mp:
			return "M'"
		case Notation.M2:
			return "M2"

		case Notation.E:
			return "E"
		case Notation.Ep:
			return "M'"
		case Notation.E2:
			return "E2"

		case Notation.S:
			return "S"
		case Notation.Sp:
			return "S'"
		case Notation.S2:
			return "S2"

		case Notation.x:
			return "X"
		case Notation.xp:
			return "X'"
		case Notation.x2:
			return "X2"

		case Notation.y:
			return "Y"
		case Notation.yp:
			return "Y'"
		case Notation.y2:
			return "Y2"

		case Notation.z:
			return "Z"
		case Notation.zp:
			return "Z'"
		case Notation.z2:
			return "Z2"
		default:
			return ""
	}
}

function translateNotation(notation: TNotation): TranslatedNotation {
	switch (notation) {
		case Notation.L:
			return { layer: true, twice: false, direction: Direction.DOWN, cubeLayer: CubeLayer.LEFT };
		case Notation.Lp:
			return { layer: true, twice: false, direction: Direction.UP, cubeLayer: CubeLayer.LEFT };
		case Notation.L2:
			return { layer: true, twice: true, direction: Direction.UP, cubeLayer: CubeLayer.LEFT };

		case Notation.R:
			return { layer: true, twice: false, direction: Direction.UP, cubeLayer: CubeLayer.RIGHT };
		case Notation.Rp:
			return { layer: true, twice: false, direction: Direction.DOWN, cubeLayer: CubeLayer.RIGHT };
		case Notation.R2:
			return { layer: true, twice: true, direction: Direction.DOWN, cubeLayer: CubeLayer.RIGHT };

		case Notation.F:
			return { layer: true, twice: false, direction: Direction.RIGHT, cubeLayer: CubeLayer.FRONT };
		case Notation.Fp:
			return { layer: true, twice: false, direction: Direction.LEFT, cubeLayer: CubeLayer.FRONT };
		case Notation.F2:
			return { layer: true, twice: true, direction: Direction.LEFT, cubeLayer: CubeLayer.FRONT };

		case Notation.B:
			return { layer: true, twice: false, direction: Direction.LEFT, cubeLayer: CubeLayer.BACK };
		case Notation.Bp:
			return { layer: true, twice: false, direction: Direction.RIGHT, cubeLayer: CubeLayer.BACK };
		case Notation.B2:
			return { layer: true, twice: true, direction: Direction.RIGHT, cubeLayer: CubeLayer.BACK };

		case Notation.U:
			return { layer: true, twice: false, direction: Direction.LEFT, cubeLayer: CubeLayer.TOP };
		case Notation.Up:
			return { layer: true, twice: false, direction: Direction.RIGHT, cubeLayer: CubeLayer.TOP };
		case Notation.U2:
			return { layer: true, twice: true, direction: Direction.RIGHT, cubeLayer: CubeLayer.TOP };

		case Notation.D:
			return { layer: true, twice: false, direction: Direction.RIGHT, cubeLayer: CubeLayer.BOTTOM };
		case Notation.Dp:
			return { layer: true, twice: false, direction: Direction.LEFT, cubeLayer: CubeLayer.BOTTOM };
		case Notation.D2:
			return { layer: true, twice: true, direction: Direction.LEFT, cubeLayer: CubeLayer.BOTTOM };

		case Notation.M:
			return { layer: true, twice: false, direction: Direction.DOWN, cubeLayer: CubeLayer.M };
		case Notation.Mp:
			return { layer: true, twice: false, direction: Direction.UP, cubeLayer: CubeLayer.M };
		case Notation.M2:
			return { layer: true, twice: true, direction: Direction.UP, cubeLayer: CubeLayer.M };

		case Notation.E:
			return { layer: true, twice: false, direction: Direction.RIGHT, cubeLayer: CubeLayer.E };
		case Notation.Ep:
			return { layer: true, twice: false, direction: Direction.LEFT, cubeLayer: CubeLayer.E };
		case Notation.E2:
			return { layer: true, twice: true, direction: Direction.LEFT, cubeLayer: CubeLayer.E };

		case Notation.S:
			return { layer: true, twice: false, direction: Direction.LEFT, cubeLayer: CubeLayer.S };
		case Notation.Sp:
			return { layer: true, twice: false, direction: Direction.RIGHT, cubeLayer: CubeLayer.S };
		case Notation.S2:
			return { layer: true, twice: true, direction: Direction.RIGHT, cubeLayer: CubeLayer.S };

		case Notation.x:
			return { layer: false, twice: false, direction: Direction.UP };
		case Notation.xp:
			return { layer: false, twice: false, direction: Direction.DOWN };
		case Notation.x2:
			return { layer: false, twice: true, direction: Direction.DOWN };

		case Notation.y:
			return { layer: false, twice: false, direction: Direction.LEFT };
		case Notation.yp:
			return { layer: false, twice: false, direction: Direction.RIGHT };
		case Notation.y2:
			return { layer: false, twice: true, direction: Direction.RIGHT };

		case Notation.z:
			return { layer: false, twice: false, direction: Direction.TILT_RIGHT };
		case Notation.zp:
			return { layer: false, twice: false, direction: Direction.TILT_LEFT };
		case Notation.z2:
			return { layer: false, twice: true, direction: Direction.TILT_LEFT };

		default:
			throw new Error();
	}
}

function reversedDirection(direction: TDirection) {
	switch (direction) {
		case Direction.DOWN:
			return Direction.UP
		case Direction.UP:
			return Direction.DOWN
		case Direction.LEFT:
			return Direction.RIGHT
		case Direction.RIGHT:
			return Direction.LEFT
		case Direction.TILT_LEFT:
			return Direction.TILT_RIGHT
		case Direction.TILT_RIGHT:
			return Direction.TILT_LEFT
	}
}

let sequenceIdx = 0
let currentSequence: Array<TNotation>

function setSolveStepsText() {
	previousStep.innerHTML = '&#11164;'
	if (sequenceIdx > 0) {
		previousStep.innerText += ` ${stringNotation(currentSequence[sequenceIdx - 1])}`
	}
	currentStep.innerHTML = stringNotation(currentSequence[sequenceIdx])
	nextStep.innerHTML = '&#11166;'
	if (sequenceIdx < currentSequence.length - 1) {
		nextStep.innerText = `${stringNotation(currentSequence[sequenceIdx + 1])} ${nextStep.innerText}`
	}
}

function executeNextStep() {
	if (currentSequence && sequenceIdx < currentSequence.length && turnEnabled) {
		const move = translateNotation(currentSequence[sequenceIdx])
		if (move.layer) {
			const cubeLayer = assertExists(move.cubeLayer)
			turn(cubeLayer, move.direction, move.twice);
		}
		else {
			turnCube(move.direction, move.twice)
		}
		sequenceIdx++
		setSolveStepsText()
	}
}

function executePreviousStep() {
	if (currentSequence && sequenceIdx > 0 && turnEnabled) {
		sequenceIdx--
		setSolveStepsText()
		const move = translateNotation(currentSequence[sequenceIdx])
		move.direction = reversedDirection(move.direction)
		if (move.layer) {
			const cubeLayer = assertExists(move.cubeLayer)
			turn(cubeLayer, move.direction, move.twice);
		}
		else {
			turnCube(move.direction, move.twice)
		}
	}
}

previousStep.addEventListener('click', _ => {
	autoplay.checked = false
	executePreviousStep()
})
nextStep.addEventListener('click', executeNextStep)
autoplay.addEventListener('change', _ => {
	if (autoplay.checked) {
		executeNextStep()
	}
})
next.addEventListener('input', executeNextStep)

export function setupSequence(sequence: Array<TNotation>): void {
	sequenceIdx = 0
	currentSequence = sequence
	solveSteps.style.display = 'flex'
	setSolveStepsText()
	if (autoplay.checked) {
		executeNextStep()
	}
}