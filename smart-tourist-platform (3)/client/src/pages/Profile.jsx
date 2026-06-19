import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUser, updateUser } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { touristService } from "@/services/tourist.service";
import { Navbar } from "@/components/Navbar";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { formatServerError } from "@/utils/helpers";

const TRAVEL_STYLES = ["BUDGET", "MODERATE", "LUXURY", "BACKPACKER", "ADVENTURE", "CULTURAL"];
const CURRENCIES = ["USD", "EUR", "GBP", "LKR", "INR", "AUD", "CAD"];
const LANGUAGES = ["English", "Sinhala", "Tamil", "French", "German", "Spanish", "Japanese", "Chinese", "Arabic"];

export default function Profile() {
  const [user, setUser] = useState(getUser());
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [touristData, setTouristData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    avatarUrl: "",
    preferredLanguage: "English",
    preferredCurrency: "USD",
    travelStyle: "MODERATE",
  });

  const role = (user?.role || "TOURIST").toUpperCase();

  useEffect(() => {
    if (role === "TOURIST") {
      touristService.getMe().then(res => {
        const d = res?.data || res;
        if (d) {
          setTouristData(d);
          setFormData(prev => ({
            ...prev,
            preferredLanguage: d.preferredLanguage || "English",
            preferredCurrency: d.preferredCurrency || "USD",
            travelStyle: d.travelStyle || "MODERATE",
            bio: d.bio || prev.bio,
          }));
        }
      }).catch(() => {}).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || prev.bio,
        avatarUrl: user.avatarUrl || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await userService.updateMe(
        formData.name, formData.phone, formData.bio, formData.avatarUrl
      );
      const d = res.data || res;
      const updated = updateUser({
        id: d.userId || d._id || user.id,
        name: d.name,
        email: d.email || user.email,
        phone: d.phone,
        bio: d.bio,
        role: d.role || user.role,
        avatarUrl: d.avatarUrl,
        preferredLanguage: formData.preferredLanguage,
        preferredCurrency: formData.preferredCurrency,
        travelStyle: formData.travelStyle,
      });
      setUser(updated);

      if (role === "TOURIST") {
        await touristService.updateMe(
          formData.preferredLanguage, formData.preferredCurrency,
          formData.travelStyle, undefined, undefined, formData.bio
        );
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user || loading) {
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
              <CardTitle className="text-2xl">My Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {(user.name || '?').charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profile Picture</p>
                    <p className="text-sm text-gray-500">You can update your avatar in settings</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  {/* Name */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={saving}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={saving}
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={saving}
                      className="resize-none"
                      rows={4}
                    />
                  </div>

                  {/* Avatar URL */}
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                    <Input
                      id="avatarUrl"
                      name="avatarUrl"
                      placeholder="https://example.com/avatar.jpg"
                      value={formData.avatarUrl}
                      onChange={handleChange}
                      disabled={saving}
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-2 mb-6">
                    <Label>Account Type</Label>
                    <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 capitalize">
                      {(user.role || 'unknown').toLowerCase()}
                    </div>
                  </div>

                  {role === "TOURIST" && (
                    <div className="border-t pt-6 space-y-4">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Travel Preferences</h3>
                      <div>
                        <Label htmlFor="preferredLanguage">Preferred Language</Label>
                        <select
                          id="preferredLanguage"
                          name="preferredLanguage"
                          value={formData.preferredLanguage}
                          onChange={handleChange}
                          disabled={saving}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="preferredCurrency">Preferred Currency</Label>
                        <select
                          id="preferredCurrency"
                          name="preferredCurrency"
                          value={formData.preferredCurrency}
                          onChange={handleChange}
                          disabled={saving}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="travelStyle">Travel Style</Label>
                        <select
                          id="travelStyle"
                          name="travelStyle"
                          value={formData.travelStyle}
                          onChange={handleChange}
                          disabled={saving}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {TRAVEL_STYLES.map(s => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setLocation("/dashboard")}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                disabled
              >
                Change Password (Coming Soon)
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                disabled
              >
                Deactivate Account (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
