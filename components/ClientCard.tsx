"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calendar, Clock, Star, Phone, Home, Printer } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Tooltip as TooltipComponent } from "@nextui-org/tooltip"
interface Client {
  id: number;
  name: string;
  avatar: string;
  paymentDay: string;
  membershipType: string;
  flexSubcategory?: string;
  hoursUsed: number;
  totalHours: number;
  copiesUsed: number;
  totalCopies: number;
  paymentStatus: string;
  phoneExtension?: string;
  interiorNumber?: string;
}

export function ClientCard({ client }: { client: Client }) {
  const percentageHoursUsed = (client.hoursUsed / client.totalHours) * 100;
  const percentageCopiesUsed = (client.copiesUsed / client.totalCopies) * 100;
  const getPaidColor = () =>{
    if (client.paymentStatus === "Pagado") {
      return 'w-4 h-4 mr-1 text-green-500';
    } else {
      return 'w-4 h-4 mr-1 text-red-500';
    }    
  }
  const getMembershipColor = () => {
    if (client.membershipType === 'Flex') {
      switch (client.flexSubcategory) {
        case 'Basic': return 'text-sky-200';
        case 'Starter': return 'text-sky-400';
        case 'Premium': return 'text-indigo-400';
        case 'Business': return 'text-violet-700';
        default: return 'text-red-500';
      }
    }
    switch (client.membershipType) {
      case 'My Office': return 'text-blue-500';
      case 'My Desk': return 'text-green-500';
      case 'Virtual': return 'text-yellow-500';
      case 'Flex': return 'bg-teal-300';
      default: return 'text-red-500';
    }
  };

  const membershipColor = getMembershipColor();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={client.avatar} alt={client.name} />
            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg text-orange-800 dark:text-orange-100	flex-grow">{client.name}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DollarSign className={getPaidColor()} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{client.paymentStatus}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>                        
            <Calendar className="w-4 h-4 mr-1" />
            <span>{client.paymentDay}</span>
          </div>
          
        </div>

        <div className="space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <Progress 
                    value={percentageHoursUsed} 
                    className="[&>*]:bg-indigo-500 h-2 flex-grow mx-2" 
                    // indicatorColor="bg-indigo-500"
                    style={{
                      background: '#E5E7EB',
                    }}
                  />
                  <span className="text-xs whitespace-nowrap">
                    {client.hoursUsed}/{client.totalHours}h
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Uso del servicio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 text-sm">
                  <Printer className="w-4 h-4 mr-2" />
                  <Progress 
                    value={percentageCopiesUsed} 
                    className="[&>*]:bg-fuchsia-400 h-2 flex-grow mx-2" 
                    // indicatorColor="bg-fuchsia-400"
                    style={{
                      background: '#E5E7EB',
                    }}
                  />
                  <span className="text-xs whitespace-nowrap">
                    {client.copiesUsed}/{client.totalCopies}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Uso de copias</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className={`flex items-center font-medium`}>
            <Star className="w-3 h-3 mr-1" />
            <span className={client.membershipType==='Flex'?'text-lime-100':membershipColor}>{client.membershipType}</span>
            {client.flexSubcategory && <span className="mx-1">-</span>}
            <span className={`${membershipColor}`}>{client.flexSubcategory}</span>
          </div>
          <div className="flex space-x-2">
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              <span>{client.phoneExtension || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <Home className="w-3 h-3 mr-1" />
              <span>{client.interiorNumber || 'N/A'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}