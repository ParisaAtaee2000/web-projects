import { Icon } from './Icon'

export default function DemoNotice({ children }: { children: string }) {
  return <aside className="demo-notice" role="note">
    <Icon name="clock" size={18} />
    <p>{children}</p>
  </aside>
}
