import FileUploadForm from './components/FileUploadForm'
import TableComponent from './components/TableComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileUploadForm />} />
        <Route path="pagination" element={<TableComponent />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
