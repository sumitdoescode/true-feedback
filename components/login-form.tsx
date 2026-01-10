import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GoogleLogin from "./GoogleLogin";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardHeader className="text-center">
               <CardTitle className="text-xl">Welcome back</CardTitle>
               <CardDescription>Login with your Google account</CardDescription>
            </CardHeader>
            <CardContent>
               <form>
                  <FieldGroup>
                     <Field>
                        <GoogleLogin />
                     </Field>
                  </FieldGroup>
               </form>
            </CardContent>
         </Card>
         {/* <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
         </FieldDescription> */}
      </div>
   );
}
