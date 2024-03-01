import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/dialog";

import { Input } from "../shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import AscentText from "./common/AscentText";
import { Button } from "@/shadcn/ui/button";
import ButtonLoading from "./ButtonLoading";
// import { ChangeEvent, useState } from "react";
// import { SignupForm } from "@/types/AllTypes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { useRef } from "react";

const signupFormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "firstname must be atleast 2 letters" })
      .max(30, { message: "firstname mustbe lessthatn 30 " }),
    lastname: z
      .string()
      .min(2, { message: "lastname must be atleast 2 letters" })
      .max(30, { message: "lastname mustbe lessthatn 30 " }),
    email: z.string().email({ message: " Please provide valid email " }),
    password: z.string().min(8, {
      message:
        "Password contain minimum 8 charecters one letters and one digit",
    }),
    confirmpass: z.string(),
  })
  .refine((data) => data.password !== data.confirmpass, {
    message: "Password and confirm password must be match",
    path: ["confirmPassword"],
  });

const SignupModal = () => {
  const loading = true;
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpass: "",
    },
  });
  const confirmPassref = useRef<HTMLDivElement>(null);
  function signupSubmit(values: z.infer<typeof signupFormSchema>) {
    if (values.confirmpass !== values.password) {
      return;
    }
    alert("hel");
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger className="px-5 py-2 rounded-sm  border-black text-textPrimary font-semibold bg-primary border-none text-white">
        Signup
      </DialogTrigger>
      <DialogContent className="bg-accenting">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-2xl">
            <h1>
              Create Account in <AscentText />
            </h1>
          </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                className="flex w-full flex-col  mt-5 gap-5"
                onSubmit={form.handleSubmit(signupSubmit)}
              >
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input placeholder="firstname.." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display firstname.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input placeholder="lastname.." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display lastname.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email @.." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="* * *" type="password" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmpass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input placeholder="* * *" type="password" {...field} />
                      </FormControl>
                      <FormDescription ref={confirmPassref}></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full">
                  <Button className="w-full font-semibold" type="submit">
                    {loading ? "Create   An Acccount" : <ButtonLoading />}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
