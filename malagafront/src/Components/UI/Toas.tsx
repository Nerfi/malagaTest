

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastNotification = (type:string, message: string) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case 'error':
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    default:
      toast(message);
      break;
  }
};

export default toastNotification;
