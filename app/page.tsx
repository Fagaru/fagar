import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard/cities');
  return null;
}