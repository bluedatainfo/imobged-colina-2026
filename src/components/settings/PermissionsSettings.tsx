import { UserManagement } from './UserManagement'
import { RbacMatrix } from './RbacMatrix'
import { IntegrationPermissions } from './IntegrationPermissions'

export default function PermissionsSettings() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <UserManagement />
      <RbacMatrix />
      <IntegrationPermissions />
    </div>
  )
}
