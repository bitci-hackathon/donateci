
const ListingItem = ({ listing }) => {
    return (
        <div className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                    src={listing.imageSrc}
                    alt={listing.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
            </div>
            <div className="mt-1 flex justify-between">
                <div className="bg-gray-800 w-full p-2 rounded text-center  font-medium">
                    <h3 className="text-sm text-white">
                        <a href={listing.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            Donate Now
                        </a>
                    </h3>

                </div>
            </div>
        </div>
    )
}
export default ListingItem;