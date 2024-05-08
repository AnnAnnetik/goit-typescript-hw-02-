import "./App.css";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Button from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";

import { getPhotos } from "./components/articles-api";
import { useEffect, useState } from "react";

export interface SelectedPhoto {
  src: string;
  description: string;
}
export interface ImageId {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<ImageId[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto>({
    src: "",
    description: "",
  });

  function handleModal(state: boolean, photo: SelectedPhoto): void {
    setIsModalOpen(state);
    if (state) setSelectedPhoto(photo);
  }

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
    setTotalPages(0);
  };

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await getPhotos(query, page);

        setPhotos((pre) => [...pre, ...response.results]);
        setTotalPages(response.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [page, query]);

  const hendleClick = () => {
    setPage((pre) => pre + 1);
  };

  return (
    <div>
      <SearchBar addImg={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery photos={photos} onSelect={handleModal} />
      <ImageModal
        isOpen={isModalOpen}
        photo={selectedPhoto}
        onChange={handleModal}
      />
      {totalPages > page && <Button onClick={hendleClick}>Load more</Button>}
    </div>
  );
}

export default App;
