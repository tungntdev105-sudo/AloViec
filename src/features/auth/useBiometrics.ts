import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateWithBiometrics(): Promise<boolean> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    
    // Nếu thiết bị không hỗ trợ / người dùng chưa cài đặt vân tay/faceid thì bỏ qua ko lỗi
    if (!hasHardware || !isEnrolled) {
      return false;
    }
    
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Xác thực để đăng nhập AloViec',
      fallbackLabel: 'Sử dụng mật khẩu',
      cancelLabel: 'Hủy',
    });
    
    return result.success;
  } catch (error) {
    console.error("Lỗi sinh trắc học:", error);
    return false;
  }
}
