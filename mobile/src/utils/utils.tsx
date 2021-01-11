export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Campo e-mail não pode estar vazio.';
  if (!re.test(email)) return 'Ooops! Seu e-mail precisa ser válido.';

  return '';
};

export const senhaValidator = (senha: string) => {
  if (!senha || senha.length <= 0) return 'Campo senha não pode estar vazio.';

  return '';
};

export const usuarioValidator = (usuario: string) => {
  if (!usuario || usuario.length <= 0) return 'Campo usuário não pode estar vazio.';

  return '';
};

export const nomeValidator = (nome: string) => {
  if (!nome || nome.length <= 0) return 'Campo nome não pode estar vazio.';

  return '';
};
