import React, { useState } from 'react';

import styles from './OrderForm.module.scss';
import cx from 'classnames';
import { ReactComponent as Done } from './img/Done.svg';

const OrderForm = ({ data, hideModal }) => {
  const [isFormSuccessfulySubmitted, setIsFormSuccessfulySubmitted] = useState(false);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const [isNameValid, setIsNameValid] = useState(false);
  const [isContactValid, setIsContactValid] = useState(false);
  const [nameErrors, setNameErrors] = useState([]);
  const [contactErrors, setContactErrors] = useState([]);
 
  const validateName = () => {
    let errors = [];
    const nameRegEx = /^[a-zA-ZА-Яа-я]+$/;

    if (name.length === 0) {
      errors.push('This field in required')
    } else if (!nameRegEx.test(name)) {
      errors.push('Only letters allowed')
    };

    if (errors.length === 0) {
      setIsNameValid(true)
    };
    setNameErrors(errors);
    return errors;
  }
 
  const validateContact = () => {
    let errors = [];
    const phoneRegEx = /^\d+$/;
 
    if (contact.length === 0) {
      errors.push('This field in required')
    } else if (!phoneRegEx.test(contact)) {
      errors.push('Only numbers allowed')
    } else if (contact.length !== 12) {
      errors.push('Should contain 12 characters')
    };
 
    if (errors.length === 0) {
      setIsContactValid(true)
    };
    setContactErrors(errors);
    return errors;
  }

  const validateForm = () => {
    const validations = [
      validateName(),
      validateContact()
    ];
    return validations.flat().length === 0;
  };

  const resetNameValidator = () => {
    setNameErrors([]);
    setIsNameValid(false);
  }

  const resetContactValidator = () => {
    setContactErrors([]);
    setIsContactValid(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      console.log(name, contact);
      setIsFormSuccessfulySubmitted(true);
    }
  };

  const renderForm = () => (
    <>
      <div className={styles.orderedGood}>
        <div className={styles.type}>
          {data.category}
        </div>
        <div className={styles.name}>
          {data.name}
        </div>
        <div className={styles.cost}>
          <div className={styles.rate}>
            $
          </div>
          <div className={styles.price}>
            {data.price}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            className={
              cx(styles.input, 
              {[styles.inputError]: !!nameErrors.length}, 
              {[styles.inputSuccess]: isNameValid})
            }
            type="text"
            name="name"
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
            onFocus={resetNameValidator}
            onBlur={validateName} />
          {(nameErrors.length > 0) && 
          (<div className={styles.errors}>
            {nameErrors}
          </div>)}
        </div>
        <div className={styles.inputWrapper}>
          <input 
            className={
              cx(styles.input, 
              {[styles.inputError]: !!contactErrors.length}, 
              {[styles.inputSuccess]: isContactValid})
            }
            type="text"
            name="contact"
            placeholder='Number'
            value={contact}
            onChange={e => setContact(e.target.value)}
            onFocus={resetContactValidator}
            onBlur={validateContact} />
            {(contactErrors.length > 0) && 
            (<div className={styles.errors}>
              {contactErrors}
            </div>)}
        </div>
        <button 
          type='submit' 
          className={styles.order}
        >
          Order
        </button>
      </form>
    </>
  );

  const renderSuccessMessage = () => (
    <div>
      <div className={styles.successMessage}>Your order has successfully placed.</div>
      <Done className={styles.doneImg} />
    </div>
  );

  return (
    <div className={styles.container}>
      { isFormSuccessfulySubmitted ? renderSuccessMessage() : renderForm() }
    </div>
  );
};

export default OrderForm;
