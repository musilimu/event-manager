import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./Button"
import { TextField } from "./TextField"
import z from "zod";
import { Event } from "schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { queryClient } from "../../main";
import { useMutation } from "react-query";
import { TMutateEvent, mutateEvent } from "../../actions/createEvent";
import { Event as TEvent } from "../../hooks/getEvents"

export const EventForm = ({ title, actionText, event, type }: { title?: string, actionText?: string, event?: TEvent, type: TMutateEvent }) => {
  const [responseMessage, setResponseMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, },
    reset
  } = useForm<z.infer<typeof Event>>({ resolver: zodResolver(Event) })
  const mutation = useMutation(mutateEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('events')
      reset()
    },
    onError: (error: any) => {
      setResponseMessage(error.message || error.name)
    }
  })

  return (
    <form className="grid gap-3 my-8" onSubmit={handleSubmit(data => type === TMutateEvent.CREATE_EVENT ? mutation.mutateAsync({ data, type: TMutateEvent.CREATE_EVENT }) : mutation.mutateAsync({ data,event, type: TMutateEvent.UPDATE_EVENT }))}>
      <h2 className="text-2xl">{title || "Create new event now"}</h2>
      <TextField defaultValue={event?.title} error={errors.title?.message} {...register("title")} label="Event title" placeholder="Onboarding new interns" />
      <TextField defaultValue={event?.location} error={errors.location?.message} {...register("location")} label="Location" placeholder="Ngoma, kibungo" />
      <Button disabled={isLoading}>{actionText || "Create Event"}</Button>
      <p className='text-center text-orange-600'>{responseMessage}</p>
    </form>
  )
}
