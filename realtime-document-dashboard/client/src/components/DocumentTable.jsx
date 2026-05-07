import TableSkeleton from './TableSkeleton';

const DocumentTable = ({ documents, isLoading, error, onDownload }) => {
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'uploaded':
      case 'completed':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Completed</span>;
      case 'processing':
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">Processing</span>;
      case 'failed':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">Failed</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Error Loading Documents</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No documents found</h3>
        <p className="text-gray-500 max-w-sm">
          You haven't uploaded any documents yet. Head over to the uploads page to add your first document.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider">File Name</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Type</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Size</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Upload Date</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {documents.map((doc) => (
              <tr key={doc._id} className="hover:bg-brand-50/30 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    </div>
                    <div className="font-semibold text-gray-800 max-w-[200px] truncate" title={doc.originalName}>
                      {doc.originalName}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="uppercase text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    PDF
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {formatSize(doc.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {formatDate(doc.uploadDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(doc.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button 
                    onClick={() => onDownload(doc._id, doc.originalName)}
                    className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors inline-flex"
                    title="Download document"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;
