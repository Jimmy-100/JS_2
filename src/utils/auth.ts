export const mockLogin = async (email: string, password: string): Promise<boolean> => {
  // จำลองดีเลย์
  await new Promise((res) => setTimeout(res, 1000));

  // ตรวจสอบค่า email และ password
  return email === 'jimmy@email.com' && password === 'jim100909';
};
