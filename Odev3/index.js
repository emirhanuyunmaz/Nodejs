const {circleCircumference,circleArea} = require('./circle')

const radius=process.argv
let r=Number(process.argv[2])
circleArea(r)
circleCircumference(r)