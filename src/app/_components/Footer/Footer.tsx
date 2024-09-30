import { motion } from "framer-motion";
import Link from "next/link";
import { CONTACT_INFO } from "../../../data/user";
import UseLocalTime from "../../hooks/useLocalTime";
import Divider from "../Divider";
import InfoItem from "../Footer/InfosItem";
import SvgName from "../Footer/SvgName";

const Footer = () => {
  const localTime = UseLocalTime();

  return (
    <motion.footer
      className="-mx-[4vw] mt-40 flex flex-col justify-between h-screen py-10 bg-black text-white px-5 lg:p-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20">
        <div className="text-4xl lg:text-8xl">Contact</div>
        <div className="mt-4 lg:mt-0">
          <Link
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-xl lg:text-6xl"
          >
            {CONTACT_INFO.email}
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-8">
        <Divider />
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-2 grid-rows-2 gap-10 justify-items-center lg:flex lg:justify-around lg:text-center  lg:space-y-0 lg:px-20">
        <InfoItem label="Local Time" value={localTime} />
        <InfoItem label="Number" value={CONTACT_INFO.number} />
        <InfoItem
          label="Instagram"
          value={
            <Link
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @maargriitt
            </Link>
          }
        />
        <InfoItem
          label="TikTok"
          value={
            <Link
              href={CONTACT_INFO.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @margriitt
            </Link>
          }
        />
      </div>
      <div className="mt-12  w-full">
        <SvgName textColor={"white"} />
      </div>
    </motion.footer>
  );
};

export default Footer;
