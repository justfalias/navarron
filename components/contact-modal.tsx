import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { Vendor } from '@/lib/vendors'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  vendor: Vendor
}

export default function ContactModal({ isOpen, onClose, vendor }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contactar con {vendor.name}</DialogTitle>
          <DialogDescription>
            Utiliza la siguiente información para ponerte en contacto con el comerciante.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-primary" />
            <span>{vendor.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary" />
            <a href={`mailto:${vendor.email}`} className="hover:underline">{vendor.email}</a>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{vendor.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <a href={`https://wa.me/${vendor.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              WhatsApp: {vendor.whatsapp}
            </a>
          </div>
        </div>
        <Button onClick={onClose} className="mt-4">Cerrar</Button>
      </DialogContent>
    </Dialog>
  )
}

