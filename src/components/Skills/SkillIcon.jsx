import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiVuedotjs,
  SiNextdotjs,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiLaravel,
  SiSharp,
  SiDotnet,
  SiCplusplus,
  SiGo,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiSupabase,
  SiPhpmyadmin,
  SiGit,
  SiGithub,
  SiGitlab,
  SiDocker,
  SiLinux,
  SiNpm,
  SiPostman,
  SiFigma,
  SiApache,
  SiXampp,
  SiCisco,
  SiWireshark,
  SiOpenvpn,
  SiGraphql,
  SiKubernetes,
} from "react-icons/si"
import { FaJava, FaAws, FaCode } from "react-icons/fa"
import { getSkillById } from "../../data/skillCatalog"

const ICON_MAP = {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiVuedotjs,
  SiNextdotjs,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiLaravel,
  SiSharp,
  SiDotnet,
  SiCplusplus,
  SiGo,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiSupabase,
  SiPhpmyadmin,
  SiGit,
  SiGithub,
  SiGitlab,
  SiDocker,
  SiLinux,
  SiNpm,
  SiPostman,
  SiFigma,
  SiApache,
  SiXampp,
  SiCisco,
  SiWireshark,
  SiOpenvpn,
  SiGraphql,
  SiKubernetes,
  FaJava,
  FaAws,
}

const SkillIcon = ({ skillId, size = "1.8rem", className = "" }) => {
  const skill = getSkillById(skillId)

  if (!skill) {
    return <FaCode style={{ color: "#94a3b8", fontSize: size }} className={className} />
  }

  const Icon = ICON_MAP[skill.icon] || FaCode

  return (
    <Icon
      className={className}
      style={{ color: skill.color, fontSize: size }}
      aria-hidden="true"
    />
  )
}

export default SkillIcon
