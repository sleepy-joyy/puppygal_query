import { FC } from 'react';

interface DogProps {
  url: string;
}

const Dog: FC<DogProps> = ({ url }) => {
  return (
    <div key={url} className="dog">
      <img src={url} alt="dog" className="dog-image" />
    </div>
  );
};

export default Dog;
