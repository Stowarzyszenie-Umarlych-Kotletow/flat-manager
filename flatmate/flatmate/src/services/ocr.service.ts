import axios from "../helpers/authorized-api-client";
import { Transaction } from "../models/transaction.model";

export class OcrService {
    uploadReceipt(blob: Blob) {
        const formData = new FormData();
        formData.append('file', blob);
        return axios.post<Transaction[]>("/ocr/upload", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
    }

};

const ocrService = new OcrService();

export default ocrService; 