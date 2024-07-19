import gsap from "gsap"
import * as THREE from 'three'
import { Color, Cube, CubeLayer, Direction, Orientation, Side, autoplay, cubeColors, innerCubeMaterials, layers, next } from "./cube-constants"
import { innerCubeBlackMaterial } from "./materials"
import { rotateFaceColorsXDownCenterMoves, rotateFaceColorsXDownCornerMoves, rotateFaceColorsXDownEdgeMoves, rotateFaceColorsXUpCenterMoves, rotateFaceColorsXUpCornerMoves, rotateFaceColorsXUpEdgeMoves, rotateFaceColorsYLeftCenterMoves, rotateFaceColorsYLeftCornerMoves, rotateFaceColorsYLeftEdgeMoves, rotateFaceColorsYRightCenterMoves, rotateFaceColorsYRightCornerMoves, rotateFaceColorsYRightEdgeMoves, rotateLayerColorsLeftCornerMoves, rotateLayerColorsLeftEgdeMoves, rotateLayerColorsRightCornerMoves, rotateLayerColorsRightEgdeMoves } from "./moves"
import { Move, MoveWithLayer, TCubeLayer, TDirection, TLayer, TOriention, TSide } from "./types"

export let turnTime = 0.3
export let turnEnabled = true

let currentOrientation: TOriention = Orientation.Z

export function setTurnTime(time: number) {
    turnTime = time;
}

let wasTwiceCube: boolean

export function turnCube(direction: TDirection, twice?: boolean) {
    if (turnEnabled) {
        turnEnabled = false
        let axis: TOriention
        let degree: number
        if (direction == Direction.UP || direction == Direction.DOWN) {
            axis = Orientation.X
        }
        else if (direction == Direction.LEFT || direction == Direction.RIGHT) {
            axis = Orientation.Y
        }
        else if (direction == Direction.TILT_LEFT || direction == Direction.TILT_RIGHT) {
            axis = Orientation.Z
        }
        else {
            throw new Error()
        }

        if (direction == Direction.UP || direction == Direction.LEFT || direction == Direction.TILT_RIGHT) {
            degree = -Math.PI / 2
        }
        else if (direction == Direction.DOWN || direction == Direction.RIGHT || direction == Direction.TILT_LEFT) {
            degree = Math.PI / 2
        }
        else {
            throw new Error()
        }

        orientLayersZ()

        if (twice) {
            setTurnTime(turnTime * 0.7)
            wasTwiceCube = true
        }

        eval(`gsap.to(layers.rotation, {
            duration: ${turnTime},
            ${axis}: ${degree}
        })`)

        setTimeout(() => {
            layers.rotation.set(0, 0, 0)

            if (direction == Direction.UP) {
                rotateFaceColorsXUp()
            }

            else if (direction == Direction.DOWN) {
                rotateFaceColorsXDown()
            }

            else if (direction == Direction.LEFT) {
                rotateFaceColorsYLeft()
            }

            else if (direction == Direction.RIGHT) {
                rotateFaceColorsYRight()
            }

            else if (direction == Direction.TILT_LEFT) {
                rotateFaceColorsZLeft()
            }

            else if (direction == Direction.TILT_RIGHT) {
                rotateFaceColorsZRight()
            }

            turnEnabled = true
            
            if (!twice && autoplay.checked) {
                next.dispatchEvent(new InputEvent('input'))
            }
            if (twice) {
                turnCube(direction)
            }
            if (wasTwiceCube) {
                setTurnTime(turnTime / 0.7)
                wasTwiceCube = false
            }
        }, turnTime * 1100)
    }
}

let wasTwiceLayer: boolean

