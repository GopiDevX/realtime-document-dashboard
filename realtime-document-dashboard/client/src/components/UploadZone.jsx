import { useCallback, useState } from 'react';

const UploadZone = ({ onFilesSelected, allowMultiple = true }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFiles = (files) => {
    // Only allow PDF files
    return Array.from(files).filter(file => file.type === 'application/pdf');
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      let files = validateFiles(e.dataTransfer.files);
      if (!allowMultiple && files.length > 0) {
        files = [files[0]];
      }
      if (files.length > 0) {
        onFilesSelected(files);
      }
      e.dataTransfer.clearData();
    }
  }, [onFilesSelected, allowMultiple]);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let files = validateFiles(e.target.files);
      if (!allowMultiple && files.length > 0) {
        files = [files[0]];
      }
      if (files.length > 0) {
        onFilesSelected(files);
      }
      // Reset input value so the same file can be selected again if needed
      e.target.value = null;
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-200 group ${
        isDragging 
          ? 'border-brand-500 bg-brand-50' 
          : 'border-gray-200 bg-white hover:border-brand-400 hover:bg-gray-50'
      }`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
        isDragging ? 'bg-brand-100 text-brand-600' : 'bg-gray-50 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-500'
      }`}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-1">
        {isDragging ? 'Drop PDFs here' : 'Drag & drop PDFs here'}
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
        Supports single or multiple PDF files. Ensure files are not password protected.
      </p>

      <label className="cursor-pointer relative">
        <span className="bg-brand-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm hover:bg-brand-700 hover:shadow transition-all active:scale-95 inline-block">
          Browse Files
        </span>
        <input 
          type="file" 
          className="hidden" 
          accept="application/pdf"
          multiple={allowMultiple}
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
};

export default UploadZone;
