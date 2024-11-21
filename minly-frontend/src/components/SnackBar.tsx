import { useEffect, useState } from 'react';

type SnackbarProps = {
  message: string;
  messageType: 'error' | 'success' | 'info';
  visible?: boolean;
  duration?: number;
  onClose: () => void;
};

const Snackbar = ({
  message,
  messageType,
  duration = 3000,
  onClose,
}: SnackbarProps) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (messageType) {
      case 'error':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white font-medium rounded-md shadow-lg transition-all ${getBackgroundColor()}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Snackbar;
