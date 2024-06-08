import React from 'react'
import './CurrencyConverter.css'


const CurrencyConverter=()=>{
    const [currencyInput,setCurrencyInput]=React.useState({
        amount:1,
        fromCurrency:"USD",
        toCurrency:"INR",
    })
    const [exchangeRate,setExchangeRate]=React.useState("")
    const [convertedValue,setConvertedValue]=React.useState(null)

    React.useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyInput.fromCurrency}`)
                const data = await response.json()
                setExchangeRate(data.rates[currencyInput.toCurrency])
            } catch (error) {
                console.log(error)
            }
        }

        fetchExchangeRate()
    }, [currencyInput.toCurrency,currencyInput.fromCurrency])

    React.useEffect(()=>{
        const value=currencyInput.amount*exchangeRate;
        setConvertedValue(value)
    },[currencyInput.amount,exchangeRate])

    // console.log(convertedValue)

    // console.log(exchangeRate)
    // console.log("redered")

    const handleChange=(e)=>{
        setCurrencyInput((pervCurrencyInput)=>{
            return{
                ...pervCurrencyInput,
                [e.target.name]:e.target.value
            }
        })
    }

    console.log(currencyInput)
    return(
        <div className='currencyconverter'>
            <div className='intro'>
                <img src={Image} className='converterimage'></img>
                {/* <h2>Currency Converter</h2> */}
            </div>
            <div className='inputs'>
                <div className='input-groups'>
                    <label htmlFor='amount'>Enter Amount:</label>
                    <input type="number" id="amount" name="amount" value={currencyInput.amount} onChange={handleChange}></input>
                </div>
                <div className='input-groups'>
                    <label>From Currency:</label>
                    <select name="fromCurrency" value={currencyInput.fromCurrency} onChange={handleChange}>
                        <option value="USD">USD - United States Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="CNY">CNY - ChineseYuan</option>
                        <option value="INR">INR - Indian Rupee</option>
                        <option value="BRL">BRL - Brazilian Real</option>
                        <option value="ZAR">ZAR - South African Rand</option>
                    </select>
                </div>
                <div className='input-groups'>
                    <label>To Currency:</label>
                    <select name="toCurrency" value={currencyInput.toCurrency} onChange={handleChange}>
                        <option value="USD">USD - United States Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="CNY">CNY - ChineseYuan</option>
                        <option value="INR">INR - Indian Rupee</option>
                        <option value="BRL">BRL - Brazilian Real</option>
                        <option value="ZAR">ZAR - South African Rand</option>
                    </select>
                </div>
                <div className='valuecontainer'>
                    <h3>{currencyInput.amount} {currencyInput.fromCurrency} is equal to {convertedValue} {currencyInput.toCurrency}</h3>
                </div>
            </div>
        </div>
    )
}

export default CurrencyConverter