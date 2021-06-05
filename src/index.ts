import {Gpio} from "onoff"
const pir = new Gpio(4, "in", "both")

console.log("Starting kitty cam")

pir.watch((err, value) => {
  if (err) {
    throw err
  }

  console.log(value)

  if (value === 1) {
    console.log("motion DETECTED!")
  } else if (value === 0) {
    console.log("motion STOPPED!")
  }
})

// Ctrl-C
process.on("SIGINT", (_) => {
  pir.unexport()
})
