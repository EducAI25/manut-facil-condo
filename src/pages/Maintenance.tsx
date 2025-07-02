import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChamadoForm } from '@/components/forms/ChamadoForm';
import { ManutencaoPreventivaForm } from '@/components/forms/ManutencaoPreventivaForm';

export default function Maintenance() {
  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="chamados" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chamados">Abrir Chamados</TabsTrigger>
          <TabsTrigger value="preventiva">Manutenção Preventiva</TabsTrigger>
        </TabsList>
        <TabsContent value="chamados">
          <ChamadoForm />
        </TabsContent>
        <TabsContent value="preventiva">
          <ManutencaoPreventivaForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}