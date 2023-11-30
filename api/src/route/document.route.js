const { Router } = require('express');;
const DocumentController = require('../controller/document.controller');
const multer = require("multer");
const uuid = require("uuid").v4;



module.exports = (UPLOADS) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const fPath = UPLOADS;
            cb(null, fPath);
        },
        filename: function (req, file, cb) {
            const arr = file.originalname.split('.');
            const ext = arr[arr.length - 1];
            const fileUrl = `${uuid().replace(/-/g, '')}.${ext}`;
            req.filePath = './uploads/' + fileUrl;
            cb(null, fileUrl);
        }
    });

    const upload = multer({ storage });



    let router = new Router()

    router.post('/', upload.single("document"),async (req, res) => {
        const documentData = req.body;
        documentData.fileUrl = req.filePath
        const { ok, data, message } = await DocumentController.createDocument(documentData);

        if (ok) {
            res.status(201).json({ ok, data });
        } else {
            res.status(400).json({ ok, message });
        }
    });

    router.get('/:id', async (req, res) => {
        const documentId = req.params.id;
        const { ok, message, data } = await DocumentController.getDocumentById(documentId);

        if (ok) {
            res.status(200).json({ ok, message, data });
        } else {
            res.status(404).json({ okay, message });
        }
    });

    router.put('/:id', async (req, res) => {
        const documentId = req.params.id;
        const updatedData = req.body;
        const { ok, message, data } = await DocumentController.updateDocument(documentId, updatedData);

        if (ok) {
            res.status(200).json({ ok, message, data });
        } else {
            res.status(404).json({ ok, message });
        }
    });

    router.delete('/:id', async (req, res) => {
        const documentId = req.params.id;
        const { ok, message, data } = await DocumentController.deleteDocument(documentId);

        if (okay) {
            res.status(200).json({ ok, message, data });
        } else {
            res.status(404).json({ ok, message });
        }
    });

    router.get('/', async (req, res) => {
        const { ok, message, data } = await DocumentController.getAllDocuments();

        if (ok) {
            res.status(200).json({ ok, message, data });
        } else {
            res.status(404).json({ ok, message });
        }
    });

    return router

}
