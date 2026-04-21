const express = require('express');
const { 
  getMyCertificates, 
  downloadCertificatePDF, 
  verifyCertificate,
  getAllCertificates,
  generateCertificate
} = require('../controllers/certificateController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Student route
router.get('/my', authenticate, getMyCertificates);

// Mixed route (can be used by both, controller has validation)
router.get('/:id/download', authenticate, downloadCertificatePDF);

// Public routing for verifying Certificates
router.get('/verify/:hash', verifyCertificate);

// Admin route
router.get('/', authenticate, authorize('Admin'), getAllCertificates);
router.post('/generate', authenticate, authorize('Admin'), generateCertificate);

module.exports = router;
