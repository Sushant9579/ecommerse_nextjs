import Carousel from '@/component/carousel';
import Image from 'next/image';

export default function Home() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=869&auto=format&fit=crop",
      title: "Shooting Stars",
    },
    {
      src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
      title: "The Catalyzer",
    },
    {
      src: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1005&auto=format&fit=crop",
      title: "The 400 Blows",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1664201889922-66bc3c778c1e?q=80&w=870&auto=format&fit=crop",
      title: "Neptune",
    },
    {
      src: "https://images.unsplash.com/photo-1657812159103-1b2a52a7f5e8?q=80&w=867&auto=format&fit=crop",
      title: "Holden Caulfield",
    },
    {
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=870&auto=format&fit=crop",
      title: "Alper Kamu",
    },
  ];

  return (
    <div className='mx-1'>
      <Carousel />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Shop the Latest Trends | Affordable Fashion, Electronics &amp; More – E-COMMERCE</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base flex flex-col gap-y-2"> Welcome to E-COMMERCE — your destination for quality, style, and unbeatable value. Whether you&apos;re shopping for fashion-forward apparel, cutting-edge tech, or beautiful home essentials, we&apos;ve curated a collection that brings together the best in design and functionality.</p>
          </div>

          <div className="flex flex-wrap -m-4">
            {galleryImages.map((img, idx) => ( <div className="lg:w-1/3 sm:w-1/2 p-4" key={idx}> <div className="flex relative">
                  <Image src={img.src} alt={img.title} className="absolute rounded inset-0 w-full h-full object-cover object-center" width={870} height={500}/>
                  <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                    <h2 className="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">THE SUBTITLE</h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{img.title}</h1>
                    <p className="leading-relaxed"> Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat. </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
