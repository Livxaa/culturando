import StatusMessage from '../ui/StatusMessage'

export default function PaymentStatus({ actionData }) {
  if (!actionData?.message) return null
  return <StatusMessage tone={actionData.ok ? 'success' : 'error'}>{actionData.message}</StatusMessage>
}
