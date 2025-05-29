import { AxiosError } from 'axios'
import { toast } from 'sonner'

interface ServerErrorResponse {
  message: string
}

export function ToastError({
  error,
}: {
  error: AxiosError<ServerErrorResponse>
}) {
  const response = error.response

  if (response) {
    const status = response.status
    const dataMessage = response.data.message

    switch (status) {
      case 400: {
        toast.error(dataMessage)
        break
      }

      case 401: {
        toast.error(dataMessage)
        break
      }

      case 403: {
        toast.error('Operação não permitida.')
        break
      }

      case 404: {
        toast.error(dataMessage)
        break
      }

      case 409: {
        toast.error(dataMessage)
        break
      }

      default: {
        toast.error('Erro ao realizar procedimento.')
        break
      }
    }
  } else {
    toast.error('Erro ao realizar procedimento. Sem resposta do servidor.')
  }
}
