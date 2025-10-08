export default function SignupForm() {
  return (
      <div className="flex items-center gap-3 mb-2">
        <div>
          <label className="block text-sm text-gray-700">First Name</label>
          <input
            type="text"
            placeholder="John"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            Second Name
          </label>
          <input
            type="text"
            placeholder="Doe"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
  );
}
