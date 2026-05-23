import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import LogoutButton from "@/components/ui/LogoutButton";
import { verifyAuthToken } from "@/lib/auth/jwt";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const user = verifyAuthToken(token);

  if (!user) {
    redirect("/login");
  }

  const isAdmin = user.role === "ADMIN";

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <PageHeader
              label="Protected Dashboard"
              title={`Welcome, ${user.name}`}
              description={`You are logged in as ${user.role}. This dashboard is protected by a JWT cookie.`}
            />

            <LogoutButton />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-slate-950">
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-2 font-semibold text-white">{user.email}</p>
            </Card>

            <Card className="bg-slate-950">
              <p className="text-sm text-slate-400">Role</p>
              <p className="mt-2 font-semibold text-violet-400">
                {user.role}
              </p>
            </Card>

            <Card className="bg-slate-950">
              <p className="text-sm text-slate-400">Access Status</p>
              <p className="mt-2 font-semibold text-green-400">Verified</p>
            </Card>
          </div>
        </Card>

        <Card>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white">User Management</h2>
            <p className="text-sm text-slate-400">
              Admins can add, edit, delete, and view users. Normal users can
              only view.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {isAdmin && (
              <>
                <Button>Add User</Button>
                <Button variant="secondary">Edit User</Button>
                <Button variant="danger">Delete User</Button>
              </>
            )}

            <Button variant="secondary">View Users</Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Permission</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="px-4 py-3 text-white">Admin User</td>
                  <td className="px-4 py-3 text-slate-300">
                    admin@example.com
                  </td>
                  <td className="px-4 py-3 text-violet-400">ADMIN</td>
                  <td className="px-4 py-3 text-green-400">
                    Add / Edit / Delete / View
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-white">Normal User</td>
                  <td className="px-4 py-3 text-slate-300">
                    user@example.com
                  </td>
                  <td className="px-4 py-3 text-blue-400">USER</td>
                  <td className="px-4 py-3 text-slate-400">View only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-sm text-slate-400">Authentication</p>
            <p className="mt-2 text-2xl font-bold text-white">JWT Active</p>
            <p className="mt-2 text-sm text-slate-500">
              The dashboard is opened only after OTP verification creates a JWT
              cookie.
            </p>
          </Card>

          <Card>
            <p className="text-sm text-slate-400">Two-Factor Auth</p>
            <p className="mt-2 text-2xl font-bold text-white">OTP Verified</p>
            <p className="mt-2 text-sm text-slate-500">
              The user must verify the generated OTP before accessing this page.
            </p>
          </Card>

          <Card>
            <p className="text-sm text-slate-400">Role-Based Access</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {isAdmin ? "Admin Mode" : "User Mode"}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              The visible actions change depending on whether the logged-in user
              is ADMIN or USER.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}