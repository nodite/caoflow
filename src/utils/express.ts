import bodyParser from 'body-parser'
import express from 'express'
import * as httpContext from 'express-http-context'

const createApp = (config?: {bodyParse?: boolean}) => {
  const app = express()

  app.use(httpContext.middleware)

  if (config?.bodyParse) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
  }

  app.get('/health', (req, res) => {
    res.status(200).send(true)
  })

  return app
}

export default {createApp}
