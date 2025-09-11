import dotenv from 'dotenv';
import express from 'express';
import TransporterModel from './models/transporter.model.js';
import connect from './utils/connect.js';

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();

// Route to generate transporter data
app.get('/generate', async (req, res) => {
  const transporters = generateTransporters(200); // Generate 20 transporter objects
  if (transporters) {
    console.log('🚀 ~ app.get ~ transporters:', transporters);
    const createdTransporters = await TransporterModel.create(transporters);
    res.json(createdTransporters);
  }
});

// Function to generate transporter objects
function generateTransporters(count) {
  const transporters = [];

  for (let i = 0; i < count; i++) {
    const transporter = {
      fName: generateName(),
      lName: generateName(),
      country: generateCountry(),
      phone: generatePhoneNumber(),
      email: generateEmail(),
      companyName: generateCompanyName(),
      type: generateType(),
      avatarUrl: '/assets/transporters/avatar.png', // You can adjust this as needed
      images: generateImages(), // Function to generate random image URLs
      companyType: generateCompanyType(),
      trajectory: generateTrajectory(),
    };

    transporters.push(transporter);
  }

  return transporters;
}

// Function to generate a random name
function generateName() {
  const names = [
    'John',
    'Emma',
    'Max',
    'Alice',
    'Sophia',
    'Daniel',
    'Ella',
    'Liam',
    'Olivia',
    'David',
  ];
  return names[Math.floor(Math.random() * names.length)];
}

// Function to generate a random country
function generateCountry() {
  const countries = [
    'France',
    'Germany',
    'Italy',
    'Spain',
    'Portugal',
    'Netherlands',
    'Belgium',
  ];
  return countries[Math.floor(Math.random() * countries.length)];
}

// Function to generate a random phone number
function generatePhoneNumber() {
  const phoneNumber = '+3' + Math.floor(Math.random() * 10000000000); // Generate a random 10-digit number
  return phoneNumber;
}

// Function to generate a random email
function generateEmail() {
  const email = 'user' + Math.floor(Math.random() * 1000) + '@example.com'; // Generate a random email
  return email;
}

// Function to generate a random company name
function generateCompanyName() {
  const companies = [
    'Swift Logistics',
    'Transporter Express',
    'Speedy Freight',
    'Fast Track Logistics',
    'Prime Transport',
  ];
  return companies[Math.floor(Math.random() * companies.length)];
}

// Function to generate a random transporter type
function generateType() {
  const types = ['Individual', 'Agency'];
  return types[Math.floor(Math.random() * types.length)];
}

// Function to generate an array of random image URLs
function generateImages() {
  const images = [];
  const numImages = Math.floor(Math.random() * 3) + 1; // Generate 1 to 3 random images
  for (let i = 0; i < numImages; i++) {
    images.push(
      `/assets/transporters/image${Math.floor(Math.random() * 12) + 1}.png`
    ); // Adjust as needed
  }
  return images;
}

// Function to generate a random company type
function generateCompanyType() {
  const companyTypes = [
    'Logistics',
    'Freight',
    'Shipping',
    'Transportation',
    'Courier',
  ];
  return companyTypes[Math.floor(Math.random() * companyTypes.length)];
}

// Function to generate a random trajectory
function generateTrajectory() {
  return {
    departurePoint: generateCity(),
    departureCoordinates: generateCoordinates(),
    departureTime: generateDateTime(),
    destinationPoint: generateCity(),
    destinationCoordinates: generateCoordinates(),
    destinationTime: generateDateTime(),
    checkPoints: generateCheckPoints(),
  };
}

// Function to generate a random city
function generateCity() {
  const cities = [
    'Paris',
    'Berlin',
    'Rome',
    'Madrid',
    'Barcelona',
    'Lisbon',
    'Brussels',
    'Amsterdam',
    'Prague',
    'Vienna',
  ];
  return cities[Math.floor(Math.random() * cities.length)];
}

// Function to generate random coordinates
function generateCoordinates() {
  const longitude = Math.random() * 360 - 180; // Generate random longitude between -180 and 180
  const latitude = Math.random() * 180 - 90; // Generate random latitude between -90 and 90

  // Check if latitude is within the valid range
  if (latitude < -90 || latitude > 90) {
    console.error(`Invalid latitude value generated: ${latitude}`);
  }

  return [longitude, latitude];
}

// Function to generate a random date and time
function generateDateTime() {
  const year = 2024;
  const month = Math.floor(Math.random() * 12) + 1; // Generate random month between 1 and 12
  const day = Math.floor(Math.random() * 28) + 1; // Generate random day between 1 and 28
  const hour = Math.floor(Math.random() * 24); // Generate random hour between 0 and 23
  const minute = Math.floor(Math.random() * 60); // Generate random minute between 0 and 59
  return new Date(year, month - 1, day, hour, minute).toISOString();
}

// Function to generate random checkpoints
function generateCheckPoints() {
  const numCheckPoints = Math.floor(Math.random() * 3) + 1; // Generate 1 to 3 random checkpoints
  const checkPoints = [];
  for (let i = 0; i < numCheckPoints; i++) {
    const checkPoint = {
      city: generateCity(),
      time: generateDateTime(),
      coordinates: generateCoordinates(),
    };
    checkPoints.push(checkPoint);
  }
  return checkPoints;
}

// Define the port
const port = 3000;

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  await connect();
});
