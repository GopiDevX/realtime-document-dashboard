const UploadProgressBar = ({ progress, status }) => {
  const getProgressStyles = () => {
    switch (status) {
      case 'completed': 
        return { className: 'bg-green-500', style: { width: '100%' } };
      case 'failed': 
        return { className: 'bg-red-500', style: { width: `${progress}%` } };
      case 'uploading':
        return { 
          className: 'bg-brand-500 animate-progress-stripes', 
          style: { 
            width: `${progress}%`,
            backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
            backgroundSize: '1rem 1rem'
          } 
        };
      default: 
        return { className: 'bg-brand-500', style: { width: `${progress}%` } };
    }
  };

  const progressConfig = getProgressStyles();

  return (
    <div className="w-full mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs font-semibold uppercase tracking-wider ${status === 'failed' ? 'text-red-500' : 'text-gray-500'}`}>
          {status}
        </span>
        <span className={`text-xs font-bold ${status === 'failed' ? 'text-red-500' : 'text-gray-700'}`}>
          {status === 'completed' ? '100%' : `${progress}%`}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`${progressConfig.className} h-1.5 rounded-full transition-all duration-300 ease-out`}
          style={progressConfig.style}
        ></div>
      </div>
    </div>
  );
};

export default UploadProgressBar;
