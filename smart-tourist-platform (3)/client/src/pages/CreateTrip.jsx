import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tripService } from "@/services/trip.service";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { useLocation } from "wouter";
import { formatServerError } from "@/utils/helpers";
import { Plus, Trash2 } from "lucide-react";

export function CreateTrip() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    currency: "USD",
    isPublic: true,
  });
  const [destinations, setDestinations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addDestination = () => {
    setDestinations(prev => [
      ...prev,
      { name: "", country: "", lat: "", lng: "", visitOrder: prev.length + 1 },
    ]);
  };

  const updateDestination = (index, field, value) => {
    setDestinations(prev =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  const removeDestination = (index) => {
    setDestinations(prev =>
      prev
        .filter((_, i) => i !== index)
        .map((d, i) => ({ ...d, visitOrder: i + 1 }))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await tripService.createTrip(
        formData.title,
        formData.description,
        formData.startDate,
        formData.endDate,
        formData.budget ? Number(formData.budget) : undefined,
        formData.currency,
        formData.isPublic,
        destinations.map(d => ({
          name: d.name,
          country: d.country,
          coordinates:
            d.lat && d.lng ? [Number(d.lng), Number(d.lat)] : undefined,
          visitOrder: d.visitOrder,
        })),
      );
      toast.success("Trip created successfully!");
      setLocation("/trips");
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Create New Trip</CardTitle>
              <CardDescription>Plan your next adventure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Trip Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Sri Lanka Adventure"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your trip..."
                    value={formData.description}
                    onChange={handleChange}
                    disabled={loading}
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      placeholder="1500"
                      value={formData.budget}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={value =>
                        setFormData(prev => ({ ...prev, currency: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="LKR">LKR</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={checked =>
                      setFormData(prev => ({ ...prev, isPublic: checked }))
                    }
                  />
                  <Label htmlFor="isPublic">
                    {formData.isPublic ? "Public Trip" : "Private Trip"}
                  </Label>
                </div>

                {/* Destinations */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Destinations</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addDestination}
                      className="gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Destination
                    </Button>
                  </div>
                  {destinations.map((dest, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-600">
                            Destination {dest.visitOrder}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDestination(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            placeholder="Name *"
                            value={dest.name}
                            onChange={e =>
                              updateDestination(index, "name", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Country"
                            value={dest.country}
                            onChange={e =>
                              updateDestination(
                                index,
                                "country",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="Latitude"
                            type="number"
                            step="any"
                            value={dest.lat}
                            onChange={e =>
                              updateDestination(index, "lat", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Longitude"
                            type="number"
                            step="any"
                            value={dest.lng}
                            onChange={e =>
                              updateDestination(index, "lng", e.target.value)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Trip"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setLocation("/trips")}
                    disabled={loading}
                  >
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
