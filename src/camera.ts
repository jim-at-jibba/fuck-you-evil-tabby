import {spawn} from "child_process"

let count: number = 1
let hasMotion: boolean = false

export function startPhoto() {
  hasMotion = true
  console.log("START :: hasMotion is ", hasMotion)
}

export function stopPhoto() {
  hasMotion = false
  console.log("STOP :: hasMotion is ", hasMotion)
}

// Take a photo with the camera module using Raspistill on the command line with spawn
export function takePhoto() {
  console.log("Taking photo...")
  if (!hasMotion) return

  // eslint-disable-next-line node/no-path-concat
  const filename = `~/code/photos/image_${count}.jpg`
  // const args = [
  //   "-rot", // rotate 90 degrees
  //   "90",
  //   "-n", // no preview
  //   "-t", // time to take photo
  //   "1000", // 1 second
  //   "-w", // width
  //   "400",
  //   "-h", // height
  //   "400",
  //   "-ev",
  //   "auto",
  //   "auto",
  //   "-o",
  //   filename,
  // ]
  const args = ["-o", filename]
  const child = spawn("raspistill", args)

  child.on("exit", (code) => {
    console.log(filename + " was taken")
    count++
    if (hasMotion) takePhoto()
  })
}
