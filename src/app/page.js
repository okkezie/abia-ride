import Contact from "@/Component/Contact/Contact";
import DownloadRider from "@/Component/DownloadRider/DownloadRider";
import Footer from "@/Component/Footer/Footer";
import Hero from "@/Component/Hero/Hero";
import ReadyToRide from "@/Component/ReadyToRide/ReadyToRide";
import RideOption from "@/Component/RideOption/RideOption";

export default function Home() {
  return (
    <div className="">
     <Hero />
     <RideOption />
     <ReadyToRide />
     <DownloadRider />
     <Contact />
     <Footer />
    </div>
  )
}
