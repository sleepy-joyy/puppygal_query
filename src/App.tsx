import useDogs from './hooks/useDogs';
import './App.css';
import Dogs from './components/Dogs';

function App() {
  const { dogs, refetchTrigger, setFetchTrigger, resetCache } = useDogs(3);

  return (
    <div className="App">
      <div>
        <button onClick={() => setFetchTrigger(refetchTrigger + 1)}>Refetch</button>
        <button onClick={resetCache}>Reset Cache</button>
      </div>
      <div>{`API Calls : ${refetchTrigger}`}</div>
      <Dogs dogs={dogs.dachshunds} />
      <Dogs dogs={dogs.malteses} />
      <Dogs dogs={dogs.terriers} />
    </div>
  );
}

export default App;
