"use client"

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ReservationForm({ onSubmit, clients, rooms }) {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [submitError, setSubmitError] = useState('');

  const onFormSubmit = (data) => {
    const start = new Date(`${data.date}T${data.startTime}`);
    const end = new Date(start.getTime() + data.duration * 60 * 60 * 1000);
    const client = clients.find(c => c.id === parseInt(data.clientId));
    
    if (!client) {
      setSubmitError('Por favor, selecciona un cliente.');
      return;
    }

    setSubmitError('');
    const newReservation = {
      id: Date.now(),
      title: `Reservación de ${client.name}`,
      start,
      end,
      resourceId: data.roomId,
      client,
      instructions: data.instructions
    };
    onSubmit(newReservation);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {submitError && (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      <div>
        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Cliente</label>
        <Controller
          name="clientId"
          control={control}
          rules={{ required: "Por favor, selecciona un cliente" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id.toString()}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.clientId && <p className="text-red-500 text-sm mt-1">{errors.clientId.message}</p>}
      </div>
      <div>
        <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">Sala/Oficina</label>
        <Controller
          name="roomId"
          control={control}
          rules={{ required: "Por favor, selecciona una sala/oficina" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar sala/oficina" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map(room => (
                  <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.roomId && <p className="text-red-500 text-sm mt-1">{errors.roomId.message}</p>}
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
        <Input type="date" {...register('date', { required: "La fecha es requerida" })} />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
      </div>
      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Hora de inicio</label>
        <Input type="time" {...register('startTime', { required: "La hora de inicio es requerida" })} />
        {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duración (horas)</label>
        <Input type="number" {...register('duration', { required: "La duración es requerida", min: { value: 0.5, message: "La duración mínima es de 0.5 horas" }, max: { value: 8, message: "La duración máxima es de 8 horas" } })} step="0.5" />
        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
      </div>
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instrucciones generales</label>
        <Textarea {...register('instructions')} />
      </div>
      <Button type="submit">Guardar Reservación</Button>
    </form>
  );
}