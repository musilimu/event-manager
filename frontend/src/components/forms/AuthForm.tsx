import { TextField } from "./TextField"
import { SubmitHandler, useForm } from "react-hook-form"
import { User } from "schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

export const AuthForm = <T extends { formSubmit: SubmitHandler<z.infer<typeof User>>, link: { link: string; text: string }, title: string, actionText: string },>(props: T) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof User>>({ resolver: zodResolver(User) })

  return (
    <form className="grid space-y-4 max-w-xl mx-auto my-8" onSubmit={handleSubmit(props.formSubmit)}>
      <h1 className="font-bold text-lg text-center my-4">{props.title}</h1>
      <TextField error={errors.email?.message} {...register("email")} label="Email" type="email" placeholder="muslim@tyaza.org" />
      <TextField error={errors.password?.message}  {...register("password")} label="Password" type="password" placeholder="password" />
      <button disabled={isLoading} className="p-2 bg-slate-200 hover:bg-slate-300 transition">{isLoading ? "loading ..." : props.actionText}</button>
      <Link to={props.link.link} className="underline">{props.link.text}</Link>
    </form>
  )
}
