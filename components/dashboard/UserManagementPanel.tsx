"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type UserRole = "ADMIN" | "USER";

type DemoUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

type UserManagementPanelProps = {
  currentUserRole: UserRole;
};

const initialUsers: DemoUser[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
  },
  {
    id: 2,
    name: "Normal User",
    email: "user@example.com",
    role: "USER",
  },
];

export default function UserManagementPanel({
  currentUserRole,
}: UserManagementPanelProps) {
  const [users, setUsers] = useState<DemoUser[]>(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("USER");

  const isAdmin = currentUserRole === "ADMIN";

  function handleViewUsers() {
    setMessage("Showing all available users.");
  }

  function handleAddUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAdmin) {
      setMessage("Access denied. Only admins can add users.");
      return;
    }

    if (!newName || !newEmail) {
      setMessage("Please enter both name and email.");
      return;
    }

    const newUser: DemoUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: newRole,
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);
    setNewName("");
    setNewEmail("");
    setNewRole("USER");
    setMessage(`User ${newUser.name} was added successfully.`);
  }

  function handleEditUser() {
    if (!isAdmin) {
      setMessage("Access denied. Only admins can edit users.");
      return;
    }

    if (!selectedUserId) {
      setMessage("Please select a user before editing.");
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId
          ? {
              ...user,
              role: user.role === "ADMIN" ? "USER" : "ADMIN",
            }
          : user,
      ),
    );

    setMessage("Selected user's role was updated.");
  }

  function handleDeleteUser() {
    if (!isAdmin) {
      setMessage("Access denied. Only admins can delete users.");
      return;
    }

    if (!selectedUserId) {
      setMessage("Please select a user before deleting.");
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== selectedUserId),
    );

    setSelectedUserId(null);
    setMessage("Selected user was deleted.");
  }

  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">User Management</h2>
        <p className="text-sm text-slate-400">
          Admins can add, edit, delete, and view users. Normal users can only
          view.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {isAdmin && (
          <>
            <Button type="button" onClick={handleEditUser} variant="secondary">
              Edit Selected User
            </Button>

            <Button type="button" onClick={handleDeleteUser} variant="danger">
              Delete Selected User
            </Button>
          </>
        )}

        <Button type="button" onClick={handleViewUsers} variant="secondary">
          View Users
        </Button>
      </div>

      {message && (
        <div className="mb-6 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm text-violet-200">
          {message}
        </div>
      )}

      {isAdmin && (
        <form
          onSubmit={handleAddUser}
          className="mb-6 grid gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 md:grid-cols-[1fr_1fr_160px_auto]"
        >
          <input
            type="text"
            placeholder="User name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
          />

          <input
            type="email"
            placeholder="User email"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
          />

          <select
            value={newRole}
            onChange={(event) => setNewRole(event.target.value as UserRole)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <Button type="submit">Add User</Button>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="px-4 py-3">Select</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Permission</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr
                key={user.id}
                className={
                  selectedUserId === user.id
                    ? "bg-violet-500/10"
                    : "bg-transparent"
                }
              >
                <td className="px-4 py-3">
                  <input
                    type="radio"
                    name="selectedUser"
                    checked={selectedUserId === user.id}
                    onChange={() => setSelectedUserId(user.id)}
                    disabled={!isAdmin}
                    className="h-4 w-4"
                  />
                </td>

                <td className="px-4 py-3 text-white">{user.name}</td>

                <td className="px-4 py-3 text-slate-300">{user.email}</td>

                <td
                  className={`px-4 py-3 ${
                    user.role === "ADMIN" ? "text-violet-400" : "text-blue-400"
                  }`}
                >
                  {user.role}
                </td>

                <td className="px-4 py-3">
                  {user.role === "ADMIN" ? (
                    <span className="text-green-400">
                      Add / Edit / Delete / View
                    </span>
                  ) : (
                    <span className="text-slate-400">View only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isAdmin && (
        <p className="mt-4 text-sm text-slate-500">
          You are logged in as USER, so add, edit, and delete actions are hidden.
        </p>
      )}
    </Card>
  );
}