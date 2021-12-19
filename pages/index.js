import { BellIcon, SearchIcon } from '@heroicons/react/outline'
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Layout from '../components/common/layout'
import ListingItem from '../components/listing/item'
import DONATECILISTING_ABI from "../contracts/DonateciListing.json";
import useContract from '../hooks/useContract';

const listings = [
  {
    id: 1,
    name: 'Ümit Dursun',
    href: '/profile/1',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '/profile/2',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

export default function Home() {

  const { active, account, library, connector, activate, deactivate } =    useWeb3React();
  const [creatorCount,setCretorCount] = useState("1");
  const [creatorListing,setCreatorListing] = useState();
  const isConnected = typeof account === "string" && !!library;
  const contract = useContract("0x6143dC3abdE6266807fBEB9e393DC9Bf04B143BE",DONATECILISTING_ABI);
  
  const getCreatorCount = async () => {
    if(!contract)
      return;

    const count = await contract.getCreatorCount();
    
    console.log(await contract.getCreatorAt(1)); // creator adres dönüyor
    setCretorCount(count.toString(10));
  }

  useEffect (() => {
    getCreatorCount()
  }, [contract])

  return (
    <Layout>

      <form className="group bg-white px-4 sm:px-6 lg:px-10 shadow rounded">
        <div className="max-w-10xl mx-auto flex">
          <label htmlFor="search-input" className="flex-none pr-2 flex items-center">
            <span className="sr-only">Search all Creators </span>
            <SearchIcon className="h-6 w-6" aria-hidden="true"></SearchIcon>
          </label>
          <input type="text" id="search-input" value="" placeholder={ "Search all "+ creatorCount +" Creators" }
            className="flex-auto py-4 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400" />
        </div>
      </form>

      <div className="mt-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

        {listings.map((listing) => (
          <ListingItem key={listing.id} listing={listing} />
        ))}

      </div>
    </Layout>
  )
}
