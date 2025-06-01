import React from 'react'
import Select from "react-select";
import MapLocationSelector from '../MapLocationSelector';

const MineralMapSearch = () => {
  return (
     <div className="max-w-screen-lg mx-auto p-6 grid grid-cols-2 gap-4">
        {/* State selector & map */}
        <div className="col-span-1 bg-white shadow rounded-lg p-4 border-2 border-gray-400 relative">
          <h2 className="text-lg font-semibold mb-2">Select a State</h2>
          <Select
            options={[]}
            // styles={selectStyles}
            placeholder="Select state..."
            // onChange={(opt) => setSelectedState(opt ? opt.value : null)}
          />

          <MapLocationSelector/>

        </div>

        {/* Counties list */}
        <div className="col-span-1 bg-white shadow rounded-lg p-4 border-2 border-gray-400">
          <h2 className="text-lg font-semibold mb-2">Counties</h2>

          <input
            type="text"
            placeholder="Search counties..."
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            // value={countySearch}
            // onChange={(e) => setCountySearch(e.target.value)}
          />

          {/* <ul className="space-y-1 max-h-[350px] overflow-auto">
            {displayedCounties
              .filter((name) =>
                name.toLowerCase().includes(countySearch.toLowerCase())
              )
              .map((name) => (
                <li key={name} className="text-gray-700">
                  {name}
                </li>
              ))}
          </ul> */}
        </div>

        {/* Owners count */}
        {/* <div className="col-span-1 bg-white shadow rounded-lg p-4 border-2 border-gray-400">
          <h2 className="text-lg font-semibold mb-2">No. of Mineral Owners</h2>
          <ul className="space-y-1">
            {displayedCounties.map((name) => (
              <li key={name} className="text-gray-700">
              </li>
            ))}
          </ul>
        </div> */}
      </div>
  )
}

export default MineralMapSearch