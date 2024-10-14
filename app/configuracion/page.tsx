import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfiguracionPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      <Card>
        <CardHeader>
          <CardTitle>Ajustes del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Aquí puedes configurar las opciones del sistema.</p>
          {/* Añadir opciones de configuración aquí */}
        </CardContent>
      </Card>
    </div>
  )
}