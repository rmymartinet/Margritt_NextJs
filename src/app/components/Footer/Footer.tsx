import { motion } from "framer-motion";
import Link from "next/link";
import { CONTACT_INFO } from "../../../data/user";
import UseLocalTime from "../../hooks/useLocalTime";
import Divider from "../Divider";
import InfoItem from "../InfosItem";
import SvgName from "../SvgName";

const Footer = () => {
  const localTime = UseLocalTime();

  return (
    <motion.footer
      className="-mx-[4vw] mt-40 flex h-screen flex-col justify-between overflow-hidden bg-black px-5 py-10 text-white lg:p-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Contact Section */}
      <div className="flex flex-col flex-wrap items-center justify-between px-6 lg:flex-row lg:px-20">
        <div className="text-4xl lg:text-8xl">Contact</div>
        <div className="mt-4 lg:mt-0">
          <Link
            href={`mailto:${CONTACT_INFO.email}`}
            className="mail mail-white text-xl lg:text-6xl"
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
      <div className="grid grid-cols-2 grid-rows-2 justify-items-center gap-10 lg:flex lg:justify-around lg:space-y-0 lg:px-20 lg:text-center">
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
      <div className="mt-12">
        <SvgName textColor={"white"} />
      </div>
    </motion.footer>
  );
};

export default Footer;
