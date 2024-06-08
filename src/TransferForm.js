import React, { useState } from 'react';

function TransferForm() {
  const [value, setValue] = useState('');
  const [payer, setPayer] = useState('');
  const [payee, setPayee] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transferData = {
      value: parseFloat(value),
      payer: parseInt(payer),
      payee: parseInt(payee)
    };

    try {
      const response = await fetch('http://localhost:8080/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transferData),
      });

      if (!response.ok) {
        const result = await response.json();
        console.log('Transfer error:', result);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Transfer successful:', result);

      // Altere '/confirmation' para a URL desejada window.location.href = '/confirmation'; 
    } catch (error) {
       
      console.error('There was a problem with the fetch operation:', error );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Value:
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Payer ID:
          <input
            type="number"
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Payee ID:
          <input
            type="number"
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TransferForm;
