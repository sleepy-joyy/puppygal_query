import { FC } from 'react';
import Dog from './Dog';

//React.FC : interface
interface DogsProps {
  dogs: string[];
}

//FC: Functional Component
const Dogs: FC<DogsProps> = ({ dogs }) => {
  return (
    <div className="dogs-wrap">
      {dogs.map((url) => {
        return <Dog key={url} url={url} />;
      })}
    </div>
  );
};

export default Dogs;
