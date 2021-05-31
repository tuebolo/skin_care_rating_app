const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requiredString = {
  type: String,
  required: true
}

const requiredNumber = {
  type: Number,
  required: true
}

const requiredImage = new Schema({
  fileType: {
    type: String
  },
  data: {
    type: Buffer,
    required: true
  }
})

const SunscreenSchema = new Schema({
  name: requiredString,
  description: requiredString,
  spf: requiredNumber,
  brand: requiredString,
  price: requiredNumber,
  volume: requiredNumber,
  unit: requiredString,
  currency: requiredString,
  whitecast: requiredNumber,
  shine: requiredNumber,
  compatibility: requiredNumber,
  strongscent: requiredNumber,
  irritation: requiredNumber,
  ickiness: requiredNumber,
  image: requiredImage
})

const Sunscreen = mongoose.model('Sunscreen', SunscreenSchema)
module.exports = Sunscreen
