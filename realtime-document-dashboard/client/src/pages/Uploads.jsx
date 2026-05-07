import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { socket } from '../socket/socketClient';
import UploadZone from '../components/UploadZone';
import FilePreviewCard from '../components/FilePreviewCard';

const Uploads = () => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFilesSelected = (newFiles) => {
    // Prevent duplicates by checking name and size
    const filteredNew = newFiles.filter(newFile => 
      !files.some(existing => existing.file.name === newFile.name && existing.file.size === newFile.size)
    );

    const newFileObjects = filteredNew.map(file => ({
      file,
      status: 'pending', // pending, uploading, completed, failed
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFileObjects]);
    setIsCollapsed(false); // uncollapse when new files are added
  };

  const removeFile = (fileName) => {
    setFiles(prev => prev.filter(f => f.file.name !== fileName));
  };

  const uploadFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'failed');
    if (pendingFiles.length === 0) return;

    setIsUploading(true);

    const isBulk = pendingFiles.length > 3;

    if (isBulk) {
      setIsCollapsed(true);
      toast(`Upload in progress — processing ${pendingFiles.length} files in background`, {
        icon: '⏳',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

    const uploadPromises = pendingFiles.map(async (fileObj) => {
      // Mark as uploading
      updateFileStatus(fileObj.file.name, 'uploading', 0);

      const formData = new FormData();
      formData.append('document', fileObj.file);

      try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
        
        await axios.post(`${SERVER_URL}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            updateFileStatus(fileObj.file.name, 'uploading', percentCompleted);
          }
        });

        // Mark as completed
        updateFileStatus(fileObj.file.name, 'completed', 100);
        return true;
      } catch (error) {
        console.error('Upload failed for', fileObj.file.name, error);
        updateFileStatus(fileObj.file.name, 'failed', 0);
        return false;
      }
    });

    const results = await Promise.allSettled(uploadPromises);
    
    // Count successful uploads
    const successCount = results.filter(r => r.status === 'fulfilled' && r.value === true).length;

    setIsUploading(false);

    if (isBulk && successCount > 0) {
      // Emit event to backend which will broadcast to all clients including this one
      socket.emit('bulk-upload-complete', { count: successCount });
    } else if (successCount > 0 && !isBulk) {
      // Small uploads get a normal toast
      toast.success(`${successCount} files uploaded successfully!`);
    } else if (successCount === 0) {
      toast.error('All uploads failed. Please try again.');
    }
  };

  const updateFileStatus = (fileName, status, progress) => {
    setFiles(prev => prev.map(f => {
      if (f.file.name === fileName) {
        return { ...f, status, progress };
      }
      return f;
    }));
  };

  const pendingCount = files.filter(f => f.status === 'pending' || f.status === 'failed').length;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Documents</h2>
        <p className="text-gray-500">
          Upload PDF documents securely. They will be processed and available in real-time.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
        <UploadZone onFilesSelected={handleFilesSelected} allowMultiple={true} />
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center">
              <h3 className="font-bold text-gray-800">
                Selected Files <span className="ml-2 bg-brand-100 text-brand-600 py-0.5 px-2.5 rounded-full text-sm">{files.length}</span>
              </h3>
              {files.length > 3 && (
                <button 
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="ml-4 text-sm text-gray-500 hover:text-brand-600 transition-colors"
                >
                  {isCollapsed ? 'Show Details' : 'Hide Details'}
                </button>
              )}
            </div>
            
            {pendingCount > 0 && (
              <button 
                onClick={uploadFiles}
                disabled={isUploading}
                className={`flex items-center px-4 py-2 rounded-xl font-medium text-white transition-all ${
                  isUploading 
                    ? 'bg-brand-400 cursor-not-allowed' 
                    : 'bg-brand-600 hover:bg-brand-700 shadow-sm hover:shadow active:scale-95'
                }`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    Upload {pendingCount} Files
                  </>
                )}
              </button>
            )}
          </div>
          
          {!isCollapsed && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
              {files.map((fileObj, idx) => (
                <FilePreviewCard 
                  key={`${fileObj.file.name}-${idx}`} 
                  fileObj={fileObj} 
                  onRemove={removeFile}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Uploads;
