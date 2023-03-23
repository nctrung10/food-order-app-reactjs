import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';
import Card from '../Card/Card';
import AppContext from '../../../context/app-context';

const ModalOverlay = props => {
  const appCtx = useContext(AppContext);

  return (
    <React.Fragment>
      <div className={classes.backdrop} onClick={appCtx.onHide} />
      <Card className={classes.modal}>
        {props.children}
      </Card>
    </React.Fragment>
  );
};

const Modal = props => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('modal-root')
      )}
    </React.Fragment>
  );
};

export default Modal;