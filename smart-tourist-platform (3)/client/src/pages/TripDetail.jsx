import { useRoute, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { tripService } from '@/services/trip.service';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { StatusBadge } from '@/components/StatusBadge';
import { formatServerError, formatDate, calculateDuration } from '@/utils/helpers';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, DollarSign, Globe, Trash2, Edit, Plus, Clock, Sun, ArrowLeft } from 'lucide-react';

export default function TripDetail() {
  const [, params] = useRoute('/trips/:id');
  const [, setLocation] = useLocation();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editDialog, setEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '', budget: 0, isPublic: true });
  const [saving, setSaving] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [itineraryDialog, setItineraryDialog] = useState(false);
  const [itineraryForm, setItineraryForm] = useState({ dayNumber: 1, date: '', location: '', title: '', description: '', activities: [] });
  const [addingItinerary, setAddingItinerary] = useState(false);

  useEffect(() => {
    if (params?.id) fetchTrip(params.id);
  }, [params?.id]);

  const fetchTrip = async (id) => {
    setLoading(true);
    try {
      const res = await tripService.getTripById(id);
      const d = res.data || res;
      setTrip(d);
    } catch {
      toast.error('Failed to load trip details');
      setLocation('/trips');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = () => {
    if (!trip) return;
    setEditForm({
      title: trip.title || '',
      description: trip.description || '',
      budget: trip.budget ?? 0,
      isPublic: trip.isPublic ?? true,
    });
    setEditDialog(true);
  };

  const handleEditSubmit = async () => {
    if (!editForm.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      await tripService.updateTrip(params.id, editForm.title, editForm.description, editForm.budget, editForm.isPublic);
      toast.success('Trip updated successfully');
      setEditDialog(false);
      fetchTrip(params.id);
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || 'Failed to update trip');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await tripService.deleteTrip(params.id);
      toast.success('Trip deleted successfully');
      setLocation('/trips');
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || 'Failed to delete trip');
    } finally {
      setDeleting(false);
      setDeleteDialog(false);
    }
  };

  const handleAddItinerary = async () => {
    if (!itineraryForm.title.trim() || !itineraryForm.date) {
      toast.error('Title and date are required');
      return;
    }
    setAddingItinerary(true);
    try {
      await tripService.addItinerary(
        params.id, itineraryForm.dayNumber, itineraryForm.date,
        itineraryForm.location, itineraryForm.title, itineraryForm.description,
        itineraryForm.activities
      );
      toast.success('Itinerary day added');
      setItineraryDialog(false);
      setItineraryForm({ dayNumber: 1, date: '', location: '', title: '', description: '', activities: [] });
      fetchTrip(params.id);
    } catch (error) {
      toast.error(formatServerError(error.response?.data) || 'Failed to add itinerary day');
    } finally {
      setAddingItinerary(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSkeleton count={1} type="card" />
        </div>
      </>
    );
  }

  if (!trip) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Trip not found</p>
        </div>
      </>
    );
  }

  const duration = calculateDuration(trip.startDate, trip.endDate);
  const destinations = Array.isArray(trip.destinations) ? trip.destinations : [];
  const itineraryDays = Array.isArray(trip.itineraryDays) ? trip.itineraryDays : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Back button */}
          <Button variant="ghost" size="sm" onClick={() => setLocation('/trips')} className="flex items-center gap-1 text-gray-600">
            <ArrowLeft className="w-4 h-4" /> Back to Trips
          </Button>

          {/* Header Card */}
          <Card className="shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{trip.title || 'Untitled Trip'}</h1>
                    <StatusBadge status={trip.status || 'planning'} />
                  </div>
                  <p className="text-emerald-100">{trip.description || 'No description.'}</p>
                </div>
                <Badge className={trip.isPublic ? 'bg-emerald-400 text-white border-0' : 'bg-amber-400 text-white border-0'}>
                  <Globe className="w-3 h-3 mr-1" /> {trip.isPublic ? 'Public' : 'Private'}
                </Badge>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">Duration:</span>
                    <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                    <span className="text-gray-500">({duration} days)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Budget:</span>
                    <span>${(trip.budget ?? 0).toLocaleString()} {trip.currency || 'USD'}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <DollarSign className="w-4 h-4 text-red-500" />
                    <span className="font-medium">Total Spent:</span>
                    <span>${(trip.totalSpent ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="font-medium">Destinations:</span>
                    <span>{destinations.length}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button className="bg-primary hover:bg-primary/90 text-white" onClick={openEditDialog}>
                  <Edit className="w-4 h-4 mr-1" /> Edit Trip
                </Button>
                <Button variant="destructive" onClick={() => setDeleteDialog(true)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Destinations Section */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" /> Destinations ({destinations.length})
              </h2>
              {destinations.length > 0 ? (
                <div className="space-y-3">
                  {destinations.sort((a, b) => (a.visitOrder || 0) - (b.visitOrder || 0)).map((dest, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                        {dest.visitOrder || idx + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{dest.name}</p>
                        <p className="text-sm text-gray-500">{dest.country}{dest.coordinates ? ` (${dest.coordinates[1]}, ${dest.coordinates[0]})` : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No destinations added.</p>
              )}
            </CardContent>
          </Card>

          {/* Itinerary Section */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" /> Itinerary ({itineraryDays.length})
                </h2>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" onClick={() => {
                  setItineraryForm({ dayNumber: itineraryDays.length + 1, date: '', location: '', title: '', description: '', activities: [] });
                  setItineraryDialog(true);
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Add Day
                </Button>
              </div>

              {itineraryDays.length > 0 ? (
                <div className="space-y-4">
                  {itineraryDays.sort((a, b) => (a.dayNumber || 0) - (b.dayNumber || 0)).map((day, idx) => (
                    <Card key={idx} className="border-slate-200">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                              <Sun className="w-4 h-4 text-amber-500" /> Day {day.dayNumber}: {day.title}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <Calendar className="w-3.5 h-3.5" /> {formatDate(day.date)}{day.location ? ` — ${day.location}` : ''}
                            </p>
                          </div>
                        </div>
                        {day.description && <p className="text-sm text-gray-600 mb-3">{day.description}</p>}
                        {Array.isArray(day.activities) && day.activities.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Activities</p>
                            {day.activities.map((act, i) => (
                              <div key={i} className="flex items-center gap-3 text-sm bg-gray-50 rounded-lg px-3 py-2">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-500 text-xs">{act.startTime || ''}{act.startTime && act.endTime ? '-' : ''}{act.endTime || ''}</span>
                                <span className="font-medium text-gray-900">{act.title}</span>
                                <Badge variant="outline" className="text-xs">{act.category || ''}</Badge>
                                {act.estimatedCost != null && <span className="text-gray-500 text-xs ml-auto">${act.estimatedCost}</span>}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No itinerary days planned yet.</p>
              )}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Trip</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-title">Title *</Label>
              <Input id="edit-title" value={editForm.title} onChange={(e) => setEditForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea id="edit-description" rows={3} value={editForm.description} onChange={(e) => setEditForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-budget">Budget</Label>
              <Input id="edit-budget" type="number" min="0" step="0.01" value={editForm.budget} onChange={(e) => setEditForm(p => ({ ...p, budget: parseFloat(e.target.value) || 0 }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-public">Visibility</Label>
              <select id="edit-public" className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={editForm.isPublic ? 'true' : 'false'} onChange={(e) => setEditForm(p => ({ ...p, isPublic: e.target.value === 'true' }))}>
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setEditDialog(false)} disabled={saving}>Cancel</Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white" onClick={handleEditSubmit} disabled={saving || !editForm.title.trim()}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{trip.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Itinerary Day Dialog */}
      <Dialog open={itineraryDialog} onOpenChange={setItineraryDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Itinerary Day</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="it-day">Day Number *</Label>
                <Input id="it-day" type="number" min="1" value={itineraryForm.dayNumber} onChange={(e) => setItineraryForm(p => ({ ...p, dayNumber: parseInt(e.target.value) || 1 }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="it-date">Date *</Label>
                <Input id="it-date" type="date" value={itineraryForm.date} onChange={(e) => setItineraryForm(p => ({ ...p, date: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="it-title">Title *</Label>
              <Input id="it-title" value={itineraryForm.title} onChange={(e) => setItineraryForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="it-location">Location</Label>
              <Input id="it-location" value={itineraryForm.location} onChange={(e) => setItineraryForm(p => ({ ...p, location: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="it-description">Description</Label>
              <Textarea id="it-description" rows={2} value={itineraryForm.description} onChange={(e) => setItineraryForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setItineraryDialog(false)} disabled={addingItinerary}>Cancel</Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white" onClick={handleAddItinerary} disabled={addingItinerary || !itineraryForm.title.trim() || !itineraryForm.date}>
                {addingItinerary ? 'Adding...' : 'Add Day'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
