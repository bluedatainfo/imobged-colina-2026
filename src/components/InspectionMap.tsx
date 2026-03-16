import { useState } from 'react'
import { MapPin, Navigation, Crosshair } from 'lucide-react'
import useMainStore, { Property, isSlaBreached } from '@/stores/main'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface Props {
  properties: Property[]
  onStartInspection: (id: string) => void
}

export function InspectionMap({ properties, onStartInspection }: Props) {
  const [userLoc, setUserLoc] = useState<{ x: number; y: number } | null>(null)
  const { settings } = useMainStore()

  const handleLocate = () => {
    // Fake geolocation finding user near center
    setUserLoc({ x: 48, y: 52 })
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] bg-slate-50 rounded-xl border overflow-hidden">
      {/* Background Map Grid */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--primary)) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent z-0" />

      {/* User Location */}
      {userLoc && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000"
          style={{ left: `${userLoc.x}%`, top: `${userLoc.y}%` }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute opacity-75" />
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white relative z-10 shadow-sm" />
          </div>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background text-[10px] font-medium px-1.5 py-0.5 rounded border shadow-sm">
            Você está aqui
          </div>
        </div>
      )}

      {/* Property Pins */}
      {properties.map((p) => {
        const x = p.location?.x || 50
        const y = p.location?.y || 50
        const isOverdue = isSlaBreached(p.slaStart, settings.slaHours)
        const pinColor = isOverdue
          ? 'text-destructive fill-destructive/20'
          : 'text-amber-500 fill-amber-100'

        return (
          <div
            key={p.id}
            className="absolute transform -translate-x-1/2 -translate-y-full z-20"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Popover>
              <PopoverTrigger asChild>
                <button className="group relative focus:outline-none hover:-translate-y-1 transition-transform">
                  <MapPin className={`w-8 h-8 drop-shadow-md ${pinColor}`} />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 blur-[2px] rounded-full" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 z-[100]" sideOffset={5}>
                <h4 className="font-bold text-sm mb-1">{p.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{p.address}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => onStartInspection(p.id)}>
                    Iniciar
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Abrir no Mapa"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )
      })}

      {/* Locate Button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 z-30 shadow-md rounded-full bg-background border"
        onClick={handleLocate}
        title="Minha Localização"
      >
        <Crosshair className="w-5 h-5 text-foreground" />
      </Button>
    </div>
  )
}
