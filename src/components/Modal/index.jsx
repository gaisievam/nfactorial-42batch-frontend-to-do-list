import { useEffect, useState } from 'react';

export const Modal = ({ addNewTodo, closeModal }) => {
  const [input, setInput] = useState('');
  const [dataApi, setDataApi] = useState([]);
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    addNewTodo(input);
    closeModal();
    setInput('');
  };

  //   useEffect(() => {
  //     console.log('New Input', input);
  //     setDataApi(fetch())
  //   }, [dataApi]);

  return (
   <div style={{
    flexDirection: 'column',
    top: 92,
    left: '101px',
    padding: '16px 0px 0px 0px',
    borderRadius: '12px 0 0 0',
   }}>
      <div
        style={{
          width: 268,
          height: 234,
          backgroundColor: '#E4E6E7',
          borderRadius: 12,
          position: 'absolute',
          top: '21%',
          flexDirection: 'column',
          left: '65%',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.16)',
        }}
      >
        <p
        style={{
          fontFamily: 'Inter',
          fontSize: 16,
          textAlign: 'left',
          color: '#151517',
          fontWeight: 700,
        }}
        >Add New To Do</p>
        <input value={input} onChange={handleChange} 
        style={{
          width: 180,
          height: 120,
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: 'none',
        }} />
        <button onClick={handleClick}
        style={{
          width: 76,
          height: 40,
          borderRadius: '100px',
        }}>Add</button>
      </div>
    </div>
  );
};
