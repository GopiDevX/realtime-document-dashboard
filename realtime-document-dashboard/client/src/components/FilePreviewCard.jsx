import UploadProgressBar from './UploadProgressBar';

const FilePreviewCard = ({ fileObj, onRemove }) => {
  const { file, status, progress } = fileObj;

  // Format file size
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'completed':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
        );
      case 'failed':
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 group relative">
      <div className="flex items-start">
        <div className="mr-4 mt-1">
          {getStatusIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate" title={file.name}>
            {file.name}
          </p>
          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
            <span>{formatSize(file.size)}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="uppercase">{file.name.split('.').pop()}</span>
          </div>
          
          <UploadProgressBar progress={progress} status={status} />
        </div>
        
        {status !== 'uploading' && (
          <button 
            onClick={() => onRemove(file.name)}
            className="ml-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            title="Remove file"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilePreviewCard;
