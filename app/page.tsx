import EthiopianCalendar from "@/components/EthiopianCalendar";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ethiopian Calendar</h1>
      <EthiopianCalendar />
    </main>
  );
}