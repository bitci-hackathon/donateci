import Layout from "../../components/common/layout";
import { doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { firestore } from "../../components/modules/firestore";
import { formatEther } from 'ethers/lib/utils';

const NFT = ({nft}) => {

    const str = nft.owner.id.toString();
    const begin = str.substring(0,8);
    const end = str.substring(str.length-8,str.length);
    const id = begin +"......" + end;


    return (
        <Layout>
      
            <div className="w-full max-w-6xl rounded bg-gray-100 p-10 lg:p-10 mx-auto text-gray-800 relative md:text-left">
                <div className="md:flex items-center -mx-10">
                    <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <img src={nft.image_url} className="w-full relative z-10" alt="" />
                            <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-10">
                        <div className="mb-10">
                            <h1 className="font-bold uppercase text-2xl mb-5">NFT ID: {nft.id}</h1>
                            <p className="text-sm">Owner: <a className="hover:text-blue-500 font-semibold" href={"/profile/" + nft.owner.id }> {nft.owner.name} ({id})  </a>   </p>
                        </div>
                        <div>
                            <div className="inline-block align-bottom mr-5">
                                <span className="text-2xl leading-none align-baseline">DNC</span>
                                <span className="font-bold text-5xl leading-none align-baseline">{nft.price}</span>
                            </div>
                            <div className="inline-block align-bottom">
                                <button className="bg-purple-900 opacity-75 hover:opacity-100 text-white rounded-full px-10 py-2 font-semibold"><i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    </Layout>
    )
}

const getNFTbyId = async (id) => {
    const nftDocument = doc(firestore, `nfts`, id);
    const nft = await getDoc(nftDocument);

    if (!nft.exists()) {
        return false;
    }

    return nft.data();
}

NFT.getInitialProps = async (ctx) => {
    const nftData = await getNFTbyId(ctx.query.id)

    return {
        nft : nftData,
    }
}
export default NFT;