export function turn(layer: TCubeLayer, direction: TDirection, twice?: boolean) {
    turnEnabled = false

    if (layer == CubeLayer.FRONT || layer == CubeLayer.BACK || layer == CubeLayer.S) {
        orientLayersZ()
    }

    else if (layer == CubeLayer.TOP || layer == CubeLayer.BOTTOM || layer == CubeLayer.E) {
        orientLayersY()
    }

    else if (layer == CubeLayer.RIGHT || layer == CubeLayer.LEFT || layer == CubeLayer.M) {
        orientLayersX()
    }

    let cubeLayerIdx = 0
    if (layer == CubeLayer.BACK || layer == CubeLayer.BOTTOM || layer == CubeLayer.RIGHT) {
        cubeLayerIdx = 2
    }
    else if (layer == CubeLayer.E || layer == CubeLayer.M || layer == CubeLayer.S) {
        cubeLayerIdx = 1
    }

    let angle = Math.PI / 2
    if (
        layer == CubeLayer.FRONT && direction == Direction.RIGHT ||
        layer == CubeLayer.BACK && direction == Direction.RIGHT ||
        layer == CubeLayer.LEFT && direction == Direction.DOWN ||
        layer == CubeLayer.RIGHT && direction == Direction.DOWN ||
        layer == CubeLayer.TOP && direction == Direction.LEFT ||
        layer == CubeLayer.BOTTOM && direction == Direction.LEFT ||
        layer == CubeLayer.M && direction == Direction.DOWN ||
        layer == CubeLayer.E && direction == Direction.LEFT ||
        layer == CubeLayer.S && direction == Direction.RIGHT) {
        angle = -Math.PI / 2
    }

    const cubeLayer = layers.children[cubeLayerIdx] as THREE.Group

    if (twice) {
        setTurnTime(turnTime * 0.7)
        wasTwiceLayer = true
    }

    gsap.to(cubeLayer.rotation, {
        duration: turnTime,
        z: angle
    })
    setTimeout(() => {
        if (angle == -Math.PI / 2) {
            rotateLayerColorsRight(cubeLayerIdx, cubeLayer)
        }
        else {
            rotateLayerColorsLeft(cubeLayerIdx, cubeLayer)
        }

        cubeLayer.rotation.z = 0
        turnEnabled = true

        orientLayersZ();

        if (!twice && autoplay.checked) {
            next.dispatchEvent(new InputEvent('input'))
        }
        if (twice) {
            turn(layer, direction)
        }
        if (wasTwiceLayer) {
            setTurnTime(turnTime / 0.7)
            wasTwiceLayer = false
        }
    }, turnTime * 1100)
}

function orientLayersZ() {
    if (currentOrientation == Orientation.X || currentOrientation == Orientation.Y) {
        if (currentOrientation == Orientation.X) {
            rotateFaceColorsYLeft()
        }
        else if (currentOrientation == Orientation.Y) {
            rotateFaceColorsXUp()
        }
        currentOrientation = Orientation.Z
        layers.rotation.set(0, 0, 0)
    }
}

function orientLayersY() {
    if (currentOrientation == Orientation.Z || currentOrientation == Orientation.X) {
        if (currentOrientation == Orientation.X) {
            rotateFaceColorsYLeft()
        }
        rotateFaceColorsXDown()
        currentOrientation = Orientation.Y
        layers.rotation.set(-Math.PI / 2, 0, 0)
    }
}

function orientLayersX() {
    if (currentOrientation == Orientation.Y || currentOrientation == Orientation.Z) {
        if (currentOrientation == Orientation.Y) {
            rotateFaceColorsXUp()
        }
        rotateFaceColorsYRight()
        currentOrientation = Orientation.X
        layers.rotation.set(0, -Math.PI / 2, 0)
    }
}

function rotateLayerColorsRight(layer: TLayer, layerGroup: THREE.Group) {
    rotateLayerColors(rotateLayerColorsRightCornerMoves, rotateLayerColorsRightEgdeMoves, layerGroup, layer, [Side.FRONT, Side.BACK])
}

function rotateLayerColorsLeft(layer: TLayer, layerGroup: THREE.Group) {
    rotateLayerColors(rotateLayerColorsLeftCornerMoves, rotateLayerColorsLeftEgdeMoves, layerGroup, layer, [Side.FRONT, Side.BACK])
}

function rotateFaceColorsZRight() {
    for (let i = 0; i < 3; i++) {
        rotateLayerColorsRight(i as TLayer, layers.children[i] as THREE.Group)
    }
}

function rotateFaceColorsZLeft() {
    for (let i = 0; i < 3; i++) {
        rotateLayerColorsLeft(i as TLayer, layers.children[i] as THREE.Group)
    }
}

function rotateFaceColorsYRight() {
    rotateFaceColors(rotateFaceColorsYRightCornerMoves, rotateFaceColorsYRightEdgeMoves, rotateFaceColorsYRightCenterMoves, [Side.TOP, Side.BOTTOM])
}

function rotateFaceColorsYLeft() {
    rotateFaceColors(rotateFaceColorsYLeftCornerMoves, rotateFaceColorsYLeftEdgeMoves, rotateFaceColorsYLeftCenterMoves, [Side.TOP, Side.BOTTOM])
}

function rotateFaceColorsXUp() {
    rotateFaceColors(rotateFaceColorsXUpCornerMoves, rotateFaceColorsXUpEdgeMoves, rotateFaceColorsXUpCenterMoves, [Side.LEFT, Side.RIGHT])
}

