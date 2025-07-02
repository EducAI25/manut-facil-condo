import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useSuppliers, type Supplier } from '@/hooks/useSuppliers';

export function SupplierList() {
  const { suppliers, loading, deleteSupplier } = useSuppliers();

  if (loading) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-4">Carregando fornecedores...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fornecedores Cadastrados</CardTitle>
      </CardHeader>
      <CardContent>
        {suppliers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum fornecedor cadastrado</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome/Empresa</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      {supplier.nome_fantasia && (
                        <div className="text-sm text-muted-foreground">{supplier.nome_fantasia}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {supplier.tipo_pessoa === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                    </Badge>
                  </TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{supplier.email}</div>
                      <div>{supplier.celular}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteSupplier(supplier.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}