import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.app.nik.kurti.config',
  appName: 'Kurti Config',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
