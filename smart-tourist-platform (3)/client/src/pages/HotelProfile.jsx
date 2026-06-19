import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUser, updateUser } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { hotelService } from "@/services/hotel.service";
import { Navbar } from "@/components/Navbar";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { formatServerError } from "@/utils/helpers";
import { X, Plus } from "lucide-react";

export default function HotelProfile() {
  const [user] = useState(getUser());
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    website: "",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    amenities: [],
  });
  const [newAmenity, setNewAmenity] = useState("");

  useEffect(() => {
    hotelService.getMe().then(res => {
      const d = res?.data || res;
      if (d) {
        setFormData({
          hotelName: d.hotelName || user.name || "",
          description: d.description || "",
          address: d.address || "",
          city: d.city || "",
          state: d.state || "",
          country: d.country || "",
          postalCode: d.postalCode || "",
          phone: d.phone || user.phone || "",
          website: d.website || "",
          checkInTime: d.checkInTime || "14:00",
          checkOutTime: d.checkOutTime || "11:00",
          amenities: d.amenities || [],
        });
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addAmenity = () => {
    const trimmed = newAmenity.trim();
    if (trimmed && !formData.amenities.includes(trimmed)) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, trimmed] }));
      setNewAmenity("");
    }
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hotelName || !formData.phone) {
      toast.error("Hotel name and phone are required");
      return;
    }
    setSaving(true);
    try {
      const res = await hotelService.updateMe(
        formData.hotelName, formData.description, formData.address,
        formData.city, formData.state, formData.country, formData.postalCode,
        formData.phone, formData.website, formData.checkInTime, formData.checkOutTime,
        formData.amenities
      );
      const d = res?.data || res;
      if (d) updateUser({ profile: d });
      toast.success("Hotel profile updated successfully!");
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || "Failed to update hotel profile");
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
              <CardTitle className="text-2xl">Hotel Profile</CardTitle>
              <CardDescription>Update your hotel details and amenities</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hotelName">Hotel Name *</Label>
                      <Input id="hotelName" name="hotelName" value={formData.hotelName} onChange={handleChange} disabled={saving} />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" value={formData.description} onChange={handleChange} disabled={saving} rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={saving} />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" name="website" placeholder="https://example.com" value={formData.website} onChange={handleChange} disabled={saving} />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} disabled={saving} />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} disabled={saving} />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" value={formData.state} onChange={handleChange} disabled={saving} />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country" value={formData.country} onChange={handleChange} disabled={saving} />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} disabled={saving} />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Check-In / Check-Out</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkInTime">Check-In Time</Label>
                      <Input id="checkInTime" name="checkInTime" type="time" value={formData.checkInTime} onChange={handleChange} disabled={saving} />
                    </div>
                    <div>
                      <Label htmlFor="checkOutTime">Check-Out Time</Label>
                      <Input id="checkOutTime" name="checkOutTime" type="time" value={formData.checkOutTime} onChange={handleChange} disabled={saving} />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Amenities</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.amenities.map((a, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {a}
                        <button type="button" onClick={() => removeAmenity(i)} className="text-blue-400 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add amenity (e.g. Free WiFi)"
                      value={newAmenity}
                      onChange={e => setNewAmenity(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addAmenity(); } }}
                    />
                    <Button type="button" variant="outline" onClick={addAmenity}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

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
