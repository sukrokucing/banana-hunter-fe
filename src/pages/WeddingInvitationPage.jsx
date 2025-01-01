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
      <div className="bg-cyan-950">
        <div className="relative w-screen h-screen isolate overflow-hidden">
          <BackgroundImageTransition interval={7000} images={images} />
          <div className="w-screen h-screen font-playfair absolute bg-[#F9F2EB]/30">
            <div className="mx-auto max-w-2xl py-64">
              <div className="text-center">
                <h2 className="text-xl font-rubik py-3">SAVE THE DATE</h2>
                <h1 className="text-balance text-6xl tracking-tight text-white sm:text-8xl">
                  <span className="block sm:inline tracking-wider font-sacramento">
                    Inka
                    <span className="text-5xl"> &amp; </span>
                    Jimmy
                  </span>
                </h1>
                <hr className="w-20 mx-auto border-2 border-white my-7" />
                <h3 className="text-xl font-rubik py-3">
                  Saturday, 16th Aug 2025
                </h3>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    Get started
                  </a>
                  <a href="#" className="text-sm/6 text-white">
                    Learn more <span aria-hidden="true">→</span>
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
