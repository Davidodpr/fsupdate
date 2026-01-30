export interface Coordinator {
  id: string;
  name: string;
  title: string;
  phone: {
    display: string;
    href: string;
    canonical: string;
    alternatives: string[];
  };
  email: string;
  imageKitPath: string;
}
