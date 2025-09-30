import { useState, useMemo, useEffect } from "react";
import { Search, Plus, List, Shield, Stethoscope, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUserCondition } from "@/contexts/UserConditionContext";
import { useCondition } from "@/contexts/ConditionContext";

const HealthProfile = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "allergies" | "diseases"
  >("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New: simple separate states
  const [selectedType, setSelectedType] = useState<"ALLERGY" | "DISEASE">("ALLERGY");
  const [selectedConditionId, setSelectedConditionId] = useState("");

  const { toast } = useToast();
  const {
    userConditions,
    userAllergies,
    userDiseases,
    addUserCondition,
    deleteUserCondition,
    loading,
  } = useUserCondition();

  const { conditions, allergies, diseases } = useCondition();

  useEffect(() => {
    console.log("Global conditions", conditions)
    console.log("Global allergies", allergies)
    console.log("Global diseases", diseases)
  }, [conditions, allergies, diseases])

  useEffect(() => {
    console.log("User conditions", userConditions)
  }, [userConditions])

  // Select appropriate list based on filter
  const displayedItems = useMemo(() => {
    if (selectedFilter === "allergies") return userAllergies ?? [];
    if (selectedFilter === "diseases") return userDiseases ?? [];
    return userConditions ?? [];
  }, [selectedFilter, userConditions, userAllergies, userDiseases]);

  // Filter by search
  const filteredItems = displayedItems.filter((item) =>
    item.conditionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add handler (simplified)
  const handleAddCondition = async () => {
    if (!selectedConditionId) return;
    try {
      await addUserCondition(selectedConditionId);
      toast({
        title: "Condition added",
        description: "Your health condition was successfully added.",
      });
      setSelectedConditionId("");
      setSelectedType("ALLERGY");
      setIsDialogOpen(false);
    } catch {
      toast({
        title: "Failed to add condition",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    await deleteUserCondition(id);
    toast({
      title: "Condition removed",
      description: `${name} has been removed from your profile.`,
      variant: "destructive",
    });
  };

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case "all":
        return <List className="w-4 h-4" />;
      case "allergies":
        return <Shield className="w-4 h-4" />;
      case "diseases":
        return <Stethoscope className="w-4 h-4" />;
      default:
        return <List className="w-4 h-4" />;
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
              className="pl-10 bg-input border-border rounded-full h-12"
            />
          </div>

          {/* Add Dialog */}
          <Dialog key={conditions?.length ?? 0} open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-health-primary hover:bg-health-primary-hover text-health-primary-foreground rounded-full px-6 h-12"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Health Condition</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-4">
                {/* Type Selection */}
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={selectedType}
                    onValueChange={(value: "ALLERGY" | "DISEASE") => {
                      setSelectedType(value);
                      setSelectedConditionId(""); // reset selection when type changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALLERGY">Allergy</SelectItem>
                      <SelectItem value="DISEASE">Disease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Selection */}
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={selectedConditionId}
                    onValueChange={(value) => setSelectedConditionId(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* {conditions.map((c) => (
                          <SelectItem key={c.conditionId} value={c.conditionId}>
                            {c.conditionName}
                          </SelectItem>))} */}
                          
                      {selectedType === "ALLERGY" ?
                        (allergies?.map((c) => (
                          <SelectItem key={c.conditionId} value={c.conditionId}>
                            {c.conditionName}
                          </SelectItem>
                        ))

                        ) : (diseases.map((c) => (
                          <SelectItem key={c.conditionId} value={c.conditionId}>
                            {c.conditionName}
                          </SelectItem>
                        )))
                      }
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleAddCondition}
                  className="w-full bg-health-primary hover:bg-health-primary-hover"
                  disabled={!selectedConditionId}
                >
                  Add Condition
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mb-6 bg-health-secondary rounded-full p-1">
          {[
            { key: "all", label: "All", count: userConditions?.length ?? 0 },
            { key: "allergies", label: "Allergies", count: userAllergies?.length ?? 0 },
            { key: "diseases", label: "Diseases", count: userDiseases?.length ?? 0 },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 ${selectedFilter === filter.key
                ? "bg-health-primary text-health-primary-foreground shadow-item-health"
                : "text-health-primary hover:bg-white/50"
                }`}
            >
              {getFilterIcon(filter.key)}
              {filter.label}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${selectedFilter === filter.key
                  ? "bg-white/20"
                  : "bg-health-primary/10 text-health-primary"
                  }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Health Items List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading health data...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">
                {searchTerm
                  ? "No conditions match your search"
                  : "No health conditions added yet"}
              </div>
              {!searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(true)}
                  className="border-health-primary text-health-primary hover:bg-health-secondary"
                >
                  Add your first condition
                </Button>
              )}
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-health-item rounded-2xl shadow-item-health hover:bg-health-item-hover transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 text-white">
                  {item.conditionType === "ALLERGY" ? (
                    <Shield className="w-5 h-5 opacity-80" />
                  ) : (
                    <Stethoscope className="w-5 h-5 opacity-80" />
                  )}
                  <div className="font-medium">{item.conditionName}</div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id, item.conditionName)}
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
