import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUser, updateUser } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { guideService } from "@/services/guide.service";
import { Navbar } from "@/components/Navbar";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { formatServerError } from "@/utils/helpers";
import { X, Plus, ChevronDown, ChevronUp } from "lucide-react";

const PROFICIENCY_LEVELS = ["BASIC", "CONVERSATIONAL", "INTERMEDIATE", "FLUENT", "NATIVE"];

export default function GuideProfile() {
  const [user] = useState(getUser());
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    experienceYears: 0,
    hourlyRate: 0,
    dailyRate: 0,
    languages: [],
    specializations: [],
    certifications: [],
  });
  const [newLang, setNewLang] = useState("");
  const [newLangProficiency, setNewLangProficiency] = useState("FLUENT");
  const [newSpec, setNewSpec] = useState("");
  const [showCerts, setShowCerts] = useState(false);

  useEffect(() => {
    guideService.getMe().then(res => {
      const d = res?.data || res;
      if (d) {
        setFormData({
          bio: d.bio || "",
          experienceYears: d.experienceYears || 0,
          hourlyRate: d.hourlyRate || 0,
          dailyRate: d.dailyRate || 0,
          languages: d.languages || [],
          specializations: d.specializations?.map(s => s.name || s) || [],
          certifications: d.certifications?.filter(c => c && c.name) || [],
        });
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "number" ? parseFloat(value) || 0 : value }));
  };

  const addLanguage = () => {
    const trimmed = newLang.trim();
    if (trimmed && !formData.languages.find(l => (l.language || l) === trimmed)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, { language: trimmed, proficiency: newLangProficiency }],
      }));
      setNewLang("");
    }
  };

  const removeLanguage = (index) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const addSpecialization = () => {
    const trimmed = newSpec.trim();
    if (trimmed && !formData.specializations.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, trimmed],
      }));
      setNewSpec("");
    }
  };

  const removeSpecialization = (index) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const langs = formData.languages.map(l => typeof l === 'string' ? { language: l, proficiency: "FLUENT" } : l);
      const specs = formData.specializations.map(s => typeof s === 'string' ? { name: s } : s);
      const res = await guideService.updateMe(
        formData.bio, formData.experienceYears, formData.hourlyRate, formData.dailyRate,
        langs, specs, formData.certifications
      );
      const d = res?.data || res;
      if (d) updateUser({ profile: d });
      toast.success("Guide profile updated successfully!");
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || "Failed to update guide profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSkeleton count={1} type="list" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Guide Profile</CardTitle>
              <CardDescription>Update your professional guide details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} disabled={saving} rows={3} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experienceYears">Experience (years)</Label>
                        <Input id="experienceYears" name="experienceYears" type="number" min="0" value={formData.experienceYears} onChange={handleChange} disabled={saving} />
                      </div>
                      <div>
                        <Label htmlFor="responseTimeMins" className="text-gray-400">Response Time</Label>
                        <Input disabled value="Set by system" className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Rates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input id="hourlyRate" name="hourlyRate" type="number" min="0" step="0.5" value={formData.hourlyRate} onChange={handleChange} disabled={saving} />
                    </div>
                    <div>
                      <Label htmlFor="dailyRate">Daily Rate ($)</Label>
                      <Input id="dailyRate" name="dailyRate" type="number" min="0" step="0.5" value={formData.dailyRate} onChange={handleChange} disabled={saving} />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.languages.map((l, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm">
                        {l.language || l} - {l.proficiency || "FLUENT"}
                        <button type="button" onClick={() => removeLanguage(i)} className="text-teal-400 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 flex gap-2">
                      <Input placeholder="Language (e.g. English)" value={newLang} onChange={e => setNewLang(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addLanguage(); } }} />
                      <select
                        value={newLangProficiency}
                        onChange={e => setNewLangProficiency(e.target.value)}
                        className="px-2 py-1 border rounded-md text-sm bg-white"
                      >
                        {PROFICIENCY_LEVELS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <Button type="button" variant="outline" onClick={addLanguage}><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.specializations.map((s, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm">
                        {s.name || s}
                        <button type="button" onClick={() => removeSpecialization(i)} className="text-purple-400 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Specialization (e.g. Wildlife)" value={newSpec} onChange={e => setNewSpec(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSpecialization(); } }} />
                    <Button type="button" variant="outline" onClick={addSpecialization}><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>

                {formData.certifications.length > 0 && (
                  <div className="border-t pt-6">
                    <button type="button" className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4" onClick={() => setShowCerts(!showCerts)}>
                      Certifications ({formData.certifications.length})
                      {showCerts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {showCerts && (
                      <div className="space-y-2">
                        {formData.certifications.map((c, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm">
                            <p className="font-medium">{c.name}</p>
                            <p className="text-gray-500">{c.org}{c.expiryDate ? ` · Exp: ${new Date(c.expiryDate).toLocaleDateString()}` : ""}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setLocation("/dashboard")} disabled={saving}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