function rotateFaceColorsXDown() {
    rotateFaceColors(rotateFaceColorsXDownCornerMoves, rotateFaceColorsXDownEdgeMoves, rotateFaceColorsXDownCenterMoves, [Side.LEFT, Side.RIGHT])
}

function rotateLayerColors(cornerMoves: Array<Move>, edgeMoves: Array<Move>, layerGroup: THREE.Group, layer: TLayer, alwaysMove: Array<TSide>) {
    const newLayerColors: Array<Array<[number, number, number]>> = []
    const newLayerInnerCubeMaterials: Array<Array<THREE.ShaderMaterial>> = []
    for (let i = 0; i < 9; i++) {
        const colors: Array<[number, number, number]> = []
        const materials: Array<THREE.ShaderMaterial> = []
        for (let j = 0; j < 6; j++) {
            colors.push(Color.BLACK)
            materials.push(innerCubeBlackMaterial)
        }
        newLayerColors.push(colors)
        newLayerInnerCubeMaterials.push(materials)
    }

    const layerColors = cubeColors[layer]
    const layerInnerCubeMaterials = innerCubeMaterials[layer]
    cornerMoves.forEach(move => {
        for (let i = 0; i < move.targetSides.length; i++) {
            newLayerColors[move.targetCube][move.targetSides[i]] = layerColors[move.originCube][move.originSides[i]]
            newLayerInnerCubeMaterials[move.targetCube][move.targetSides[i]] = layerInnerCubeMaterials[move.originCube][move.originSides[i]]
        }
        for (let i = 0; i < alwaysMove.length; i++) {
            newLayerColors[move.targetCube][alwaysMove[i]] = layerColors[move.originCube][alwaysMove[i]]
            newLayerInnerCubeMaterials[move.targetCube][alwaysMove[i]] = layerInnerCubeMaterials[move.originCube][alwaysMove[i]]
        }
    })

    edgeMoves.forEach(move => {
        for (let i = 0; i < move.targetSides.length; i++) {
            newLayerColors[move.targetCube][move.targetSides[i]] = layerColors[move.originCube][move.originSides[i]]
            newLayerInnerCubeMaterials[move.targetCube][move.targetSides[i]] = layerInnerCubeMaterials[move.originCube][move.originSides[i]]
        }
        for (let i = 0; i < alwaysMove.length; i++) {
            newLayerColors[move.targetCube][alwaysMove[i]] = layerColors[move.originCube][alwaysMove[i]]
            newLayerInnerCubeMaterials[move.targetCube][alwaysMove[i]] = layerInnerCubeMaterials[move.originCube][alwaysMove[i]]
        }
    })

    for (let i = 0; i < alwaysMove.length; i++) {
        newLayerColors[Cube.CENTER][alwaysMove[i]] = layerColors[Cube.CENTER][alwaysMove[i]]
        newLayerInnerCubeMaterials[Cube.CENTER][alwaysMove[i]] = layerInnerCubeMaterials[Cube.CENTER][alwaysMove[i]]
    }

    cubeColors[layer] = newLayerColors
    innerCubeMaterials[layer] = newLayerInnerCubeMaterials
    const layerCubes: Array<THREE.Mesh> = []
    const layerInnerCubes: Array<THREE.Mesh> = [];
    (layerGroup.children as Array<THREE.Group>).forEach(group => {
        const meshes = group.children.filter(c => c.type == 'Mesh')
        if (meshes[0]) {
            layerCubes.push(meshes[0] as THREE.Mesh)
        }
        if (meshes[1]) {
            layerInnerCubes.push(meshes[1] as THREE.Mesh)
        }
    })

    for (let i = 0; i < newLayerColors.length; i++) {
        const cubeColors = newLayerColors[i]
        const colors: Array<number> = []
        for (let j = 0; j < 6; j++) {
            for (let k = 0; k < 6; k++) {
                colors.push(...cubeColors[j])
            }
        }
        layerCubes[i].geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        (layerInnerCubes[i].material as THREE.ShaderMaterial[]) = newLayerInnerCubeMaterials[i]
    }
}

