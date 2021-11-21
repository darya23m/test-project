import React from 'react';

import styles from './Card.module.scss';

const Card = ({ data, showModal }) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.type}>
            {data.category}
          </div>
          <div className={styles.name}>
            {data.name}
          </div>
        </div>
        <div className={styles.cardBottom}>
          <div className={styles.cost}>
            <div className={styles.rate}>
              $
            </div>
            <div className={styles.price}>
              {data.price}
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => showModal(data)} className={styles.buy}
          >
            Buy
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
