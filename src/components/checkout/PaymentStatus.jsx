import StatusMessage from '../ui/StatusMessage.jsx'

export default function PaymentStatus({ actionData }) {
  if (!actionData) return null
  return <StatusMessage variant={actionData.ok ? 'success' : 'error'} title={actionData.ok ? 'Pagamento encaminhado' : 'Revise sua escolha.'}>{actionData.message}</StatusMessage>
}
