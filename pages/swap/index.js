import { ArrowCircleDownIcon, ArrowCircleUpIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Layout from "../../components/common/layout";
import TokenSelect from "../../components/swap/token-select";

export default function Swap() {
    const [rotate,setRotate] = useState(true);

    const tokens = [
        {
          id: 1,
          name: 'BITCI',
          address : '0xfff',
          icon:
            'https://www.bitci.com/assets/img/home/coin/BITCI.png',
        },
        {
          id: 2,
          name: 'USDT',
          address : '0xfff',
          icon:
            'https://www.bitci.com/assets/img/home/coin/USDT.png',
        },
        {
          id: 3,
          name: 'DNT',
          address : '0xfff',
          icon:
            'https://www.bitci.com/assets/img/home/coin/ETH.png',
        },
      ]

    return (
        <Layout>

            <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
                <div className="px-4 py-8 sm:px-10">
                   
                    <div className="">
                        <div className="w-full space-y-6">
                            <TokenSelect tokens={tokens}></TokenSelect>

                            <div className="w-full">
                                <div className=" relative ">
                                    <input type="text" id="search-form-location" 
                                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                                    placeholder="0.0" />
                                </div>
                            </div>

                            <div className="flex justify-center ">
                                <button onClick={() => setRotate(!rotate)} className="focus:outline-none text-white text-sm py-2 px-2 rounded-full bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg">
                                    { rotate ? <ArrowCircleDownIcon className="h-6 w-6" aria-hidden="true"/> : <ArrowCircleUpIcon className="h-6 w-6" aria-hidden="true"/> }
                                    
                                </button>
                            </div>

                            <TokenSelect tokens={tokens}></TokenSelect>
                            
                            <div className="w-full">
                                <div className=" relative ">
                                    <input type="text" id="search-form-location" 
                                    className="rounded-lg border-gray-300 flex-1 appearance-none border  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                                    placeholder="0.0" />
                                </div>
                            </div>
                           
                            <div>
                                <span className="block w-full rounded-md shadow-sm">
                                    <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Connect Wallet
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                        Info text.
                    </p>
                </div>
            </div>

        </Layout>
    )
}