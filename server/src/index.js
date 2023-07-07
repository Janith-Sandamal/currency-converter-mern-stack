const express = require('express'); 
const cors = require('cors');
const axios = require('axios');
const e = require('express');

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//All currencies
app.get('/getAllCurrencies', async (req, res) => {
    const nameURL = 'https://openexchangerates.org/api/currencies.json?app_id=0f916fd576b648a6920e68df12774b09';



    try{

        const nameResponse = await axios.get(nameURL);
        const nameData = nameResponse.data;
    
        return res.json(nameData);

    }catch(error){
        console.log(error);
    }
});

//Get the target currency rate
app.get('/convert', async (req, res) => { 
    
    const {date,sourceCurrency,targetCurrency,amountInSourceCurrency} = req.query;

    try{

        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=0f916fd576b648a6920e68df12774b09`;

        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //conversion
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));


    }catch{

    }
});
//Listen on port 5000
app.listen(5000, () => {
    console.log('Server started on port 5000 🚀');
}
);