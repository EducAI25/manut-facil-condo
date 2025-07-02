import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useReservations, type Reservation } from '@/hooks/useReservations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Plus } from 'lucide-react';

export function ReservationForm() {
  const { reservations, commonAreas, loading, createReservation } = useReservations();
  const [formData, setFormData] = useState({
    common_area_id: '', start_datetime: '', end_datetime: '', purpose: '', 
    expected_guests: '', status: 'pending', payment_status: 'pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const reservationData = { ...formData, expected_guests: formData.expected_guests ? parseInt(formData.expected_guests) : undefined };
    await createReservation(reservationData);
    setFormData({ common_area_id: '', start_datetime: '', end_datetime: '', purpose: '', expected_guests: '', status: 'pending', payment_status: 'pending' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const quickBookingAreas = [
    { id: 'salao-festas', name: 'Salão de Festas' },
    { id: 'churrasqueira', name: 'Churrasqueira' },
    { id: 'espaco-gourmet', name: 'Espaço Gourmet' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Reserva Rápida</CardTitle>
          <CardDescription>Agende rapidamente as áreas mais utilizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {quickBookingAreas.map((area) => (
              <Button key={area.id} variant="outline" className="h-20 flex flex-col items-center gap-2">
                <Calendar className="h-6 w-6" />
                <span>{area.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestão de Reservas</CardTitle>
          <CardDescription>Todas as reservas de áreas comuns</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Área</Label>
                <select name="common_area_id" value={formData.common_area_id} onChange={handleChange} className="w-full p-2 border rounded" required>
                  <option value="">Selecione uma área</option>
                  {commonAreas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
                </select>
              </div>
              <div><Label>Convidados</Label><Input name="expected_guests" type="number" value={formData.expected_guests} onChange={handleChange} /></div>
              <div><Label>Início</Label><Input name="start_datetime" type="datetime-local" value={formData.start_datetime} onChange={handleChange} required /></div>
              <div><Label>Término</Label><Input name="end_datetime" type="datetime-local" value={formData.end_datetime} onChange={handleChange} required /></div>
            </div>
            <div><Label>Finalidade</Label><Textarea name="purpose" value={formData.purpose} onChange={handleChange} required /></div>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Reservar'}</Button>
          </form>
          
          {loading ? <div>Carregando...</div> : (
            <Table>
              <TableHeader><TableRow><TableHead>Área</TableHead><TableHead>Data/Hora</TableHead><TableHead>Finalidade</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.common_areas?.name || 'Área não especificada'}</TableCell>
                    <TableCell>{new Date(reservation.start_datetime).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{reservation.purpose}</TableCell>
                    <TableCell>{reservation.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}