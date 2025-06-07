export async function mockLogin(email: string, password: string): Promise<boolean> {
  const validEmail = 'jimmy@email.com';
  const validPassword = 'jim100909';

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email === validEmail && password === validPassword);
    }, 800);
  });
}
