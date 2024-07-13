import { useEffect, useState } from "react";
import { getTravelHistoryData, getTravelHistoryDataByPassenger } from "../actions/actions";
import { FaRupeeSign } from "react-icons/fa";
import { RiDiscountPercentLine } from 'react-icons/ri'
import { FaLocationDot } from "react-icons/fa6";


interface CollectionSummaryProps {
    total_cost: string;
    discount_enabled_count: string;
  }
  interface PassengerSummaryProps {
    passenger_type: string;
    count: number;
  }
function Dashboard() {
    const [collectionSummary, setCollectionSummary] = useState<CollectionSummaryProps>({
        total_cost: '',
        discount_enabled_count: ''
      });
      const [passengerSummary, setPassengerSummary] = useState<PassengerSummaryProps[]>([]);
    useEffect(() => {
        const travelHIstory = async () => {
          try {
            const response = await getTravelHistoryData();            
            if(response.travelHistory.length) setCollectionSummary(response.travelHistory[0])
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        const passengerHIstory = async () => {
            try {
              const response = await getTravelHistoryDataByPassenger();
              if(response.passengerHistory.length) setPassengerSummary(response.passengerHistory)
              
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
    
        travelHIstory();
        passengerHIstory()
      }, []);
      const renderedPassengerSummary = passengerSummary.map(el => {
        return <tr key={el.passenger_type}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {el.passenger_type.toUpperCase()}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {el.count}
                    </td>
                </tr>
      })

    return (
            <>  
                    <div className="w-screen bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mb-5  py-5 text-white flex justify-center relative">
                        <h1 className="block text-3xl font-semibold text-center my-auto">Dashboard</h1>
                    </div>
                    <div className="w-full xl:w-8/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white text-blueGray-700"></div>
                        <div className="px-6 py-4 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="font-bold text-lg text-blueGray-700">Travel Collection Summary</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 removable">
                        <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3">
                                        <div className="px-3 text-right basis-1/3">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                                                <FaRupeeSign className="ml-3 mt-3" size='1.5rem' color="white"/>
                                            </div>
                                        </div>
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm">Total Collected</p>
                                                <h5 className="mb-0 font-bold text-lg">{collectionSummary.total_cost}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3">
                                        <div className="px-3 text-right basis-1/3">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                                                <RiDiscountPercentLine className="ml-2 mt-2" size='2rem' color="white"/>
                                            </div>
                                        </div>
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm">Total Discounts Given</p>
                                                <h5 className="mb-0 font-bold text-lg">{collectionSummary.discount_enabled_count}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Location is static data */}
                        <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row -mx-3">
                                        <div className="px-3 text-right basis-1/3">
                                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                                                <FaLocationDot className="ml-3 mt-3" size='1.5rem' color="white"/>
                                            </div>
                                        </div>
                                        <div className="flex-none w-2/3 max-w-full px-3">
                                            <div>
                                                <p className="mb-0 font-sans font-semibold leading-normal text-sm">Total Locations</p>
                                                <h5 className="mb-0 font-bold text-lg">2
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Location is static data */}
                    </div>
                    <div className="w-full xl:w-8/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white text-blueGray-700"></div>
                        <div className="px-6 py-4 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="font-bold text-lg text-blueGray-700">Passenger Type Summary</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full xl:w-4/12 mt-5 px-8">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full border-collapse text-blueGray-700  ">
                            <thead className="thead-light ">
                                <tr className="bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Type
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Count
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderedPassengerSummary}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>


            </>
    )
    }

export default Dashboard