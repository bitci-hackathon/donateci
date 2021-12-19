import { BellIcon, SearchIcon } from '@heroicons/react/outline'
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Layout from '../components/common/layout'
import ListingItem from '../components/listing/item'
import DONATECILISTING_ABI from "../contracts/DonateciListing.json";
import useContract from '../hooks/useContract';
import { doc } from "@firebase/firestore";
import { setDoc, getDoc, addDoc } from "firebase/firestore";
import { firestore } from "../components/modules/firestore";

export default function Home() {

  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [creatorCount, setCretorCount] = useState("0");
  const [creatorListing, setCreatorListing] = useState([]);
  const isConnected = typeof account === "string" && !!library;

  const contract = useContract("0x2cB48651189E4dB3E74B61711FEDe58A574cEe38", DONATECILISTING_ABI);


  const getCreatorbyAccountAddress = async (accountAddress) => {
    const userDocument = doc(firestore, `users`, accountAddress);
    const user = await getDoc(userDocument);

    if (!user.exists()) {
      const userData = {
        id: accountAddress,
        is_creator: false,
        name: "",
        surname: "",
        picture_url: "",
        is_signatured: false,
        social_links: [
          {
            id: "twitch",
            link: "",
          },
        ],
      };

      await setDoc(userDocument, userData)
        .then(() => {
          return userData;
        })
        .catch((err) => {
          return err;
        });

      return userData;
    }

    return user.data();
  };

  const getCreatorCount = async () => {
    if (!contract)
      return;

    const count = await contract.getCreatorCount();

    getCreators(count.toString(10));
    setCretorCount(count.toString(10));
  }

  const getCreators = async (count) => {
    for (const i = 1; count >= i; i++) {
      getCreatorbyAccountAddress(await contract.getCreatorAt(i)).then((data) => setCreatorListing(creatorListing => [...creatorListing, data]));
    }
  }

  useEffect(() => {
    if(contract)
      getCreatorCount()
  }, [contract])


  useEffect(() => {
    console.log(creatorListing);
  }, [creatorListing])

  return (
    <Layout>
      {isConnected && (
        <>
          <form className="group bg-white px-4 sm:px-6 lg:px-10 shadow rounded">
            <div className="max-w-10xl mx-auto flex">
              <label htmlFor="search-input" className="flex-none pr-2 flex items-center">
                <span className="sr-only">Search all Creators </span>
                <SearchIcon className="h-6 w-6" aria-hidden="true"></SearchIcon>
              </label>
              <input type="text" id="search-input" value="" placeholder={"Search all " + creatorCount + " Creators"}
                className="flex-auto py-4 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400" />
            </div>
          </form>

          <div className="mt-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {creatorListing.map((listing) => (
              <ListingItem key={listing.id} listing={listing} />
            ))}

          </div>
        </>
      )}

      {!isConnected && (
          <div>
            connect filan
          </div>
        )
      }
    </Layout>
  )
}
