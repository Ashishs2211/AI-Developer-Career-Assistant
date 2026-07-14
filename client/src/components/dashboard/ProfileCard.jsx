export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <h2 className="text-2xl font-bold mb-4">
        User Profile
      </h2>

      <div className="space-y-3">

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>GitHub:</strong> {user?.githubUsername}
        </p>

        <p>
          <strong>LinkedIn:</strong> {user?.linkedin}
        </p>

      </div>

    </div>
  );
}