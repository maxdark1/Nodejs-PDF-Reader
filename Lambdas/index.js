import { exportImages } from 'pdf-export-images'
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require('pdf-parse');
const fs = require('fs');

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


const pdftoRead = '../Patito_Feo.pdf';
await getText(pdftoRead);
await getImg(pdftoRead);


