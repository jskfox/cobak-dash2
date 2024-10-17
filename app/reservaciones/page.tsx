"use client";

import { useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReservationForm } from "@/components/ReservationForm";
import { mockClients } from "@/lib/mockData";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

moment.locale("es");
const localizer = momentLocalizer(moment);

const rooms = [
  { id: "chad", name: "Sala Chad" },
  { id: "zurich", name: "Sala Zurich" },
  { id: "moero", name: "Oficina Moero" },
];

const initialEvents = [
  {
    id: 1,
    title: "Reservación de Ana García",
    start: new Date(2024, 3, 15, 10, 0),
    end: new Date(2024, 3, 15, 12, 0),
    resourceId: "chad",
    client: mockClients[0],
  },
  // ... (rest of the initialEvents)
];

export default function ReservacionesPage() {
  const [events, setEvents] = useState(initialEvents);
  const [view, setView] = useState("month");
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("all");
  const [open, setOpen] = useState(false);

  const filteredEvents = events.filter(
    (event) =>
      (!selectedClient || event.client.id === selectedClient.id) &&
      (selectedRoom === "all" || event.resourceId === selectedRoom)
  );

  const handleAddReservation = (newReservation) => {
    setEvents((prevEvents) => [...prevEvents, newReservation]);
  };

  const EventComponent = ({ event }) => (
    <div className="flex items-center p-1 bg-red-100 dark:bg-red-900 rounded-md shadow-sm">
      <img
        src={event.client.avatar}
        alt={event.client.name}
        className="w-6 h-6 rounded-full mr-2"
      />
      <div>
        <div className="font-bold text-sm">{event.title}</div>
        <div className="text-xs text-gray-600 dark:text-gray-300">
          {event.resourceId}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-red-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-300">
        Calendario de Reservaciones
      </h1>
      <div className="flex justify-between mb-6">
        <div className="flex space-x-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedClient ? selectedClient.name : "Seleccionar cliente"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <div className="max-h-[300px] overflow-y-auto">
                {mockClients.map((client) => (
                  <div
                    key={client.id}
                    className={cn(
                      "flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
                      selectedClient?.id === client.id && "bg-gray-100 dark:bg-gray-800"
                    )}
                    onClick={() => {
                      setSelectedClient(selectedClient?.id === client.id ? null : client);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedClient?.id === client.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {client.name}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="all">Todas las áreas</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Agregar Reservación
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nueva Reservación</DialogTitle>
            </DialogHeader>
            <ReservationForm
              onSubmit={handleAddReservation}
              clients={mockClients}
              rooms={rooms}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 250px)" }}
          views={["month", "week", "day"]}
          view={view}
          onView={(newView) => setView(newView)}
          components={{
            event: EventComponent,
          }}
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
        />
      </div>
    </div>
  );
}