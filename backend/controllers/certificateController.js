const db = require('../config/db');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const crypto = require('crypto');

exports.getMyCertificates = async (req, res, next) => {
  try {
    const student_id = req.user.student_id;
    const [certificates] = await db.execute(`
      SELECT c.cert_id, c.issue_date, c.unique_verification_hash, e.title AS event_title, e.date AS event_date, e.venue, r.reg_id
      FROM Certificates c
      JOIN Registrations r ON c.reg_id = r.reg_id
      JOIN Events e ON r.event_id = e.event_id
      WHERE r.student_id = ?
      ORDER BY c.issue_date DESC`,
      [student_id]
    );

    res.status(200).json({
      success: true,
      data: certificates,
      message: 'Certificates fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.downloadCertificatePDF = async (req, res, next) => {
  try {
    const cert_id = req.params.id;
    
    // Get certificate data
    const [certData] = await db.execute(`
      SELECT c.cert_id, c.unique_verification_hash, c.issue_date, 
             s.name as student_name, s.department, u.email,
             e.title as event_title, e.date as event_date
      FROM Certificates c
      JOIN Registrations r ON c.reg_id = r.reg_id
      JOIN Students s ON r.student_id = s.student_id
      JOIN Users u ON s.user_id = u.user_id
      JOIN Events e ON r.event_id = e.event_id
      WHERE c.cert_id = ?`,
      [cert_id]
    );

    if (certData.length === 0) {
      return res.status(404).json({ success: false, data: null, message: 'Certificate not found' });
    }

    const data = certData[0];

    if (req.user.role !== 'Admin' && data.email !== req.user.email) {
      return res.status(403).json({ success: false, data: null, message: 'Not authorized to download this certificate' });
    }

    // Generate PDF
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape'
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Certificate_${data.student_name.replace(/\\s+/g, '_')}.pdf`);

    doc.pipe(res);

    // Styling the PDF
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0f172a');
    
    // Add text
    doc.fillColor('#eab308')
       .fontSize(40)
       .text('CERTIFICATE OF PARTICIPATION', 0, 150, { align: 'center' });

    doc.fillColor('#ffffff')
       .fontSize(20)
       .text('This is to certify that', 0, 220, { align: 'center' });

    doc.fillColor('#3b82f6')
       .fontSize(35)
       .text(data.student_name, 0, 260, { align: 'center' });

    doc.fillColor('#ffffff')
       .fontSize(20)
       .text(`from ${data.department} has successfully participated in`, 0, 310, { align: 'center' });

    doc.fillColor('#eab308')
       .fontSize(30)
       .text(data.event_title, 0, 360, { align: 'center' });

    const eventDateStr = new Date(data.event_date).toLocaleDateString();
    doc.fillColor('#ffffff')
       .fontSize(16)
       .text(`held on ${eventDateStr}`, 0, 410, { align: 'center' });

    // Generate QR Code
    // The verify route will be accessible publicly
    const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/certificates/verify/${data.unique_verification_hash}`;
    const qrImage = await QRCode.toDataURL(verifyUrl);

    // Embed QR code image in PDF
    // QRCode.toDataURL returns a base64 string like "data:image/png;base64,....."
    const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, 'base64');
    
    doc.image(imgBuffer, doc.page.width / 2 - 50, 450, { width: 100 });

    doc.fontSize(10)
       .fillColor('#94a3b8')
       .text(`Verification Hash: ${data.unique_verification_hash}`, 0, 560, { align: 'center' });

    doc.end();

  } catch (error) {
    next(error);
  }
};

exports.verifyCertificate = async (req, res, next) => {
  try {
    const hash = req.params.hash;
    const [certData] = await db.execute(`
      SELECT c.issue_date, s.name as student_name, e.title as event_title, e.date as event_date
      FROM Certificates c
      JOIN Registrations r ON c.reg_id = r.reg_id
      JOIN Students s ON r.student_id = s.student_id
      JOIN Events e ON r.event_id = e.event_id
      WHERE c.unique_verification_hash = ?`,
      [hash]
    );

    if (certData.length === 0) {
      return res.status(404).json({ success: false, data: null, message: 'Invalid or forged certificate' });
    }

    res.status(200).json({
      success: true,
      data: certData[0],
      message: 'Certificate is valid'
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCertificates = async (req, res, next) => {
  try {
    const [certificates] = await db.execute(`
      SELECT c.cert_id, c.issue_date, c.unique_verification_hash, 
             s.name as student_name, e.title as event_title
      FROM Certificates c
      JOIN Registrations r ON c.reg_id = r.reg_id
      JOIN Students s ON r.student_id = s.student_id
      JOIN Events e ON r.event_id = e.event_id
      ORDER BY c.issue_date DESC
    `);

    res.status(200).json({
      success: true,
      data: certificates,
      message: 'All certificates fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.generateCertificate = async (req, res, next) => {
  try {
    const { reg_id } = req.body;
    if (!reg_id) return res.status(400).json({success: false, message: 'reg_id is required'});

    const [existing] = await db.execute('SELECT cert_id FROM Certificates WHERE reg_id = ?', [reg_id]);
    if (existing.length > 0) {
      return res.status(400).json({success: false, message: 'Certificate already exists for this registration'});
    }

    const hash = crypto.createHash('sha256').update(`${reg_id}-${Date.now()}-${Math.random()}`).digest('hex');
    const [result] = await db.execute(
      'INSERT INTO Certificates (reg_id, issue_date, unique_verification_hash) VALUES (?, NOW(), ?)',
      [reg_id, hash]
    );

    res.status(201).json({
      success: true,
      data: { cert_id: result.insertId, hash },
      message: 'Certificate generated successfully'
    });
  } catch (error) {
    next(error);
  }
};
