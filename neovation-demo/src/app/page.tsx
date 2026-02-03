import AddMemberForm from "@/components/AddMemberForm";
import MemberList from "@/components/MemberList";

export default function Home() {
  return (
    <main className="page">
      <section className="grid">
        <AddMemberForm />
        <MemberList />
      </section>
    </main>
  );
}
