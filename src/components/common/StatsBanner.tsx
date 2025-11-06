import React from "react";

const StatsBanner = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-100 to-blue-100">
      {/* Top Rounded Wave Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q6,12 12,0 T24,0 T36,0 T48,0 T60,0 T72,0 T84,0 T96,0 T108,0 T120,0 T132,0 T144,0 T156,0 T168,0 T180,0 T192,0 T204,0 T216,0 T228,0 T240,0 T252,0 T264,0 T276,0 T288,0 T300,0 T312,0 T324,0 T336,0 T348,0 T360,0 T372,0 T384,0 T396,0 T408,0 T420,0 T432,0 T444,0 T456,0 T468,0 T480,0 T492,0 T504,0 T516,0 T528,0 T540,0 T552,0 T564,0 T576,0 T588,0 T600,0 T612,0 T624,0 T636,0 T648,0 T660,0 T672,0 T684,0 T696,0 T708,0 T720,0 T732,0 T744,0 T756,0 T768,0 T780,0 T792,0 T804,0 T816,0 T828,0 T840,0 T852,0 T864,0 T876,0 T888,0 T900,0 T912,0 T924,0 T936,0 T948,0 T960,0 T972,0 T984,0 T996,0 T1008,0 T1020,0 T1032,0 T1044,0 T1056,0 T1068,0 T1080,0 T1092,0 T1104,0 T1116,0 T1128,0 T1140,0 T1152,0 T1164,0 T1176,0 T1188,0 T1200,0 L1200,0 L0,0 Z"
            fill="#F3F4F6"
          />
        </svg>
      </div>

      {/* Bottom Rounded Wave Border */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
        >
          <path
            d="M0,12 Q6,0 12,12 T24,12 T36,12 T48,12 T60,12 T72,12 T84,12 T96,12 T108,12 T120,12 T132,12 T144,12 T156,12 T168,12 T180,12 T192,12 T204,12 T216,12 T228,12 T240,12 T252,12 T264,12 T276,12 T288,12 T300,12 T312,12 T324,12 T336,12 T348,12 T360,12 T372,12 T384,12 T396,12 T408,12 T420,12 T432,12 T444,12 T456,12 T468,12 T480,12 T492,12 T504,12 T516,12 T528,12 T540,12 T552,12 T564,12 T576,12 T588,12 T600,12 T612,12 T624,12 T636,12 T648,12 T660,12 T672,12 T684,12 T696,12 T708,12 T720,12 T732,12 T744,12 T756,12 T768,12 T780,12 T792,12 T804,12 T816,12 T828,12 T840,12 T852,12 T864,12 T876,12 T888,12 T900,12 T912,12 T924,12 T936,12 T948,12 T960,12 T972,12 T984,12 T996,12 T1008,12 T1020,12 T1032,12 T1044,12 T1056,12 T1068,12 T1080,12 T1092,12 T1104,12 T1116,12 T1128,12 T1140,12 T1152,12 T1164,12 T1176,12 T1188,12 T1200,12 L1200,12 L0,12 Z"
            fill="#F3F4F6"
          />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative py-10 px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-600 mb-2">
           10,000+ happy travellers trusted MyBus this month
        </h2>
        <p className="text-gray-700 text-lg"> MyBus — redefining intercity travel with comfort and reliability.</p>
      </div>
    </div>
  );
};

export default StatsBanner;
