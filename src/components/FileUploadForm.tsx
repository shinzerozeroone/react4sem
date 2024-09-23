import React, { useState } from 'react';
import { Document, Page, Text, StyleSheet, pdf, BlobProvider, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  image: {
    margin: 10,
    width: 200,
    height: 200,
  },
});


interface PDFDocumentProps {
  text: string;
  fileName: string | null;
  imageUrl: string | null; 
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ text, fileName, imageUrl }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.section}>Input Text: {text}</Text>
      {fileName && <Text style={styles.section}>Uploaded File: {fileName}</Text>}
      {imageUrl && <Image style={styles.image} src={imageUrl} />} 
    </Page>
  </Document>
);

const FileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const [text, setText] = useState('');

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); 
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

 
  const generatePDF = async () => {
    const pdfDoc = (
      <PDFDocument text={text} fileName={file ? file.name : null} imageUrl={imageUrl} />
    );
    const blob = await pdf(pdfDoc).toBlob();
    saveAs(blob, 'output.pdf');             
  };

  return (
    <div>
      <form>
        <div>
          <label>Upload File (Image):</label>
          <br />
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>
        <br />
        <br />
        <div>
          <label>Input Text:</label>
          <br />
          <input type="text" value={text} onChange={handleTextChange} />
          <br />
          <br />
        </div>
      </form>


      <BlobProvider
        document={<PDFDocument text={text} fileName={file ? file.name : null} imageUrl={imageUrl} />}
      >
        {({ url, loading }) => (
          <button type="button" onClick={generatePDF} disabled={loading}>
            {loading ? 'Generating PDF...' : 'Generate PDF'}
          </button>
        )}
      </BlobProvider>

      <Link to={'pagination'}><button>To Pagination</button></Link>

    </div>
  );
};

export default FileUploadForm;
