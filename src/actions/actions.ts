export const fetchCardId = async (cardId: string) => {
    
    try {
      const response = await fetch(`http://localhost:3000/zerocard/${cardId}`);      
      if (!response.ok) {
        throw new Error('Network response error');
      }
      const card = await response.json();

      return card
    } catch (error) {
      console.error('Error fetching cardId:', error);
    }
  };

export  const getTravelHistoryDataByCardId = async (cardId: string) =>{
    try {
        const response = await fetch(`http://localhost:3000/travel/history/${cardId}`);      
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const card = await response.json();
  
        return card
      } catch (error) {
        console.error('Error fetching cardId:', error);
      }
  }

  export  const getTravelHistoryData = async () =>{
    try {
        const response = await fetch(`http://localhost:3000/travel/history`, { method :'GET'});      
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const result = await response.json();
        
        return result
      } catch (error) {
            console.error('Error fetching history data:', error);
      }
  }

  export const getTravelHistoryDataByPassenger = async()=>{
    try {
        const response = await fetch(`http://localhost:3000/passenger/history`, { method :'GET'});      
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const result = await response.json();
        
        return result
      } catch (error) {
            console.error('Error fetching passenger history data:', error);
      }
  }

 export const getTravelFairByPassengerType = async(passengerType: string)=>{
    try {
        const response = await fetch(`http://localhost:3000/fair_charge/${passengerType}`);      
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const fairCharge = await response.json();
  
        return fairCharge
      } catch (error) {
        console.error('Error fetching fair:', error);
      }
  }

export const generateTravelData = async(cardId: string, discountEnabled: boolean, selectedOption:string ,cost: number)=>{
    let fromLoc = '';
    let toLoc = '';
    if(selectedOption === 'New Delhi Railway Station') fromLoc = 'station'
    else if(selectedOption === 'Airport') fromLoc = 'airport'
    toLoc = fromLoc === 'station' ? 'airport' : 'station'
    const travel_type = discountEnabled ? 'return' : 'single'
    try {
        const response = await fetch(`http://localhost:3000/travel/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              card_id: cardId,
              from_location: fromLoc,
                to_location: toLoc,
              discount_enabled: discountEnabled,
              travel_type: travel_type,
              travel_cost: cost
            })   
        })
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const card = await response.json();
        
        return card
      } catch (error) {
        console.error('Error fetching cardId:', error);
      }
    
}

export const updateZeroCardBalance = async(cardId: string, balance: number, cost: number)=>{
    try {
        const response = await fetch(`http://localhost:3000/zerocard/${cardId}/balance/update`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              balance: balance,
              travel_cost: cost,
            })   
        })
        
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const card = await response.json();
        
        return card
      } catch (error) {
        console.error('Error fetching cardId:', error);
      }
}

export const generateZeroCard = async(userName:string, dateOfBirth: string)=>{
    
    try {
        const response = await fetch(`http://localhost:3000/zerocard/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: userName,
              birthDate: dateOfBirth,
            })  
        })
        
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const card = await response.json();
        
        return card
      } catch (error) {
        console.error('Error fetching cardId:', error);
      }
    
}