"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ReservationForm({ onSubmit, clients, rooms }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (data) => {
    const start = new Date(`${data.date}T${data.startTime}`);
    const end = new Date(start.getTime() + data.duration * 60 * 60 * 1000);
    const client = clients.find(c => c.id === parseInt(data.clientId));
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
      <div>
        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Cliente</label>
        <Select onValueChange={(value) => register('clientId').onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map(client => (
              <SelectItem key={client.id} value={client.id.toString()}>{client.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">Sala/Oficina</label>
        <Select onValueChange={(value) => register('roomId').onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar sala/oficina" />
          </SelectTrigger>
          <SelectContent>
            {rooms.map(room => (
              <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
        <Input type="date" {...register('date', { required: true })} />
      </div>
      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Hora de inicio</label>
        <Input type="time" {...register('startTime', { required: true })} />
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duración (horas)</label>
        <Input type="number" {...register('duration', { required: true, min: 0.5, max: 8 })} step="0.5" />
      </div>
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instrucciones generales</label>
        <Textarea {...register('instructions')} />
      </div>
      <Button type="submit">Guardar Reservación</Button>
    </form>
  );
}