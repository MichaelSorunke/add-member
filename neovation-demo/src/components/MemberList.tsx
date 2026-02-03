"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./MemberList.module.css"; // import your module

type Member = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function MembersList() {
  const { data, isLoading, error } = useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`);
      if (!res.ok) throw new Error("Failed to fetch members");
      return res.json();
    },
  });

  return (
    <div className={styles.card}>
      <h2>Members</h2>

      {isLoading && <p>Loading members…</p>}
      {error && <p className={styles.error}>Failed to load members.</p>}

      <ul className={styles.list}>
        {data?.map((m) => (
          <li key={m.id}>
            <div className={styles.memberInfo}>
              <strong>{m.name}</strong>
              <span>{m.email}</span>
            </div>
            <span className={styles.badge}>{m.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
