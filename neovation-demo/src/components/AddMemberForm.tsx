"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./AddMemberForm.module.css";

export default function AddMemberForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newMember: { name: string; email: string; role: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      if (!res.ok) throw new Error("Failed to add member");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setFirstName("");
      setLastName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: `${firstName} ${lastName}`,
      email,
      role: "Member",
    });
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Add Member</h1>
      <p className={styles.subtitle}>
        Demo form for Neovation Frontend role
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          className={styles.input}
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          className={styles.input}
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <button className={styles.button} type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Adding..." : "Add Member"}
        </button>

        {mutation.isError && (
          <p className={styles.error}>Failed to add member</p>
        )}
      </form>
    </div>
  );
}
