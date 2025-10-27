import Graph from "../svg/graph";
import Photo from "../svg/photo";
import Lock from "../svg/lock";
import Feature from "./features";
const features = [
  {
    title: "Advanced AI Analysis",
    description:
      "Multi-module evaluation with specific improvement suggestions and scoring",
    icon: <Graph />,
  },
  {
    title: "Professional Templates",
    description:
      "Clean, modern designs that pass ATS systems and impress recruiters",
    icon: <Photo />,
  },
  {
    title: "Multi-Format Export",
    description: "Export your polished resume in PDF, DOCX, and HTML formats",
    icon: <Lock />,
  },
];

const FeatureList = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {features.map((feature) => (
        <Feature key={feature.title} {...feature} />
      ))}
    </div>
  );
};

export default FeatureList;
