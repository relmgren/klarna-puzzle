import React, {Component} from 'react'
import './CellularAutomata.css'

const x = 30
const y = 50

let c
let ctx

let nextGen = function(center, left, right, topleft, topright, top, bottomleft, bottomright, bottom) {
  let count = 0
  let centerColor = ctx.getImageData(arguments[0][0], arguments[1][1], 1, 1).data;

  for (let i = 1; i < arguments.length; i++) {
    let color = ctx.getImageData(arguments[i][0], arguments[i][1], 1, 1).data;
    if (color[3] == 255) count++
  }

  if  (centerColor[3] == 255 && (count == 2 || count == 3)){
    console.log("survive")
    return "survive"
  } else if (centerColor[3] == 255) {
    console.log("death")
    return "death"
  } else if (count == 3) {
    console.log("birth")
    return "birth"
  }
}


class CellularAutomata extends Component {

  constructor(props) {
    super(props)

    this.state = {
      row: [
        [15,15], [16,15], [17,15], [18,15], [19,15], [20,15], [21,15], [22,15], [23,15], [24,15]
      ],
      generationCount: 0
    }
  }

  tick() {


    let newRow = []
    let neigbors = 0
    ctx.fillStyle == "FFFFFF"

    for (let i = 1; i < x - 1; i++) {
      for (let j = 1; j < y - 1; j++) {
        let center = [i, j]

        let left = [i - 1, j]
        let right = [i + 1, j]

        let topleft = [i - 1, j + 1]
        let topright = [i + 1, j + 1]
        let top = [i, j + 1]

        let bottomleft = [i - 1, j - 1]
        let bottomright = [i + 1, j - 1]
        let bottom = [i, j - 1]

        let result = nextGen(center, left, right, topleft, topright, top, bottomleft, bottomright, bottom)
        if (result == "survive") {
          newRow.push(center)
        } else if (result == "birth") {
          newRow.push(center)
        } else if (result == "death") {
          ctx.fillRect(center[0], center[1], 1, 1)
        }
      }
    }
    this.setState({
      row: newRow,
      generationCount: this.state.generationCount + 1
    })

    ctx.fillStyle = "000000"

    this.state.row.forEach( pixel => {
      if (pixel[1] + 1 > x) {
        ctx.fillRect(pixel[0], 0, 1, 1)
      } else {
        ctx.fillRect(pixel[0], pixel[1] + 1, 1, 1)
      }

    })
  }



  componentDidMount() {
    c = document.getElementById("canvas")
    ctx = c.getContext("2d")
    ctx.fillStyle = "FF0000"
    this.state.row.forEach( pixel => {
      ctx.fillRect(pixel[0], pixel[1], 1, 1)
      let color = ctx.getImageData(pixel[0], pixel[1], 1, 1).data
      console.log(color)
    })
    let color = ctx.getImageData(0, 0, 1, 1).data
    console.log(color)

    this.timer = setInterval(
      () => {
        if (this.state.generationCount >= 50) return
        this.tick()
      }, 1000
    )
  }

  render() {
    return (
      <div className="canvasDiv">
        <canvas id="canvas" width={x} height={y}></canvas>
        <p>Generations: {this.state.generationCount}</p>
      </div>
    )
  }
}


export default CellularAutomata
