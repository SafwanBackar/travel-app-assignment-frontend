import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCardId } from '../actions/actions';

// interface ZeroCardGenerationProps {
//   onClose: () => void;
// }

const ZeroCard = () => {
    const navigate = useNavigate()
    const [zeroCardId, setZeroCardId] = useState<string>('')
    const [cardIdError, setCardIdError] = useState<boolean>(false)
    const [balance, setBalance] = useState<number>(0)

  const handleNewWalletClick = () => {
    navigate('/zerocard/create');
  };
  const checkBalance = async (id: string)=>{
    const cardId = await fetchCardId(id)
    if(cardId.exists && cardId.zeroCard) setBalance(cardId.zeroCard[0].balance)
  }

  const handleCardIdOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setZeroCardId(e.target.value)
    if(e.target.value.length === 12){
        const cardId = await fetchCardId(e.target.value)        
        setCardIdError(!cardId.exists)
    }else{
        setCardIdError(true)
    }
};

const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <>  
        <div className="flex items-center justify-end mr-5 space-x-4">
            <div onClick={handleNewWalletClick} className="bg-orange-400 p-3 rounded-lg shadow-md text-center">
                <h1 className="text-md font-bold">Create Wallet</h1>
            </div>
            <div onClick={handleDashboardClick} className="bg-orange-400 p-3 rounded-lg shadow-md text-center">
                <h1 className="text-md font-bold">Dashboard</h1>
            </div>
        </div>
        <div className="... flex items-center justify-center">
                <p className='text-lg font-bold'>ZeroCard</p>
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
                    <div className="mb-6 flex justify-between items-center">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="cost">
                            Balance: {balance}
                        </label>
                        <button onClick={()=> checkBalance(zeroCardId)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Check Balance
                        </button>
                        
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                        // onClick={generateTicket} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Recharge Card Balance
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
  );
};

export default ZeroCard;
