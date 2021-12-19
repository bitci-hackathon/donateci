
const NFTItem = ({ listing }) => {

    const str = listing.owner.id.toString();
    const begin = str.substring(0,8);
    const end = str.substring(str.length-8,str.length);
    const id = begin +"......" + end;

    return (
        <div className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                    src={listing.image_url}
                    alt={listing.id}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
            </div>
            <div className="flex w-full justify-center relative ">
                <h1 className="text-center w-10/12 -mt-14 flex  items-center justify-center text-white text-xs overflow-ellipsis hover:font-bold z-50 hover:cursor-pointer">{listing.owner.name ?? id}</h1>
            </div>

            {listing.price && (
                <div className="mt-1 flex justify-between">
                    <div className="bg-gray-800 w-full p-2 rounded text-center  font-medium">
                        <h3 className="text-sm text-white">
                            <a href={'nft/'+listing.id}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                Buy Now {listing.price} DNC
                            </a>
                        </h3>

                    </div>
                </div>
            )}
            
        </div>
    )
}
export default NFTItem;