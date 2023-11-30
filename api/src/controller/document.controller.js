const DocumentModel = require("../model/document.model");
class DocumentController {
    constructor() {
        this.Document = DocumentModel;
    }



    async createDocument(documentData) {
        try {
            const document = new this.Document(documentData);
            const newDocument = await document.save();
            return { ok: true, message: 'Document created successfully', data: newDocument };
        } catch (error) {
            return { ok: false, message: `Could not create document: ${error.message}` };
        }
    }

    async getDocumentById(documentId) {
        try {
            const document = await this.Document.findById(documentId);
            if (!document) {
                return { ok: false, message: 'Document not found' };
            }
            return { ok: true, message: 'Document retrieved successfully',data: document };
        } catch (error) {
            return { ok: false, message: `Could not retrieve document: ${error.message}` };
        }
    }

    async updateDocument(documentId, updatedData) {
        try {
            const document = await this.Document.findByIdAndUpdate(documentId, updatedData, {
                new: true,
                runValidators: true,
            });
            if (!document) {
                return { ok: false, message: 'Document not found' };
            }
            return { ok: true, message: 'Document updated successfully',data: document };
        } catch (error) {
            return { okay: false, message: `Could not update document: ${error.message}` };
        }
    }

    async deleteDocument(documentId) {
        try {
            const deletedDocument = await this.Document.findByIdAndDelete(documentId);
            if (!deletedDocument) {
                return { ok: false, message: 'Document not found' };
            }
            return { ok: true, message: 'Document deleted successfully', data: deletedDocument };
        } catch (error) {
            return { ok: false, message: `Could not delete document: ${error.message}` };
        }
    }

    async getAllDocuments() {
        try {
            const documents = await this.Document.find();
            return { ok: true, message: 'Documents retrieved successfully',data: documents };
        } catch (error) {
            return { ok: false, message: `Could not retrieve documents: ${error.message}` };
        }
    }
}

module.exports = new DocumentController
