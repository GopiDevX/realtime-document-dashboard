import { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '../socket/socketClient';
import DocumentTable from '../components/DocumentTable';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

  const fetchDocuments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${SERVER_URL}/api/documents`);
      setDocuments(response.data.data);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Failed to load documents. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();

    // Listen for real-time document uploads
    const handleNewDocument = (newDoc) => {
      // Add the new document to the top of the list
      setDocuments((prev) => {
        // Prevent duplicates just in case
        if (prev.some(d => d._id === newDoc.id)) return prev;
        
        // Transform socket payload to match schema if necessary
        const formattedDoc = {
          _id: newDoc.id,
          filename: newDoc.filename,
          originalName: newDoc.originalName,
          size: newDoc.size,
          status: newDoc.status,
          uploadDate: newDoc.uploadDate || new Date().toISOString()
        };
        
        return [formattedDoc, ...prev];
      });
    };

    socket.on('document-uploaded', handleNewDocument);

    return () => {
      socket.off('document-uploaded', handleNewDocument);
    };
  }, []);

  const handleDownload = (id, originalName) => {
    // Initiate download by creating a temporary link
    const url = `${SERVER_URL}/api/documents/download/${id}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = originalName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Documents Library</h2>
          <p className="text-gray-500">
            View, manage, and download all your uploaded PDF documents.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button 
            onClick={fetchDocuments}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl font-medium text-gray-600 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm hover:shadow"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Refresh
          </button>
        </div>
      </div>

      <DocumentTable 
        documents={documents} 
        isLoading={isLoading} 
        error={error} 
        onDownload={handleDownload} 
      />
    </div>
  );
};

export default Documents;
