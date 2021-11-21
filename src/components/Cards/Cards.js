import React, { useState, useEffect } from 'react';

import styles from './Cards.module.scss';
import Card from './Card/Card';
import Modal from '../Modal/Modal';

const getProducts = async () => {
  const productsUrl = 'https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e';
  const response = await fetch(productsUrl);
  return await response.json();
};

const Cards = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalContents, setModalContents] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
    }).catch(e => console.error(e));
  }, []);
  
  const buyCheapestProduct = () => { 
    let result = products.reduce(function(res, obj) {
      return (obj.price < res.price) ? obj : res;
    });
    return result;
  };

  const showModal = (data) => {
    setModalContents(data);
    setIsModalShown(true);
  }

  const renderModal = () => (
    <div>
      <Modal hideModal={() => setIsModalShown(false)} data={modalContents} />
    </div>
  );

  const renderCards = () => 
    products.map((product, index) =>     
      <li key={index}>
        <Card data={product} showModal={showModal} />
      </li>
    );
  
  return (
    <>
      <ul className={styles.productsList}>
        {renderCards()}
      </ul>
      <button
        type="button" 
        className={styles.cheapest} 
        onClick={() => showModal(buyCheapestProduct())}
      >
        Buy cheapest
      </button>
      {isModalShown && renderModal()}
    </>
  );
};

export default Cards;
