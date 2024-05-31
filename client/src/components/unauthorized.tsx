import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"

const Unauthorized = () => {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unauthorized</AlertDialogTitle>
          <AlertDialogDescription>
            You are not authorized to access this page. Please login or register
            to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-col items-center w-full space-y-4">
            <Button className="w-full" asChild>
              <a href="/api/login">Login</a>
            </Button>
            <p className="text-md">
              No account?{" "}
              <a className="font-semibold text-primary" href="/api/register">
                Create one
              </a>
            </p>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Unauthorized
