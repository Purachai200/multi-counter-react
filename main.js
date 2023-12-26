const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

function Counter({ item: { id, number }, hdlUpdate, hdlDelCounter }) {
  return (
    <div className="counter">
      <button onClick={() => hdlUpdate(id, -1)}> - </button>
      <h3>{number}</h3>
      <button onClick={() => hdlUpdate(id, 1)}> + </button>
      <button onClick={() => hdlUpdate(id, -number)}> C </button>
      <button onClick={() => hdlDelCounter(id)}> X </button>
    </div>
  );
}

function SumInfo({ counters }) {
  const totalSum = counters.reduce((acc, counter) => acc + counter.number, 0);

  const stTitle = {
    color: "blue",
    fontSize: "50px",
  };

  return (
    <div className="suminfo">
      <h1 style={stTitle}>Sum = {totalSum}</h1>
    </div>
  );
}


function App() {
  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);

  const hdlUpdate = (id, num) => {
    const cloneCounters = [...counters];
    let idx = cloneCounters.findIndex((el) => el.id === id);
    if (cloneCounters[idx].number + num < 0) {
      return;
    }
    cloneCounters[idx].number += num;
    setCounters(cloneCounters);
  };

  const hdlAddCounter = () => {
    let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
    const cloneCounters = [...counters];
    cloneCounters.push({ id: newId, number: 0 });
    setCounters(cloneCounters);
  };

  const hdlDelCounter = (id) => {
    const updatedCounters = counters.filter((counter) => counter.id !== id);
    setCounters(updatedCounters);
  };

  return (
    <>
      <h1 className="text-center">Codecamp Academy Multi-Counter</h1>
      <button className="text-center btn-add" onClick={hdlAddCounter}>
        Add Counter
      </button>
      <SumInfo counters={counters}/>

      {counters.map((el) => (
        <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlDelCounter={hdlDelCounter} />
      ))}
    </>
  );
}
