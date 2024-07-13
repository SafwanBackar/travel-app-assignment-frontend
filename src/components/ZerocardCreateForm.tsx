import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { generateZeroCard } from '../actions/actions';

function ZerocardCreateForm() {
    const [userName, setUserName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    
    const navigate = useNavigate()

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(event.target.value);
  };

const handleWalletClick = () => {
    navigate('/zerocard');
};

const generateZeroCardAction = async (userName: string, dateOfBirth:string)=>{    
    const result = await generateZeroCard(userName, dateOfBirth)
    alert(`Zerocard Created, ID: ${result.zeroCard.card_number}`)
    navigate('/travel')
}
const handleDashboardClick = () => {
    navigate('/dashboard');
  };

return (
<>  
    <div className="flex items-center justify-end mr-5 space-x-4">
        <div onClick={handleWalletClick} className="bg-orange-400 p-3 rounded-lg shadow-md text-center">
            <h1 className="text-md font-bold">Wallet</h1>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Name
                    </label>
                    <input value={userName} onChange={handleUserNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name"/>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
                        Date of Birth
                    </label>
                    <input value={dateOfBirth} onChange={handleDateOfBirthChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="date" placeholder="Date of Birth"/>
                </div>
                <div className="mb-6 flex justify-between items-center">
                    <button onClick={()=> generateZeroCardAction(userName, dateOfBirth)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Generate ZeroCard
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
);
}

export default ZerocardCreateForm