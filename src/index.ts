import {Gpio} from "onoff"
import {startPhoto, takePhoto, stopPhoto} from "./camera"
const pir = new Gpio(4, "in", "both")

console.log("Starting kitty cam")

pir.watch((err, value) => {
  if (err) {
    throw err
  }

  console.log(value)

  if (value === 1) {
    console.log("motion DETECTED!")
    startPhoto()
    takePhoto()
  } else if (value === 0) {
    console.log("motion STOPPED!")
    stopPhoto()
  }
})

// Ctrl-C
process.on("SIGINT", (_) => {
  pir.unexport()
})
