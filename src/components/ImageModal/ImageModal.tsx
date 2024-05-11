import { FC } from "react";
import { SelectedPhoto } from "../../App";
import css from "./ImageModal.module.css";
import Modal from "react-modal";

interface ImageModalProps {
  isOpen: boolean;
  photo: SelectedPhoto;

  onChange: (state: boolean, photo: SelectedPhoto) => void;
}

const ImageModal: FC<ImageModalProps> = ({
  isOpen = false,
  photo,
  onChange,
}) => {
  Modal.setAppElement(document.getElementById("root") as HTMLElement);
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={() => onChange(false, photo)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}
    >
      <img className={css.modalImg} src={photo.src} />
    </Modal>
  );
};

export default ImageModal;
