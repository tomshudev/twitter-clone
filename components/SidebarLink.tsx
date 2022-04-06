type SidebarLinkProps = {
  text: string
  Icon: React.FC<any>
  active?: boolean
}

const SidebarLink = ({ text, Icon, active }: SidebarLinkProps) => {
  return (
    <div
      className={`hoverAnimation flex items-center justify-center space-x-3 text-xl text-[#d9d9d9] xl:justify-start ${
        active && 'font-bold'
      }`}
    >
      <Icon className="h-7 text-white" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SidebarLink
