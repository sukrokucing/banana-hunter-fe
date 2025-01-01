const Preloader = () => {
  return (
    <div className="absolute animate-pulse inset-0 size-full object-cover md:object-scale-down z-40 flex items-center justify-center font-playfair">
      {/* Heart SVG */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1500 1500"
          width="1500"
          height="1500"
          preserveAspectRatio="xMidYMid meet"
          className="w-44 h-44 transition-transform z-50"
          style={{
            transform: `translate3d(0px, 0px, 0px)`,
            contentVisibility: `visible`,
          }}
          id="Heart"
        >
          <defs>
            <clipPath id="__lottie_element_2254">
              <rect width="1500" height="1500" x="0" y="0" />
            </clipPath>
          </defs>
          <g clipPath="url(#__lottie_element_2254)">
            <g
              transform="matrix(1,0,0,1,0,0)"
              opacity="1"
              style={{
                display: `block`,
              }}
            >
              <g opacity="1" transform="matrix(1,0,0,1,1052.260009765625,750)">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(212,88,133)"
                  strokeOpacity="1"
                  strokeWidth="43"
                  d=" M-302.260009765625,-212.1280059814453 C-302.260009765625,-386.2049865722656 -166.9340057373047,-527.322998046875 0,-527.322998046875 C166.93299865722656,-527.322998046875 302.260009765625,-386.2049865722656 302.260009765625,-212.1280059814453 C302.260009765625,186.80499267578125 -144.08799743652344,446.12799072265625 -269.7139892578125,511.2139892578125"
                />
              </g>
            </g>
            <g
              transform="matrix(1,0,0,1,0,0)"
              opacity="1"
              style={{
                display: `block`,
              }}
            >
              <g opacity="1" transform="matrix(1,0,0,1,447.739990234375,750)">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(212,88,133)"
                  strokeOpacity="1"
                  strokeWidth="43"
                  d=" M302.260009765625,-212.1280059814453 C302.260009765625,-386.2049865722656 166.9340057373047,-527.322998046875 0,-527.322998046875 C-166.93299865722656,-527.322998046875 -302.260009765625,-386.2049865722656 -302.260009765625,-212.1280059814453 C-302.260009765625,186.80499267578125 144.08799743652344,446.12799072265625 269.7139892578125,511.2139892578125"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="absolute animate-tracking-in-expand font-playfair text-center text-xl font-semibold text-white z-40">
        Jimmy
        <br />
        <label className="text-sm text-white">&amp;</label>
        <br />
        Inka
      </div>
    </div>
  );
};

export default Preloader;
