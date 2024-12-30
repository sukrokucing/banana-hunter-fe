import { useState, useEffect } from 'react';
import { BackgroundImageTransition } from '@/components/ui/background-image-transition-custom';
import image1 from '../assets/hero-img1.jpg';
import image2 from '../assets/hero-img2.jpg';
import image3 from '../assets/hero-img3.jpg';
import image4 from '../assets/hero-img4.jpg';
import image5 from '../assets/hero-img5.jpg';
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
      <BackgroundImageTransition interval={7000} images={images} />
      <div className="absolute inset-0 z-20 bg-cyan-950/60 flex items-center justify-center">
        <div className="flex justify-start space-x-4">
          <div>
            <img className="w-40 h-40" src={tulips} alt="tulip" />
          </div>
          <div>
            <h2 className="text-2xl text-center text-white">SAVE THE DATE!</h2>
            <h1 className="text-8xl text-center text-white tracking-wider">
              Inka
              <span className="mx-2"></span>
              <label className="text-5xl">&amp;</label>
              <span className="mx-2"></span>
              Jimmy
            </h1>
          </div>
          <div>
            <img className="w-40 h-40" src={tulips} alt="tulip" />
          </div>
        </div>
      </div>
    </>
  );
}
