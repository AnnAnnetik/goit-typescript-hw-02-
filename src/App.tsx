import './App.css';
import SearchBar from './SearchBar/SearchBar';
import { getPhotos } from './components/articles-api';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import ImageModal from './ImageModal/ImageModal';

interface SelectedPhoto{
  src: string;
  description: string;
}
function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto>({
    src: '',
    description: '',
  });

  function handleModal(state, photo = {}) {
    setIsModalOpen(state);
    if (state) setSelectedPhoto(photo);
  }

  const handleSearch = query => {
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

        setPhotos(pre => [...pre, ...response.results]);
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
    setPage(pre => pre + 1);
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
      {totalPages > page && <LoadMoreBtn onClick={hendleClick}>Load more</LoadMoreBtn>}
    </div>
  );
}

export default App;