function rotateFaceColors(cornerMoves: Array<MoveWithLayer>, edgeMoves: Array<MoveWithLayer>, centerMoves: Array<MoveWithLayer>, alwaysMove: Array<TSide>) {
    const newCubeColors: Array<Array<Array<[number, number, number]>>> = []
    const newInnerCubeMaterials: Array<Array<Array<THREE.ShaderMaterial>>> = []
    for (let i = 0; i < 3; i++) {
        const newLayerColors: Array<Array<[number, number, number]>> = []
        const newLayerInnerCubeMaterials: Array<Array<THREE.ShaderMaterial>> = []
        for (let j = 0; j < 9; j++) {
            const colors: Array<[number, number, number]> = []
            const materials: Array<THREE.ShaderMaterial> = []
            for (let k = 0; k < 6; k++) {
                colors.push(Color.BLACK)
                materials.push(innerCubeBlackMaterial)
            }
            newLayerColors.push(colors)
            newLayerInnerCubeMaterials.push(materials)
        }
        newCubeColors.push(newLayerColors)
        newInnerCubeMaterials.push(newLayerInnerCubeMaterials)
    }
    cornerMoves.forEach(move => {
        for (let i = 0; i < move.targetSides.length; i++) {
            newCubeColors[move.targetLayer][move.targetCube][move.targetSides[i]] = cubeColors[move.originLayer][move.originCube][move.originSides[i]]
            newInnerCubeMaterials[move.targetLayer][move.targetCube][move.targetSides[i]] = innerCubeMaterials[move.originLayer][move.originCube][move.originSides[i]]
        }
        for (let i = 0; i < alwaysMove.length; i++) {
            newCubeColors[move.targetLayer][move.targetCube][alwaysMove[i]] = cubeColors[move.originLayer][move.originCube][alwaysMove[i]]
            newInnerCubeMaterials[move.targetLayer][move.targetCube][alwaysMove[i]] = innerCubeMaterials[move.originLayer][move.originCube][alwaysMove[i]]
        }
    })

    edgeMoves.forEach(move => {
        for (let i = 0; i < move.targetSides.length; i++) {
            newCubeColors[move.targetLayer][move.targetCube][move.targetSides[i]] = cubeColors[move.originLayer][move.originCube][move.originSides[i]]
            newInnerCubeMaterials[move.targetLayer][move.targetCube][move.targetSides[i]] = innerCubeMaterials[move.originLayer][move.originCube][move.originSides[i]]
        }
        for (let i = 0; i < alwaysMove.length; i++) {
            newCubeColors[move.targetLayer][move.targetCube][alwaysMove[i]] = cubeColors[move.originLayer][move.originCube][alwaysMove[i]]
            newInnerCubeMaterials[move.targetLayer][move.targetCube][alwaysMove[i]] = innerCubeMaterials[move.originLayer][move.originCube][alwaysMove[i]]
        }
    })

    centerMoves.forEach(move => {
        for (let i = 0; i < move.targetSides.length; i++) {
            newCubeColors[move.targetLayer][move.targetCube][move.targetSides[i]] = cubeColors[move.originLayer][move.originCube][move.originSides[i]]
            newInnerCubeMaterials[move.targetLayer][move.targetCube][move.targetSides[i]] = innerCubeMaterials[move.originLayer][move.originCube][move.originSides[i]]
        }
    })

    const cubes: Array<Array<THREE.Mesh>> = []
    const innerCubes: Array<Array<THREE.Mesh>> = []
    layers.children.forEach(layer => {
        const layerCubes: Array<THREE.Mesh> = []
        const layerInnerCubes: Array<THREE.Mesh> = [];
        (layer.children as Array<THREE.Group>).forEach(group => {
            const meshes = group.children.filter(c => c.type == 'Mesh')
            if (meshes[0]) {
                layerCubes.push(meshes[0] as THREE.Mesh)
            }
            if (meshes[1]) {
                layerInnerCubes.push(meshes[1] as THREE.Mesh)
            }
        })
        cubes.push(layerCubes)
        innerCubes.push(layerInnerCubes)
    })

    for (let i = 0; i < newCubeColors.length; i++) {
        const newLayerColors = newCubeColors[i]
        for (let j = 0; j < newLayerColors.length; j++) {
            const cubeColors = newLayerColors[j]
            const colors: Array<number> = []
            for (let k = 0; k < 6; k++) {
                for (let l = 0; l < 6; l++) {
                    colors.push(...cubeColors[k])
                }
            }
            cubes[i][j].geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            (innerCubes[i][j].material as THREE.ShaderMaterial[]) = newInnerCubeMaterials[i][j]
        }
    }

    cubeColors.splice(0, cubeColors.length, ...newCubeColors)
    innerCubeMaterials.splice(0, innerCubeMaterials.length, ...newInnerCubeMaterials)
}