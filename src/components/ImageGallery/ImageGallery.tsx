import { ImageId, SelectedPhoto } from "../../App";
import ImageCard from "../ImageCard/ImageCard";
import style from "./ImageGallery.module.css";

export interface ImageGalleryProps {
  photos: ImageId;
  onSelect: (state: boolean, photo: SelectedPhoto) => void;
}
export const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  onSelect,
}) => {
  return (
    <ul className={style.list}>
      {Array.isArray(photos) &&
        photos.map((photo) => (
          <li className={style.item} key={photo.id}>
            <ImageCard photo={photo} onSelect={onSelect} />
          </li>
        ))}
    </ul>
  );
};

export default ImageGallery;
