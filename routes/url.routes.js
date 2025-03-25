const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const urlModel = require('../model/url.js');

// Home page
router.get('/', (req, res) => {
  res.render('home', { id: null });
});

// Create short URL
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({ message: 'URL is required' });
    }
    
    // URL validation
    try {
      new URL(body.url);
    } catch (err) {
      return res.status(400).render('home', { 
        id: null, 
        error: 'Please enter a valid URL (include http:// or https://)' 
      });
    }
    
    // Check if URL already exists in database
    const existingUrl = await urlModel.findOne({ redirectUrl: body.url });
    if (existingUrl) {
      return res.render('home', { id: existingUrl.shortId });
    }
    
    // Generate new short URL
    const shortID = shortid.generate();
    
    await urlModel.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: []
    });
    
    res.render('home', { id: shortID });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).render('home', { id: null, error: 'Server error, please try again' });
  }
});

// Redirect to original URL
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const entry = await urlModel.findOne({ shortId: id });
    
    if (!entry) {
      return res.status(404).render('404', { message: 'Short URL not found' });
    }
    
    // Add visit to history
    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save();
    
    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).render('error', { message: 'Server error, please try again' });
  }
});

// Get analytics for a URL
router.get('/analytics/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const entry = await urlModel.findOne({ shortId: id });
    
    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    
    res.json({
      totalClicks: entry.visitHistory.length,
      analytics: {
        shortUrl: `${req.protocol}://${req.get('host')}/url/${id}`,
        originalUrl: entry.redirectUrl,
        created: entry.createdAt,
        lastVisit: entry.visitHistory.length > 0 ? 
          entry.visitHistory[entry.visitHistory.length - 1].timestamp : null,
        visits: entry.visitHistory
      }
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;