export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR');
}; 