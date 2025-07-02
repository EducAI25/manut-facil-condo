export const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const bancos = [
  'Banco do Brasil', 'Bradesco', 'Caixa Econômica Federal', 'Itaú', 'Santander', 'Nubank', 'Inter', 'Sicoob', 'Sicredi', 'Banco Original', 'Outros'
];

export const formatCpfCnpj = (value: string, tipo: string) => {
  const numbers = value.replace(/\D/g, '');
  if (tipo === 'pf') {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
};

export const formatPhone = (value: string, isCell: boolean) => {
  const numbers = value.replace(/\D/g, '');
  if (isCell) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
};

export const formatCep = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
};