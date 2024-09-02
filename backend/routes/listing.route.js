import express from 'express'
import multer from "multer"
import { createListing } from '../controller/listing.controller.js'
const router = express.Router()


// multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  })

  const upload = multer({ storage })
  router.post("/create", upload.array("listingPhotos"), createListing)


export default router 