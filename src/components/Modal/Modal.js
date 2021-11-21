import React from 'react';

import styles from './Modal.module.scss';
import OrderForm from './OrderForm/OrderForm';
import { ReactComponent as Close } from './img/close.svg';

const Modal = ({ data, hideModal }) => {
  const onClose = (e) => {
    if(e.target.id === 'modalWrapper') {
      hideModal()
    };
  };

  return (
    <div className={styles.container}>
      <div id='modalWrapper' className={styles.wrapper} onClick={onClose}>
        <div className={styles.content}>
          <button 
            type='button' 
            className={styles.closeButton} 
            onClick={hideModal}
          >
            <Close onClick={hideModal} className={styles.close} />
          </button>
          <OrderForm data={data} hideModal={hideModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
