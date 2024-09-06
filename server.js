const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the directory where you want to save the files
const uploadDir = 'C:\\Users\\ASUS\\hh-fcc\\hardhat_practice';

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();
const port = 5500;

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Save the file with the shortName and the correct file extension
        const shortName = req.body.shortName;
        const fileExt = path.extname(file.originalname);
        const filename = `${shortName}${fileExt}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// Handle file upload and save
app.post('/api/upload', upload.single('logo'), (req, res) => {
    const { partyName, shortName, area } = req.body;

    // Here, you can add the logic to save the party details (partyName, shortName, area)
    // to a database or to the blockchain, as needed.

    console.log('Party Name:', partyName);
    console.log('Short Name:', shortName);
    console.log('Area:', area);
    console.log('File saved as:', req.file.filename);

    res.json({ message: 'Party added successfully!' });
});

// Serve static files for the frontend
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
