import { ArrowCircleDownIcon, ArrowCircleUpIcon } from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import Account from "../../components/Account";
import Layout from "../../components/common/layout";
import TokenSelect from "../../components/swap/token-select";
import useEagerConnect from "../../hooks/useEagerConnect";

export default function Swap() {
    const [rotate,setRotate] = useState(true);
    const { active, account, library, connector, activate, deactivate } =    useWeb3React();
    const isConnected = typeof account === "string" && !!library;
    const triedEagerConnect = useEagerConnect();

    return (
        <Layout>

            <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
                <div className="px-4 py-8 sm:px-10">
                    <h1 className="h1 text-center text-2xl mb-10 shadow-md font-bold">Create Mint</h1>
                   
                    <div className="">
                        <div className="w-full space-y-6">
                                        <div class="">
                                            <label class="inline-block mb-2 text-gray-500">Image Upload</label>
                                            <div class="flex items-center justify-center w-full">
                                                <label
                                                    class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                    <div class="flex flex-col items-center justify-center pt-7">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                            Attach a image</p>
                                                    </div>
                                                    <input type="file" class="opacity-0" />
                                                </label>
                                            </div>
                                        </div>

                            <div className="w-full">
                                <div className=" relative ">
                                            <label class="inline-block mb-2 text-gray-500">Price</label>
                                    <input type="text" id="search-form-location" 
                                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                                    placeholder="0.0" />
                                </div>
                            </div>

                            <div className="w-full">
                                <div className=" relative ">
                                            <label class="inline-block mb-2 text-gray-500">Amount</label>
                                    <input type="text" id="search-form-location" 
                                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                                    placeholder="1" />
                                </div>
                            </div>

                            <div>
                                <span className="block w-full rounded-md shadow-sm">
                                    {isConnected ? (
                                        <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Create
                                        </button>
                                    ): (
                                        <Account triedToEagerConnect={triedEagerConnect} />
                                    )}
                                    
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}