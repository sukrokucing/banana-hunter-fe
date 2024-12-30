import { BackgroundImageTransition } from '@/components/ui/background-image-transition-custom';
import image1 from '../assets/hero-img1.jpg';
import image2 from '../assets/hero-img2.jpg';
import image3 from '../assets/hero-img3.jpg';
import image4 from '../assets/hero-img4.jpg';
import image5 from '../assets/hero-img5.jpg';

const images = [image1, image2, image3, image4, image5];
export default function WeddingInvitationPage() {
  //   return <BackgroundImageTransition interval={2000} images={images} />;
  return (
    <>
      <BackgroundImageTransition interval={7000} images={images} />
      <div className="absolute inset-0 z-50 bg-cyan-900/60 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white opacity-100">
            Wedding Invitation
          </h1>
          <p className="text-lg text-white">
            You are invited to the wedding of
          </p>
          <h2 className="text-3xl font-bold text-white">
            John Doe & Jane Smith
          </h2>
          <p className="text-lg text-white">Saturday, 20th August 2022</p>
          <p className="text-lg text-white">At 10:00 AM</p>
          <p className="text-lg text-white">At St. Mary's Church</p>
        </div>
      </div>
    </>
  );
}
