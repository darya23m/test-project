import React, { useState } from 'react';

import styles from './OrderForm.module.scss';
import cx from 'classnames';

const OrderForm = ({ data, hideModal }) => {

  // Form fields
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  // Form validations
  const [isNameValid, setIsNameValid] = useState(false);
  const [isContactValid, setIsContactValid] = useState(false);
  const [nameErrors, setNameErrors] = useState([]);
  const [contactErrors, setContactErrors] = useState([]);
 
  const validateName = () => {
    let errors = [];
    const nameRegEx = /^[a-zA-Z]+$/;

    if (name.length === 0) errors.push('This field in required');
    else if (!nameRegEx.test(name)) errors.push('Only letters allowed');

    if (errors.length === 0) setIsNameValid(true);
    setNameErrors(errors);
    return errors;
  }
 
  const validateContact = () => {
    let errors = [];
    const phoneRegEx = /^\d+$/;
 
    if (contact.length === 0) errors.push('This field in required');
    else if (!phoneRegEx.test(contact)) errors.push('Only numbers allowed');
    else if (contact.length !== 12) errors.push('Should contain 12 characters');
 
    if (errors.length === 0) setIsContactValid(true);
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

  // Form handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      // Log result
      console.log(name, contact);
      hideModal();
    }
  };

  // Helpers

  return (
    <div className={styles.container}>
      <div className={styles.orderedGood}>
        <div className={styles.type}>{data.category}</div>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.cost}>
          <div className={styles.rate}>$</div>
          <div className={styles.price}>{data.price}</div>
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
          {(nameErrors.length > 0) && <div className={styles.errors}>{nameErrors}</div>}
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
            {(contactErrors.length > 0) && <div className={styles.errors}>{contactErrors}</div>}
        </div>
        <button type='submit' className={styles.order}>Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
