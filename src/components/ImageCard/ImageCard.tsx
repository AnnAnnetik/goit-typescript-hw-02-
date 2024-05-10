import { ImageId, SelectedPhoto } from "../../App";
import style from "./ImageCard.module.css";
interface ImageCardProps {
  photo: ImageId;
  onSelect: (state: boolean, photo: SelectedPhoto) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onSelect }) => {
  return (
    <div className={style.container}>
      <div>
        <img
          className={style.image}
          src={photo.urls.small}
          alt={photo.alt_description}
          onClick={() =>
            onSelect(true, {
              src: photo.urls.regular,
              description: photo.alt_description,
            })
          }
        />
      </div>
      <h2 className={style.title}>{photo.user.name}</h2>
      <p>Likes: {photo.likes}</p>
      <p>Total Likes: {photo.user.total_likes}</p>
      <p>Total Photos: {photo.user.total_photos}</p>
    </div>
  );
};

export default ImageCard;
