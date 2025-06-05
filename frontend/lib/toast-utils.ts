import { toast } from "@/components/ui/use-toast"

export const showToast = {
  success: (message: string) => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
      className: "bg-green-50 border-green-200",
    })
  },
  error: (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    })
  },
  warning: (message: string) => {
    toast({
      title: "Warning",
      description: message,
      variant: "default",
      className: "bg-yellow-50 border-yellow-200",
    })
  },
  info: (message: string) => {
    toast({
      title: "Information",
      description: message,
    })
  },
}
