const shortid = require('shortid');
const URL = require('../model/url.js');

async function handleGenerateShortUrl(req, res) {
  // console.log('getting the url')
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: 'URL is required' });
  }
  // console.log('generating short id')
  const shortID = shortid(); // To get 8 characters like nanoid
  
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: []
  });
  

  // console.log('sending response')
  // return res.json({ id: shortID });
  res.redirect(`/url/${shortID}`)
}

module.exports = {
  handleGenerateShortUrl
};