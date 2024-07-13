import React, { useEffect, useState } from 'react';
import { fetchCardId, getTravelFairByPassengerType, getTravelHistoryDataByCardId, generateTravelData, updateZeroCardBalance } from '../actions/actions';
import { useNavigate } from 'react-router-dom';

interface Location {
    id: number;
    name: string;
  }

const Travel = () => {
    const navigate = useNavigate()
    const [locations, setLocations] = useState<Location[]>([]);
    const [zeroCardId, setZeroCardId] = useState<string>('')
    const [cardIdError, setCardIdError] = useState<boolean>(false)
    const [balanceError, setBalanceError] = useState<boolean>(false)
    const [discountEnabled, setDiscountEnabled] = useState<boolean>(false)
    const [cost, setCost] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string>('');

    useEffect(() => {
        const fetchLocations = async () => {
          try {
            const response = await fetch('http://localhost:3000/location');
            if (!response.ok) {
              throw new Error('Network response error');
            }
            const data = await response.json();            
            setLocations(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchLocations();
      }, []);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };
    const handleCardIdOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setZeroCardId(e.target.value)
        if(e.target.value.length === 12){
            const cardId = await fetchCardId(e.target.value)  
                                  
            setCardIdError(!cardId.exists)
        }else{
            setCardIdError(true)
        }
    };

    const generateTicket = async ()=>{
        if(['New Delhi Railway Station', 'Airport'].includes(selectedOption) && cost !== 0){
            const cardId = await fetchCardId(zeroCardId)

            if(cardId.exists && cardId.zeroCard[0].balance < cost){
                setBalanceError(true)
                return
            }else{
                setBalanceError(false)
                if(cardId.exists){
                    const postTravel = await generateTravelData(cardId.zeroCard[0].card_number, discountEnabled, selectedOption ,cost)
                    if(postTravel.status === 'success'){
                        // setting up just alert due to time constraint
                        alert(postTravel.message)
                        setZeroCardId('')
                        setSelectedOption('')
                        const updateBalance = await updateZeroCardBalance(cardId.zeroCard[0].card_number, cardId.zeroCard[0].balance, cost)
                        // additional function required to update discountCount for Zerocard user
                    }
                    
                }
            }
            
            
    }}
    const generatePrice = async ()=>{
        // fromLoc added because of time constraint and forgot to add fromLocation as a foreign key from table location and 
        // should have joined with its id to apply the discount logic.
        let fromLoc = '';        
        if(selectedOption === 'New Delhi Railway Station') fromLoc = 'station'
        else if(selectedOption === 'Airport') fromLoc = 'airport'
        
        
        const cardId = await fetchCardId(zeroCardId)
        const result = await getTravelFairByPassengerType(cardId.zeroCard[0].passenger_type)
        const fair = result.fairCharge[0].fare
        const travelData = await getTravelHistoryDataByCardId(cardId.zeroCard[0].card_number)  
        
        if(travelData.travelHistoryByCardId.length === 0) {
            setCost(fair); 
            setDiscountEnabled(false);
        }
        else if(!travelData.travelHistoryByCardId[0].discount_enabled && travelData.travelHistoryByCardId[0].from_location !== fromLoc){
            setCost(fair/2)
            setDiscountEnabled(true)
        } 
        else {
            setCost(fair)
            setDiscountEnabled(false)
        }
    }

    const renderedLocations = locations.map(location=>{
        return <option key={location.id} value={location.name}>{location.name}</option>
    })
    const toLocation = locations.filter( location=>{
        return location.name !== selectedOption
    })

    const handleDashboardClick = () => {
        navigate('/dashboard');
      };
      const handleWalletClick = () => {
        navigate('/zerocard');
      };
    

  return (
    <>  
        <div className="flex items-center justify-end mr-5 space-x-4">
            <div onClick={handleWalletClick} className="bg-orange-400 p-3 rounded-lg shadow-md text-center">
                <h1 className="text-md font-bold">My Wallet</h1>
            </div>
            <div onClick={handleDashboardClick} className="bg-orange-400 p-3 rounded-lg shadow-md text-center">
                <h1 className="text-md font-bold">Dashboard</h1>
            </div>
        </div>
        <div className="... flex items-center justify-center">
            <p className='text-lg font-bold'>Plan Your Travel</p>
        </div>
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zerocardNumber">
                            ZeroCard ID
                        </label>
                        <input value={zeroCardId} onChange={handleCardIdOnchange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="ID Number (12 Digit)"/>
                        {cardIdError && <p className="text-red-500 text-xs mt-1">Wrong ZeroCard Number</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromLocation">
                            From
                        </label>
                        <select
                            value={selectedOption}
                            onChange={handleSelectChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                            <option value="default"></option>
                            {renderedLocations}
                        </select>
                        
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toLocation">
                            To
                        </label>
                        <input 
                        value={(selectedOption && toLocation.length) ? toLocation[0].name : ''} 
                        readOnly={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="toLocation"/>
                    </div>
                    <div className="mb-6 flex justify-between items-center">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="cost">
                            Cost: {cost}
                        </label>
                        <button onClick={generatePrice} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Check Price
                    </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={generateTicket} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Generate Ticket
                        </button>
                    </div>
                    {balanceError && <p className="text-red-500 text-xs mt-1">Insufficient Balance. Please Recharge Card</p>}
                </form>
            </div>
        </div>
    </>
  );
};

export default Travel;
