import { useState } from 'react';

interface HotelFormProps {
  accountData: Record<string, any>;
  onSuccess: () => void;
}

export default function HotelForm({ accountData, onSuccess }: HotelFormProps) {
  const [hotelName, setHotelName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [hotelPhotos, setHotelPhotos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting Hotel Registration:', {
        ...accountData,
        hotelName,
        address,
        location: { city, state, country, postalCode },
        phone,
        website,
        license: { number: licenseNumber, expiryDate: licenseExpiry },
        photoCount: hotelPhotos ? hotelPhotos.length : 0
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } catch (err) {
      alert('Hotel registration execution failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Hotel Business Name</label>
          <input
            type="text"
            required
            placeholder="Grand Heritage Resort"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Hotel Contact Phone</label>
          <input
            type="tel"
            required
            placeholder="+94 91 XXX XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address</label>
        <input
          type="text"
          required
          placeholder="45 Marine Drive"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
          <input
            type="text"
            required
            placeholder="Galle"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">State / Prov.</label>
          <input
            type="text"
            required
            placeholder="Southern"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
          <input
            type="text"
            required
            placeholder="Sri Lanka"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Postal Code</label>
          <input
            type="text"
            required
            placeholder="80000"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Business Website URL (Optional)</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Property Photos</label>
          <input
            type="file"
            required
            multiple
            accept="image/*"
            onChange={(e) => setHotelPhotos(e.target.files)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tourism License Number</label>
          <input
            type="text"
            required
            placeholder="LIC-HTL-9921"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">License Expiry Date</label>
          <input
            type="date"
            required
            value={licenseExpiry}
            onChange={(e) => setLicenseExpiry(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? 'REGISTERING RESORT...' : 'REGISTER HOTEL PROFILE'}
      </button>
    </form>
  );
}