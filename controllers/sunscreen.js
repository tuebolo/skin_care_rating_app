const multer = require('multer')

const SunscreenSchema = require('../models/sunscreen')
const Rating = require('../models/Rating')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

async function saveSunscreen (body, image) {
  const newSunscreen = new SunscreenSchema({
    name: body.name,
    description: body.description,
    spf: body.spf,
    brand: body.brand,
    price: body.price,
    volume: body.volume,
    unit: body.unit,
    currency: body.currency,
    whitecast: body.whitecast,
    shine: body.shine,
    compatibility: body.compatibility,
    strongscent: body.strongscent,
    irritation: body.irritation,
    ickiness: body.ickiness,
    image: {
      fileType: image.mimetype,
      data: image.buffer
    }
  })
  return await newSunscreen.save()
}

module.exports.controller = (app) => {
  // fetch all sunscreens
  app.get('/sunscreens', (req, res) => {
    SunscreenSchema.find({}, 'name description spf brand price volume unit currency whitecast shine compatibility strongscent irritation ickiness', (error, sunscreens) => {
      if (error) {
        console.log(error)
      }
      res.send({
        sunscreens
      })
    })
  })

  // fetch a single sunscreen
  app.get('/api/sunscreens/:id', (req, res) => {
    SunscreenSchema.findById(req.params.id, 'name description spf brand price volume unit currency whitecast shine compatibility strongscent irritation ickiness', (error, sunscreen) => {
      if (error) {
        console.error(error)
      }
      res.send(sunscreen)
    })
  })

  app.get('/api/sunscreens/:id/image', async (req, res) => {
    const {image} = await SunscreenSchema.findById(req.params.id, 'image')
    if (!image) {
      res.send('ERROR')
      return
    }
    res.type(image.fileType)
    res.send(image.data)
  })

  // rate a move
  app.post('/sunscreens/rate/:id', (req, res) => {
    const rating = new Rating({
      sunscreen_id: req.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate
    })
    rating.save(function (error, rating) {
      if (error) {
        console.log(error)
      }
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate
      })
    })
  })

  const cpUpload = upload.fields([{name: 'files', maxCount: 1}, {name: 'data', maxCount: 1}])

  app.post('/sunscreensdata', cpUpload, async (req, res) => {
    try {
      const file = req.files.files[0]
      const data = req.files.data[0]
      const rawBody = Buffer.from(data.buffer).toString('utf-8')
      const body = JSON.parse(rawBody)
      const sunscreen = await saveSunscreen(body, file)
      res.send(sunscreen)
    } catch (e) {
      console.error(e)
      res.send('ERROR')
    }
  })

  // add a new sunscreen
  app.post('/sunscreens', async (req, res) => {
    try {
      const sunscreen = await saveSunscreen(req.body)
      res.send(sunscreen)
    } catch (e) {
      console.error(e)
      res.send('ERROR')
    }
  })
}
