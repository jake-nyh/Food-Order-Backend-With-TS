import fs from 'fs'
import { PDFDocument } from "pdf-lib";

export const compressFile = async (existingToBytes: any, originalname: any)=>{
    const pdfDoc = await PDFDocument.load(existingToBytes)
    const compressPdfBytes = await pdfDoc.save()
    fs.writeFileSync('./uploads/compressed/${originalname}',compressPdfBytes)
  }