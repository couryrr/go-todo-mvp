import "./Modal.css";

const Modal = (props) => {
  const closeModal = () => {
    props.closeModalFn();
  };
  return (
    <div className={`modal-backdrop ${props.isOpen ? "open" : ""}`}>
      <div className="modal-container">
        <div>
          <button onClick={closeModal}>X</button>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
