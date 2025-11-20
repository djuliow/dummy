const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000; // Using a different port to avoid conflicts

app.use(cors());

// --- File Upload Logic ---

const uploadsDir = path.join(__dirname, 'uploads');
// Ensure the uploads directory exists
fs.mkdirSync(uploadsDir, { recursive: true });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(uploadsDir));

// The upload endpoint, now configured for specific fields
app.post(
  '/upload',
  upload.fields([
    { name: 'fotoMempelaiWanita', maxCount: 1 },
    { name: 'fotoMempelaiPria', maxCount: 1 },
    { name: 'musik', maxCount: 1 },
    { name: 'galeriFoto', maxCount: 10 }
  ]),
  (req, res) => {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }

    const paths = {};
    // Process single files
    if (req.files.fotoMempelaiWanita) {
      paths.fotoMempelaiWanita = `http://localhost:${port}/uploads/${req.files.fotoMempelaiWanita[0].filename}`;
    }
    if (req.files.fotoMempelaiPria) {
      paths.fotoMempelaiPria = `http://localhost:${port}/uploads/${req.files.fotoMempelaiPria[0].filename}`;
    }
    if (req.files.musik) {
      paths.musik = `http://localhost:${port}/uploads/${req.files.musik[0].filename}`;
    }
    // Process multiple files for gallery
    if (req.files.galeriFoto) {
      paths.galeriFoto = req.files.galeriFoto.map(file => `http://localhost:${port}/uploads/${file.filename}`);
    }

    res.json({
      message: 'Files uploaded successfully!',
      paths: paths
    });
  }
);


app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
