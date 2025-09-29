import { useState } from "react";
import { Search, Plus, List, Shield, Stethoscope, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge"

interface HealthItem {
  id: string;
  name: string;
  type: "allergy" | "disease" | "general";
  severity?: "mild" | "moderate" | "severe";
  notes?: string;
}

const HealthProfile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "allergies" | "diseases">("all");
  const [healthItems, setHealthItems] = useState<HealthItem[]>([
    { id: "1", name: "Peanut Allergy", type: "allergy", severity: "severe" },
    { id: "2", name: "Hypertension", type: "disease", severity: "moderate" },
    { id: "3", name: "Lactose Intolerance", type: "allergy", severity: "mild" },
    { id: "4", name: "Diabetes Type 2", type: "disease", severity: "moderate" },
    { id: "5", name: "Shellfish Allergy", type: "allergy", severity: "severe" },
    { id: "6", name: "Asthma", type: "disease", severity: "mild" },
  ]);
  
  const [newItem, setNewItem] = useState<{
    name: string;
    type: "allergy" | "disease";
    severity: "mild" | "moderate" | "severe";
    notes: string;
  }>({
    name: "",
    type: "allergy",
    severity: "mild",
    notes: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { toast } = useToast();

  const filteredItems = healthItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      selectedFilter === "all" || 
      (selectedFilter === "allergies" && item.type === "allergy") ||
      (selectedFilter === "diseases" && item.type === "disease");
    
    return matchesSearch && matchesFilter;
  });

  const addHealthItem = () => {
    if (!newItem.name.trim()) return;
    
    const item: HealthItem = {
      id: Date.now().toString(),
      name: newItem.name.trim(),
      type: newItem.type,
      severity: newItem.severity,
      notes: newItem.notes.trim() || undefined,
    };
    
    setHealthItems([...healthItems, item]);
    setNewItem({ name: "", type: "allergy", severity: "mild", notes: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Health item added",
      description: `${item.name} has been added to your profile.`,
    });
  };

  const deleteHealthItem = (id: string) => {
    const item = healthItems.find(item => item.id === id);
    setHealthItems(healthItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: `${item?.name} has been removed from your profile.`,
      variant: "destructive",
    });
  };

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case "all": return <List className="w-4 h-4" />;
      case "allergies": return <Shield className="w-4 h-4" />;
      case "diseases": return <Stethoscope className="w-4 h-4" />;
      default: return <List className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "severe": return "bg-red-600";
      case "moderate": return "bg-orange-600";
      case "mild": return "bg-green-600";
      default: return "bg-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Profile</h1>
          <p className="text-muted-foreground">Manage your health information</p>
        </div>

        {/* Search and Add Section */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border shadow-soft-health rounded-full h-12"
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-health-primary hover:bg-health-primary-hover text-health-primary-foreground rounded-full px-6 h-12 shadow-item-health transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Health Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newItem.type} onValueChange={(value: "allergy" | "disease") => setNewItem({ ...newItem, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allergy">Allergy</SelectItem>
                      <SelectItem value="disease">Disease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select value={newItem.severity} onValueChange={(value: "mild" | "moderate" | "severe") => setNewItem({ ...newItem, severity: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    value={newItem.notes}
                    onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                    placeholder="Additional notes"
                  />
                </div>
                <Button 
                  onClick={addHealthItem} 
                  className="w-full bg-health-primary hover:bg-health-primary-hover"
                  disabled={!newItem.name.trim()}
                >
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mb-6 bg-health-secondary rounded-full p-1">
          {[
            { key: "all", label: "All", count: healthItems.length },
            { key: "allergies", label: "Allergies", count: healthItems.filter(item => item.type === "allergy").length },
            { key: "diseases", label: "Diseases", count: healthItems.filter(item => item.type === "disease").length },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter.key
                  ? "bg-health-primary text-health-primary-foreground shadow-item-health"
                  : "text-health-primary hover:bg-white/50"
              }`}
            >
              {getFilterIcon(filter.key)}
              {filter.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedFilter === filter.key ? "bg-white/20" : "bg-health-primary/10 text-health-primary"
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Health Items List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">
                {searchTerm ? "No items match your search" : "No health items added yet"}
              </div>
              {!searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(true)}
                  className="border-health-primary text-health-primary hover:bg-health-secondary"
                >
                  Add your first item
                </Button>
              )}
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-health-item text-health-primary-foreground rounded-2xl shadow-item-health hover:bg-health-item-hover transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  {item.type === "allergy" ? (
                    <Shield className="w-5 h-5 opacity-80" />
                  ) : (
                    <Stethoscope className="w-5 h-5 opacity-80" />
                  )}
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.severity && (
                      <Badge className={`text-xs ${getSeverityColor(item.severity)}`}>
                        {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)} severity
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteHealthItem(item.id)}
                  className="text-health-primary-foreground/70 hover:text-health-primary-foreground hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthProfile;