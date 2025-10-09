export default function LoginForm() {
  return (
    <form className="flex flex-col items-center space-y-4">
      <div className="w-full">
        <label className="block text-sm text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-fit bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition"
      >
        Login
      </button>
    </form>
  );
}
