import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../forms/Button"
import { TextField } from "../forms/TextField"
import z from "zod";
import { Event } from "schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { queryClient } from "../../main";
import { useMutation } from "react-query";
import { createEvent } from "../../actions/createEvent";

export const EventForm = () => {
  const [responseMessage, setResponseMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading,  },
    reset
  } = useForm<z.infer<typeof Event>>({ resolver: zodResolver(Event) })
  const mutation = useMutation(createEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('events')
      reset()
    },
    onError: (error: any) => {
      setResponseMessage(error.message || error.name)
    }
  })

  return (
    <form className="grid gap-3 my-8" onSubmit={handleSubmit(data => mutation.mutateAsync(data))}>
      <h2 className="text-2xl">Create new event now</h2>
      <TextField error={errors.title?.message} {...register("title")} label="Event title" placeholder="Onboarding new interns" />
      <TextField error={errors.location?.message} {...register("location")} label="Location" placeholder="Ngoma, kibungo" />
      <Button disabled={isLoading}>Create Event</Button>
      <p className='text-center text-orange-600'>{responseMessage}</p>
    </form>
  )
}
