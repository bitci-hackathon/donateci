import { BellIcon, SearchIcon } from '@heroicons/react/outline'
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Layout from '../../components/common/layout'
import ListingItem from '../../components/listing/item'
import DONATECILISTING_ABI from "../../contracts/DonateciListing.json";
import DONATECINFT_ABI from "../../contracts/DonateciNFT.json";
import useContract from '../../hooks/useContract';
import { doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { firestore } from "../../components/modules/firestore";
import { formatEther } from 'ethers/lib/utils';
import NFTItem from '../../components/nft/item';

export default function NFT() {

  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [nftCount, setNFTCount] = useState("0");
  const [nftListing, setNFTListing] = useState([]);
  const isConnected = typeof account === "string" && !!library;

  
  const contract = useContract("0x6143dC3abdE6266807fBEB9e393DC9Bf04B143BE", DONATECILISTING_ABI);
  const nftContract = useContract("0xd4b352E4d61125a3580FD35D4bBbb5B0CE43D8D0", DONATECINFT_ABI);

  const getOwnerAccountbyAddress = async (address) => {
    const userDocument = doc(firestore, `users`, address);
    const user = await getDoc(userDocument);

    if (!user.exists()) {
        return false;
    }

    return user.data();
}

  const getNftbyAddress = async (nftAddress,ownerAddress,image, price, tokenId) => {

    const nftDocument = doc(firestore, `nfts`, nftAddress);
    const nft = await getDoc(nftDocument);

    if (!nft.exists()) {
      const nftData = {
        id: nftAddress,
        owner: await getOwnerAccountbyAddress(ownerAddress) ?? {id: ownerAddress},
        image_url: image,
        price: formatEther(price).toString(10),
        priceInWei : price.toString(10),
        tokenId: tokenId
      };

      await setDoc(nftDocument, nftData)
        .then(() => {
          return nftData;
        })
        .catch((err) => {
          return err;
        });

      return nftData;
    }

    return nft.data();
  };

  const getNFTCount = async () => {
    if (!contract)
      return;

      console.log(contract);
    const count = await contract.getNFTListingCount();

    getNFTListing(count.toString(10));
    setNFTCount(count.toString(10));
  }

  const getNFTListing = async (count) => {
    for (const i = 1; count >= i; i++) {
      const nftListing = await contract.getNFTListingAt(i);

      const nftImage = await nftContract.tokenURI(nftListing[1].toString(10));
      getNftbyAddress(nftListing[1].toString(10),nftListing.creator,nftImage,nftListing.priceInWeiDNC,nftListing.tokenId.toString(10)).then(async(data) => {
        setNFTListing(nftListing => [...nftListing, data])
      });
    }
  }

  useEffect(() => {
    if(contract)
      getNFTCount();
  }, [contract])


  useEffect(() => {
    console.log(nftListing);
  }, [nftListing])

  return (
    <Layout>
      {isConnected && (
        <>
          <form className="group bg-white px-4 sm:px-6 lg:px-10 shadow rounded">
            <div className="max-w-10xl mx-auto flex">
              <label htmlFor="search-input" className="flex-none pr-2 flex items-center">
                <span className="sr-only">Search all NFTs </span>
                <SearchIcon className="h-6 w-6" aria-hidden="true"></SearchIcon>
              </label>
              <input type="text" id="search-input" value="" placeholder={"Search all " + nftCount + " NFTs"}
                className="flex-auto py-4 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400" />
            </div>
          </form>

          <div className="mt-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {nftListing.map((listing) => (
              <NFTItem key={listing.id} listing={listing} />
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
