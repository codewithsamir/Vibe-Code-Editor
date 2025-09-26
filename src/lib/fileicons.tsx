// // utils/fileIcons.tsx
// import { VscJson, VscFileCode, VscFilePdf, VscFileMedia, VscFile } from "react-icons/vsc";
// import { FaJs, FaCss3Alt, FaHtml5, FaReact, FaNodeJs } from "react-icons/fa";

// export function getFileIcon(extension: string) {
//   switch (extension) {
//     case "js":
//       return <FaJs className="text-yellow-400" />;
//     case "ts":
//       return <VscFileCode className="text-blue-500" />;
//     case "html":
//       return <FaHtml5 className="text-orange-500" />;
//     case "css":
//       return <FaCss3Alt className="text-blue-400" />;
//     case "jsx":
//     case "tsx":
//       return <FaReact className="text-cyan-400" />;
//     case "json":
//       return <VscJson className="text-green-500" />;
//     case "pdf":
//       return <VscFilePdf className="text-red-500" />;
//     case "mp4":
//     case "mp3":
//       return <VscFileMedia className="text-purple-500" />;
//     default:
//       return <VscFile className="text-gray-400" />;
//   }
// }



// utils/fileIcons.tsx
import {
  VscJson,
  VscFileCode,
  VscFilePdf,
  VscFileMedia,
  VscFile,
  VscMarkdown,
} from "react-icons/vsc";
import {
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaVuejs,
  FaAngular,
  FaGitAlt,
  FaPhp,
  FaRust,
} from "react-icons/fa";
import {
  SiDjango,
  SiPrisma,
  SiTypescript,
  SiGo,
  SiKotlin,
  SiSwift,
  SiC,
  SiCplusplus,
  SiJson,
} from "react-icons/si";
import { AiFillFileImage } from "react-icons/ai";

export function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";

  switch (ext) {
    // --- Programming Languages ---
    case "js":
      return <FaJs className="text-yellow-400" />;
    case "ts":
      return <SiTypescript className="text-blue-500" />;
    case "jsx":
    case "tsx":
      return <FaReact className="text-cyan-400" />;
    case "py":
      return <FaPython className="text-blue-400" />;
    case "java":
      return <FaJava className="text-red-500" />;
    case "php":
      return <FaPhp className="text-indigo-500" />;
    case "rs":
      return <FaRust className="text-orange-700" />;
    case "go":
      return <SiGo className="text-cyan-500" />;
    case "kt":
      return <SiKotlin className="text-purple-500" />;
    case "swift":
      return <SiSwift className="text-orange-400" />;
    case "c":
      return <SiC className="text-blue-500" />;
    case "cpp":
      return <SiCplusplus className="text-blue-400" />;

    // --- Web Stuff ---
    case "html":
      return <FaHtml5 className="text-orange-500" />;
    case "css":
      return <FaCss3Alt className="text-blue-400" />;
    case "vue":
      return <FaVuejs className="text-green-500" />;
    case "ng":
    case "angular":
      return <FaAngular className="text-red-500" />;

    // --- Config / Framework ---
    case "json":
      return <SiJson className="text-green-500" />;
    case "prisma":
      return <SiPrisma className="text-teal-500" />;
    // case "md":
    //   return <VscMarkdown className="text-gray-600" />;
    case "env":
      return <VscFileCode className="text-green-600" />;
    case "gitignore":
      return <FaGitAlt className="text-red-600" />;

    // --- Docs ---
    case "pdf":
      return <VscFilePdf className="text-red-500" />;
    case "mdx":
      return <VscMarkdown className="text-purple-600" />;

    // --- Media / Images ---
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "bmp":
    case "webp":
    case "ico":
    case "svg":
      return <AiFillFileImage className="text-pink-400" />;

    // --- Audio/Video ---
    case "mp4":
    case "avi":
    case "mov":
    case "mkv":
    case "mp3":
    case "wav":
      return <VscFileMedia className="text-purple-500" />;

    // --- Default ---
    default:
      // Handle special filenames without extensions
      if (filename.toLowerCase() === "readme.md") {
        return <VscMarkdown className="text-green-600" />;
      }
      if (filename.toLowerCase() === "package.json") {
        return <FaNodeJs className="text-green-500" />;
      }
      if (filename.toLowerCase() === "requirements.txt") {
        return <SiDjango className="text-green-700" />;
      }
      return <VscFile className="text-gray-400" />;
  }
}
