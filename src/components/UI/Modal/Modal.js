import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';
import Card from '../Card/Card';

const ModalOverlay = props => {
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.onHide} />
      <Card className={classes.modal}>
        {props.children}
      </Card>
    </Fragment>
  );
};

const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay onHide={props.onHide}>{props.children}</ModalOverlay>,
        document.getElementById('modal-root')
      )}
    </Fragment>
  );
};

export default Modal;