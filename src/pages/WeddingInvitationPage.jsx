import { useState, useEffect } from 'react';
import { BackgroundImageTransition } from '@/components/ui/background-image-transition-custom';
import image1 from '../assets/test-1.jpeg';
import image2 from '../assets/test-2.jpeg';
import image3 from '../assets/test-3.jpeg';
import image4 from '../assets/test-4.jpeg';
import image5 from '../assets/test-5.jpeg';
import tulips from '../assets/tulip.svg';
import Preloader from '@/components/ui/preloader-custom';

const images = [image1, image2, image3, image4, image5];

export default function WeddingInvitationPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      });
      await Promise.all(promises);
      setLoading(false);
    };

    preloadImages();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <div className="bg-cyan-950 animate-tracking-in-expand">
        <div className="relative w-screen h-screen isolate overflow-hidden">
          <BackgroundImageTransition interval={7000} images={images} />
          <div className="w-screen h-screen font-playfair absolute bg-[#F9F2EB]/30">
            <div className="mx-auto max-w-2xl py-64">
              <div className="text-center">
                <h2 className="text-xl font-rubik py-3">SAVE THE DATE</h2>
                <h1 className="text-balance text-6xl tracking-tight text-white sm:text-8xl animate-text-focus-in">
                  <span className="block sm:inline tracking-wider font-sacramento">
                    Jimmy
                    <span className="text-5xl"> &amp; </span>
                    Inka
                  </span>
                </h1>
                <hr className="w-20 mx-auto border-2 border-white my-7" />
                <h3 className="text-xl font-rubik py-1">
                  Saturday, 16th Aug 2025
                </h3>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-[#F9F2EB] bg-[linear-gradient(110deg,#F9F2EB,45%,white,55%,#F9F2EB)] bg-[length:300%_100%] px-6 font-rubik text-rose-900/70 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    RSVP
                  </button>
                  <a href="#" className="text-sm/6 text-white">
                    Read more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
