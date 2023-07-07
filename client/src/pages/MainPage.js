/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function mainPage() {

  //States for the form fields
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [CurrencyNames, setCurrencyNames] = useState([]); //Array of currency names

  //Loading state
  const [loading, setLoading] = useState(true);

  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.get('http://localhost:5000/convert',
      {params: {
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency
      }
    });

    setAmountInTargetCurrency(response.data);
    setLoading(false);


    }catch(error){
      console.log(error);
    }

  };

  //Get all the currencies from the API
  useEffect(() => {
    const getCurrencyNames = async () => {
      try{
        const response = await axios.get('http://localhost:5000/getAllCurrencies');
        setCurrencyNames(response.data);

      }catch(error){
        console.log(error);
    }
  };
  getCurrencyNames();
    } , []);
  return (
    <div>
      
      <h1 className='lg:mx-32 text-3xl font-bold text-green-500'>
        Convert Your Currencies Today
      </h1>
      <p className='lg:mx-32 opacity-40 py-6'>
        "Convert Your Currencies Today!" is a powerful MERN (MongoDB, Express.js, React.js, Node.js) application designed to simplify and streamline currency conversion. With this application, users can effortlessly convert currencies from one denomination to another, ensuring accurate and up-to-date exchange rates.
      </p>

      <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-4">
              <label 
              htmlFor={date}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date
              </label>

              <input 
              onChange={(e) => setDate(e.target.value)}
              type="date" 
              id={date} 
              name={date} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required/>
            </div>

            <div className="mb-4">
              <label 
              htmlFor={sourceCurrency} 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency
              </label>

              <select 
              onChange={(e) => setSourceCurrency(e.target.value)}
              name={sourceCurrency}
              id={sourceCurrency}
              value={sourceCurrency}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required>
                <option value=''>Select Source Currency</option>
                {Object.keys(CurrencyNames).map((currency) => (
                  <option className='p-1'
                  key={currency} value={currency}>
                    {currency} - {CurrencyNames[currency]} 
                  </option>
                ))}

              </select>
            </div>

            <div className="mb-4">
              <label 
              htmlFor={targetCurrency} 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency
              </label>

              <select 
              onChange={(e) => setTargetCurrency(e.target.value)} 
              name={targetCurrency} 
              id={targetCurrency} 
              value={targetCurrency} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required>
                <option value=''>Select Target Currency</option>
                {Object.keys(CurrencyNames).map((currency) => (
                  <option className='p-1'
                  key={currency} value={currency}>
                    {currency} - {CurrencyNames[currency]} 
                  </option>
                ))}

              </select>
            </div>

            <div className="mb-4">
              <label 
              htmlFor={amountInSourceCurrency} 
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source Currency
              </label>

              <input 
              onChange={(e) => setAmountInSourceCurrency(e.target.value)} 
              type="number" 
              id={amountInSourceCurrency} 
              name={amountInSourceCurrency} 
              value={amountInSourceCurrency} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder='Enter The Amount' required/>
            </div>

            <button className='bg-green-600 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md'>
            
              Convert the Source Currency
            </button>

          </form>
        </section>
      </div>

      {!loading ? <section className='lg:mx-96 font-bold mt-5 text-xl'>
        {amountInSourceCurrency} {CurrencyNames[sourceCurrency]} is equal to <span className='text-green-500 font-bold'>{amountInTargetCurrency}</span>  in  {CurrencyNames[targetCurrency]}
        </section> : null
      }        

        
    </div>
  )
}
