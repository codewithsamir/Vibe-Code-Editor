// utils/folderIcons.tsx
import { JSX } from "react";
import { VscFolder, VscFolderOpened } from "react-icons/vsc";
import { FaReact, FaNodeJs, FaAngular, FaPython, FaDatabase } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import {
  SiDjango,
  SiMongodb,
  SiVuedotjs,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiPrisma,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiSqlite,
} from "react-icons/si";

interface ThemeColors {
  base: string;
  project: string;
  framework: string;
  database: string;
  misc: string;
}

const darkThemeColors: ThemeColors = {
  base: "text-gray-400",
  project: "text-cyan-400",
  framework: "text-blue-400",
  database: "text-green-400",
  misc: "text-yellow-400",
};

export function getFolderIcon(
  folderName: string,
  isOpen: boolean,
  themeColors: ThemeColors = darkThemeColors
): JSX.Element {
  const name = (folderName || "").toLowerCase().trim();

  const folderBase = (color = themeColors.base) =>
    isOpen ? <VscFolderOpened className={color} /> : <VscFolder className={color} />;

  // 🔹 Core project folders
  if (name === "src") return folderBase(themeColors.project);
  if (name === "app") return <SiNextdotjs className={themeColors.framework} />;
  if (name === "public") return folderBase(themeColors.misc);
  if (name === "assets" || name === "static") return folderBase("text-pink-400");

  // 🔹 Frontend structure
  if (name === "components") return <FaReact className={themeColors.project} />;
  if (name === "hooks") return folderBase("text-teal-400");
  if (name === "context") return folderBase("text-purple-500");
  if (name === "styles" || name === "tailwind") return <SiTailwindcss className="text-sky-400" />;
  if (name === "utils" || name === "helpers") return folderBase("text-indigo-400");
  if (name === "pages") return folderBase("text-cyan-300");

  // 🔹 Monorepo / libraries
  if (name === "lib" || name === "libs" || name === "packages" || name === "workspace") {
    return <BiPackage className="text-indigo-500" />;
  }

  // 🔹 Backend / API
  if (name === "routes" || name === "api") return folderBase("text-green-500");
  if (name === "services") return folderBase("text-orange-500");
  if (name === "controllers") return folderBase("text-red-400");
  if (name === "models") return folderBase("text-yellow-500");
  if (name === "middleware") return <SiExpress className={themeColors.framework} />;

  // 🔹 Node / framework specific
  if (name === "node_modules") return <FaNodeJs className="text-green-500" />;
  if (name.includes("angular")) return <FaAngular className="text-red-500" />;
  if (name.includes("vue")) return <SiVuedotjs className="text-green-400" />;
  if (name.includes("django")) return <SiDjango className="text-green-600" />;
  if (name.includes("python")) return <FaPython className="text-yellow-400" />;
  if (name === "types" || name === "typings") return <SiTypescript className="text-blue-500" />;

  // 🔹 Database & ORM
  if (name === "prisma" || name.includes("prisma")) return <SiPrisma className="text-violet-500" />;
  if (name === "migrations" || name.includes("migration")) return folderBase("text-amber-500");
  if (name === "seeds" || name.includes("seed")) return folderBase("text-amber-400");
  if (name === "db" || name === "database" || name === "databases") return <FaDatabase className="text-yellow-600" />;

  // 🔹 Specific DB engines
  if (name.includes("mongo") || name === "mongodb") return <SiMongodb className="text-green-600" />;
  if (name.includes("mysql")) return <SiMysql className="text-blue-600" />;
  if (name.includes("post") || name === "postgres" || name === "postgresql") return <SiPostgresql className="text-indigo-600" />;
  if (name.includes("redis")) return <SiRedis className="text-red-500" />;
  if (name.includes("sqlite") || name === "sqlite") return <SiSqlite className="text-gray-600" />;

  // 🔹 Misc
  if (name === "scripts" || name === "bin") return folderBase("text-gray-600");
  if (name === "dist" || name === "build" || name === "out") return folderBase("text-lime-600");
  if (name === "test" || name === "tests" || name === "__tests__") return folderBase("text-rose-500");
  if (name === "docs" || name === "documentation") return folderBase("text-sky-600");
  if (name === ".github" || name === ".vscode" || name === "ci") return folderBase("text-gray-500");

  // 🔹 Fallback
  return folderBase(themeColors.base);
}
