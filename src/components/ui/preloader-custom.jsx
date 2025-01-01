const Preloader = () => {
  return (
    <div className="absolute animate-pulse inset-0 size-full object-cover md:object-scale-down z-40 flex items-center justify-center font-playfair">
      {/* Heart SVG */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="text-cyan-700/90 w-36 h-36"
          viewBox="0 0 378 378"
        >
          <g>
            <path d="M348.151,54.514c-19.883-19.884-46.315-30.826-74.435-30.826c-28.124,0-54.559,10.942-74.449,30.826l-9.798,9.8l-9.798-9.8   c-19.884-19.884-46.325-30.826-74.443-30.826c-28.117,0-54.56,10.942-74.442,30.826c-41.049,41.053-41.049,107.848,0,148.885   l147.09,147.091c2.405,2.414,5.399,3.892,8.527,4.461c1.049,0.207,2.104,0.303,3.161,0.303c4.161,0,8.329-1.587,11.498-4.764   l147.09-147.091C389.203,162.362,389.203,95.567,348.151,54.514z M325.155,180.404L189.47,316.091L53.782,180.404   c-28.368-28.364-28.368-74.514,0-102.893c13.741-13.739,32.017-21.296,51.446-21.296c19.431,0,37.702,7.557,51.438,21.296   l21.305,21.312c6.107,6.098,16.897,6.098,23.003,0l21.297-21.312c13.737-13.739,32.009-21.296,51.446-21.296   c19.431,0,37.701,7.557,51.438,21.296C353.526,105.89,353.526,152.039,325.155,180.404z" />
          </g>
        </svg>
      </div>

      <div className="absolute text-center text-xl font-semibold text-white z-40">
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
