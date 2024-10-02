import { motion } from "framer-motion";
import { useRef } from "react";
import {
  activityData,
  awardsReviewsData,
  exhibitionData,
} from "../../../data/projects";
import GenericList from "./GenericList";

const Projects = () => {
  const containerRef = useRef(null);

  return (
    <>
      <motion.section ref={containerRef} className="flex flex-col gap-40">
        <GenericList
          data={exhibitionData}
          mainTitle="Exposistions"
          columns="1fr 1fr 1fr"
        />
        <GenericList
          data={activityData}
          mainTitle="Activities"
          columns="1fr 1fr 1fr"
        />
        <GenericList
          data={awardsReviewsData}
          mainTitle="Awards & Reviews"
          columns="1fr 1fr 1fr"
        />
      </motion.section>
    </>
  );
};

export default Projects;
