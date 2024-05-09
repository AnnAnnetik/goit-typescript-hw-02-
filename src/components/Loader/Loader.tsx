import { Hearts } from 'react-loader-spinner';
import  { FC } from "react";
const Loader: FC = () => {
  return (
    <div>
      <Hearts
        height="80"
        width="80"
        color="#0c17ed"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;

