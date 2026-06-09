import { useState } from 'react';

interface TouristFormProps {
  accountData: Record<string, any>;
  onSuccess: () => void;
}

export default function TouristForm({ accountData, onSuccess }: TouristFormProps) {
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Logic for constructing payloads with files
      console.log('Submitting Tourist Registration:', {
        ...accountData,
        country,
        language,
        phoneNumber,
        passportPhotoName: passportPhoto?.name,
        profilePhotoName: profilePhoto?.name,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } catch (err) {
      alert('Tourist profile creation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
          <input
            type="text"
            required
            placeholder="e.g. Sri Lanka"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Language</label>
          <input
            type="text"
            required
            placeholder="e.g. English, French"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          required
          placeholder="+94 7X XXX XXXX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="border border-dashed border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Passport Copy / ID</label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={(e) => setPassportPhoto(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Display Profile Photo</label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? 'REGISTERING...' : 'REGISTER AS TOURIST'}
      </button>
    </form>
  );
}