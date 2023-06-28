import { exportImages } from 'pdf-export-images'
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require('pdf-parse');
const fs = require('fs');
const AWS = require('aws-sdk');

const getText = async (file) => {
    let readFileSync = fs.readFileSync(file);
    try{
        let pdfExtract = await pdfParse(readFileSync);
        console.log('File content: ', pdfExtract.text);
        console.log('Total pages: ', pdfExtract.numpages);
        console.log('All content: ', pdfExtract.info);
    }
    catch (error){
        throw new Error(error);
    }
}

const getImg = async (file) => {
   exportImages(file, '../output')
  .then(
        images => console.log('Exported', images.length, 'images')
    )
  .catch(
        console.error
    );
}

const getS3BucketFile = async (file) => {
    const s3 = new AWS.S3();ß
    const params = {Bucket: 'NeorisBucket', Key: file};
    const response = await s3.getObject(params).promise();
}

const pdftoRead = '../Patito_Feo.pdf';
/*Get the file from the local file System*/
await getText(pdftoRead);
await getImg(pdftoRead);
/*Get the file from S3 Bucket*/
await getText(getS3BucketFile);
await getImg(getS3BucketFile);


