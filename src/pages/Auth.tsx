
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      console.log('Login error:', error);
      if (error.message.includes('Invalid login credentials')) {
        setError('E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Confirme seu e-mail antes de fazer login.');
      } else {
        setError(error.message || 'Erro no login. Tente novamente.');
      }
    } else {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark-auth p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-float">
              <span className="text-4xl">🫐</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Mirtilo</CardTitle>
          <CardDescription>
            Sistema de Gestão de Condomínios
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">Contas de teste:</p>
              <div className="space-y-1">
                <p><strong>Admin:</strong> admin@mirtilo.com / admin123</p>
                <p><strong>Usuário:</strong> usuario@mirtilo.com / user123</p>
              </div>
              <p className="text-xs mt-2 text-orange-600">
                <strong>Nota:</strong> Se as contas de teste não funcionarem, você precisa criá-las no painel do Supabase Auth.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
