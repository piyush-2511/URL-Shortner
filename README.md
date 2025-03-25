# URL Shortener Application

## Overview
This is a simple URL Shortener application built using **Node.js** with the **Express.js** framework for the backend and **EJS** for the frontend. The application allows users to input a URL, generate a shortened version, and view a history of shortened URLs with timestamps.

## Features
- Shorten long URLs with a single click.
- View a history of shortened URLs with time and date.
- Easy-to-use web interface.

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd url-shortener
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000/url
   ```

## Usage
1. Visit `http://localhost:3000/url` in your browser.
2. Paste the URL you want to shorten.
3. Click the "Generate" button to create a short URL.
4. The generated short URL will be displayed.
5. A history of all shortened URLs along with their timestamps will be listed at the bottom.

## Technologies Used
- **Node.js** - Backend runtime environment
- **Express.js** - Web framework for handling server logic
- **EJS** - Templating engine for rendering UI
- **MongoDB** - Database for storing shortened URLs and history

## Folder Structure
```
url-shortener/
│-- public/         # Static files (CSS, JS, Images)
│-- views/          # EJS templates for rendering UI
│-- routes/         # Express routes
│-- models/         # Database models (if using MongoDB)
│-- app.js          # Main application file
│-- package.json    # Node.js dependencies and scripts
```
