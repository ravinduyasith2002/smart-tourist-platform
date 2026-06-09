import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface GuideFormProps {
  accountData: Record<string, any>;
  onSuccess: () => void;
}
type cetificate = {
  name: string;
  photo: File | null;
};

export default function GuideForm({ accountData, onSuccess }: GuideFormProps) {
  const [languages, setLanguages] = useState("");
  const [address, setAddress] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [license, setLicensePhoto] = useState<File | null>(null);
  const [nicPhoto, setNicPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [cetifications, setCertificates] = useState<cetificate[]>([
    { name: "", photo: null },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting Tour Guide Application:", {
        ...accountData,
        languages: languages.split(",").map(l => l.trim()), // Format text into clean Array
        address,
        experienceYears: parseInt(experienceYears),
        hourlyRate: parseFloat(hourlyRate),
        dailyRate: parseFloat(dailyRate),
        bankDetails,
        license: license?.name,
        nicPhotoName: nicPhoto?.name,
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess();
    } catch (err) {
      alert("Guide registration execution failed.");
    } finally {
      setLoading(false);
    }
  };
  // cetificate works
  const addCertificate = () => {
    setCertificates(prev => [...prev, { name: "", photo: null }]);
  };
  const updateName = (index: number, value: string) => {
    setCertificates(prev =>
      prev.map((cert, i) => (i === index ? { ...cert, name: value } : cert))
    );
  };
  const updatePhoto = (index: number, file: File | null) => {
    setCertificates(prev =>
      prev.map((cert, i) => (i === index ? { ...cert, photo: file } : cert))
    );
  };
  const deleteCetificate = (index: number) => {
    setCertificates(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Spoken Languages (Comma Separated)
        </label>
        <input
          type="text"
          required
          placeholder="English, Sinhala, Japanese"
          value={languages}
          onChange={e => setLanguages(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Permanent Address
        </label>
        <input
          type="text"
          required
          placeholder="123 Main St, Colombo"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Experience (Yrs)
          </label>
          <input
            type="number"
            required
            min="0"
            value={experienceYears}
            onChange={e => setExperienceYears(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            required
            min="0"
            value={hourlyRate}
            onChange={e => setHourlyRate(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Daily Rate ($)
          </label>
          <input
            type="number"
            required
            min="0"
            value={dailyRate}
            onChange={e => setDailyRate(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Bank Details (Bank, Branch, Acc No)
        </label>
        <textarea
          required
          rows={2}
          placeholder="Commercial Bank, Galle Branch, Acc: 800123456"
          value={bankDetails}
          onChange={e => setBankDetails(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      <div className="border flex flex-col border-dashed border-gray-200 rounded-lg p-4 bg-gray-100  md:grid-cols-2 gap-6">
        <div className="bg-white p-2 rounded-lg">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
            Guide License / Certification
          </label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={e => setLicensePhoto(e.target.files?.[0] || null)}
            className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer"
          />
        </div>
        <div className="bg-white p-2 rounded-lg">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
            NIC or Passport Front
          </label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={e => setNicPhoto(e.target.files?.[0] || null)}
            className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer"
          />
        </div>
      </div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Cetifications
      </label>
      {cetifications.map((certificate, index) => (
        <>
          <div
            key={index}
            className="flex flex-col  gap-3 mb-5 border-gray-200 rounded-lg p-4 bg-gray-100"
          >
            <input
              type="text"
              placeholder="Certificate Name"
              value={certificate.name}
              onChange={e => updateName(index, e.target.value)}
              className="w-full rounded-lg border col-span-4 bg-white border-gray-200 px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex flex-col justify-center col-span-4 bg-white p-2 rounded-lg ">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                certificate photo
              </label>
              <input
                type="file"
                onChange={e => updatePhoto(index, e.target.files?.[0] || null)}
                className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer"
              />
            </div>
            <div
              className="w-full justify-center flex"
              onClick={() => deleteCetificate(index)}
            >
              <button className="p-2 bg-white rounded-full">
                <FaTrash size={15} />
              </button>
            </div>
          </div>
        </>
      ))}
      <div className="flex justify-center">
        <button
          className="rounded-full bg-gray-200 p-2"
          onClick={() => addCertificate()}
        >
          <FaPlus size={14} className="text-gray-600" />
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? "SUBMITTING TO ADMNS..." : "SUBMIT GUIDE APPLICATION"}
      </button>
    </form>
  );
}
