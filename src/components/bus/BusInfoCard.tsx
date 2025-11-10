import Image from "next/image";
import SeatGrid from "../SeatLayout/SeatGrid";
import { IBus, IBusSchedule } from "@/app/types/myBus";
import { featureIcons } from "./FeatureIcons";

interface BusInfoCardProp{
    busInfo: IBus | null;
    scheduleInfo: IBusSchedule | null;
}

export default function BusInfoCard({busInfo, scheduleInfo}: BusInfoCardProp){
    return(
        <div className="flex justify-between gap-16  border-2 border-gray-200 rounded-md px-8 py-5">
                  <div>
                    <p className="mb-3">
                      <strong>Bus Details</strong>
                    </p>
                    
                    <div className="flex gap-10 items-center">
        
                      <div className="flex items-center gap-2">
                      {busInfo?.images.map((image) => (
                        <div key={image} className="flex items-center">
                          <Image
                            src={image}
                            width={0}
                            height={0}
                            unoptimized
                            alt="bus images"
                            className="object-cover rounded-sm w-50 h-35"
                          />
                        </div>
                      ))}
                      </div>
                                    <div className="space-y-3">
                      <p><span className="font-semibold">Bus Name : </span>{busInfo?.name}</p>
                      <p>
                       <span className="font-semibold">Registration No : </span> <span>{busInfo?.registrationNo} </span> <span className="font-semibold">Brand : </span> {busInfo?.brand}
                      </p>
                      <p><span className="font-semibold">Layout Type : </span>{busInfo?.layoutName}</p>
      </div>
        
                      {/* {busInfo?.features && (
                        <div className="mt-4 w-md">
                          <h3 className="text-gray-700 text-sm font-semibold mb-2">
                            Features
                          </h3>
                          <div className="flex flex-wrap gap-4">
                            {Object.entries(busInfo.features)
                              .filter(([_, value]) => value)
                              .map(([feature]) => (
                                <div
                                  key={feature}
                                  className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                                >
                                  {featureIcons[feature]}
                                  <span className="text-gray-700 text-sm capitalize">
                                    {feature.replace(/([A-Z])/g, " $1")}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )} */}
        
                    </div>

                    <div>
                      {busInfo?.features && (
                        <div className="mt-4 w-lg">
                          <h3 className="text-gray-700 text-sm font-semibold mb-2">
                            Features
                          </h3>
                          <div className="flex flex-wrap gap-4">
                            {Object.entries(busInfo.features)
                              .filter(([_, value]) => value)
                              .map(([feature]) => (
                                <div
                                  key={feature}
                                  className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                                >
                                  {featureIcons[feature]}
                                  <span className="text-gray-700 text-sm capitalize">
                                    {feature.replace(/([A-Z])/g, " $1")}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
        
                  {/* <div>
                    <div className="flex gap-10">
                      {busInfo?.lowerDeck?.seats && (
                        <div>
                          <p className="text-center mb-1">Lower Deck</p>
                          <SeatGrid layout={busInfo.lowerDeck.seats} isUpperDeck={false} price={scheduleInfo?.basePrice}/>
                        </div>
                      )}
                      {busInfo?.upperDeck?.seats && busInfo.upperDeck.seats.length > 0 && (
                        <div>
                          <p className="text-center mb-1">Upper Deck</p>
                          <SeatGrid layout={busInfo.upperDeck.seats} isUpperDeck={true} price={scheduleInfo?.basePrice}/>
                        </div>
                      )}
                    </div>
                  </div> */}
        
                </div>
    )
}