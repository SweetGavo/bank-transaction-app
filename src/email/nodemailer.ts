const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// OAuth2 credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI; // Redirect URI used during OAuth setup
const REFRESH_TOKEN = process.env.REFRESH_TOKEN; // Refresh token obtained from OAuth setup

// Create a new OAuth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Create a Nodemailer transporter using OAuth2
 export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'longgaving@gmail.com',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,

  },
});

