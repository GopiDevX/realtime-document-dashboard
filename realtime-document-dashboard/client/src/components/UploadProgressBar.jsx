const UploadProgressBar = ({ progress, status }) => {
  const getProgressColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-brand-500';
    }
  };

  return (
    <div className="w-full mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {status}
        </span>
        <span className="text-xs font-bold text-gray-700">
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`${getProgressColor()} h-1.5 rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UploadProgressBar;
