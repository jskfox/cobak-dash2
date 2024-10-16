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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  {
    id: 2,
    title: "Reservación de Carlos Rodríguez",
    start: new Date(2024, 3, 16, 14, 0),
    end: new Date(2024, 3, 16, 16, 0),
    resourceId: "zurich",
    client: mockClients[1],
  },
  {
    id: 3,
    title: "Reservación de Elena Martínez",
    start: new Date(2024, 3, 17, 9, 0),
    end: new Date(2024, 3, 17, 11, 0),
    resourceId: "moero",
    client: mockClients[2],
  },
  {
    id: 4,
    title: "Reservación de David López",
    start: new Date(2024, 3, 18, 13, 0),
    end: new Date(2024, 3, 18, 15, 0),
    resourceId: "chad",
    client: mockClients[3],
  },
  {
    id: 5,
    title: "Reservación de Isabel Sánchez",
    start: new Date(2024, 3, 19, 11, 0),
    end: new Date(2024, 3, 19, 13, 0),
    resourceId: "zurich",
    client: mockClients[4],
  },
  {
    id: 6,
    title: "Reservación de Fernando Pérez",
    start: new Date(2024, 3, 20, 15, 0),
    end: new Date(2024, 3, 20, 17, 0),
    resourceId: "moero",
    client: mockClients[5],
  },
  {
    id: 7,
    title: "Reservación de Gloria Gómez",
    start: new Date(2024, 3, 21, 10, 0),
    end: new Date(2024, 3, 21, 12, 0),
    resourceId: "chad",
    client: mockClients[6],
  },
  {
    id: 8,
    title: "Reservación de Hugo Ramírez",
    start: new Date(2024, 3, 22, 14, 0),
    end: new Date(2024, 3, 22, 16, 0),
    resourceId: "zurich",
    client: mockClients[7],
  },
  {
    id: 9,
    title: "Reservación de Julieta Torres",
    start: new Date(2024, 3, 23, 9, 0),
    end: new Date(2024, 3, 23, 11, 0),
    resourceId: "moero",
    client: mockClients[8],
  },
  {
    id: 10,
    title: "Reservación de Kevin Vargas",
    start: new Date(2024, 3, 24, 13, 0),
    end: new Date(2024, 3, 24, 15, 0),
    resourceId: "chad",
    client: mockClients[9],
  },
  {
    id: 11,
    title: "Reservación de Laura Núñez",
    start: new Date(2024, 3, 25, 11, 0),
    end: new Date(2024, 3, 25, 13, 0),
    resourceId: "zurich",
    client: mockClients[10],
  },
  {
    id: 12,
    title: "Reservación de Miguel Ortega",
    start: new Date(2024, 3, 26, 15, 0),
    end: new Date(2024, 3, 26, 17, 0),
    resourceId: "moero",
    client: mockClients[11],
  },
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
              <Command>
                <CommandInput placeholder="Buscar cliente..." />
                <CommandEmpty>No se encontraron clientes.</CommandEmpty>
                <CommandGroup>
                  {mockClients.map((client) => (
                    <CommandItem
                      key={client.id}
                      onSelect={() => {
                        setSelectedClient(
                          selectedClient?.id === client.id ? null : client
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedClient?.id === client.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {client.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
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
