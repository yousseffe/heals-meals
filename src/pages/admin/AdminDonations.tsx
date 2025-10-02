import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Plus, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Donation {
    id: number;
    donorName: string;
    amount: number;
    date: string;
}

export default function AdminDonations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [donorName, setDonorName] = useState("");
    const [amount, setAmount] = useState<number | "">("");
    const [date, setDate] = useState("");

    const [donations, setDonations] = useState<Donation[]>([
        { id: 1, donorName: "John Doe", amount: 100, date: "2025-09-01" },
        { id: 2, donorName: "Jane Smith", amount: 50, date: "2025-09-10" },
        { id: 3, donorName: "Charlie Davis", amount: 75, date: "2025-09-20" },
    ]);

    const filtered = donations.filter(
        (d) =>
            d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.date.includes(searchTerm)
    );

    function handleAddDonation() {
        if (!donorName.trim() || !amount || !date.trim()) return;
        const newDonation = {
            id: donations.length + 1,
            donorName: donorName.trim(),
            amount: Number(amount),
            date,
        };
        setDonations([...donations, newDonation]);
        setDonorName("");
        setAmount("");
        setDate("");
        setOpenDialog(false);
    }

    function handleDelete(id: number) {
        setDonations(donations.filter((d) => d.id !== id));
    }

    return (
        <div className="p-6">
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Donations</CardTitle>

                        {/* Add Donation Dialog */}
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                                    <Plus className="w-4 h-4" />
                                    Add Donation
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Donation</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4 mt-2">
                                    <div>
                                        <Label htmlFor="donorName">Donor Name</Label>
                                        <Input
                                            id="donorName"
                                            value={donorName}
                                            onChange={(e) => setDonorName(e.target.value)}
                                            placeholder="Enter donor's full name"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="amount">Amount (USD)</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(e.target.value ? Number(e.target.value) : "")
                                            }
                                            placeholder="Enter donation amount"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>

                                    <Button
                                        onClick={handleAddDonation}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        Add Donation
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Search bar */}
                    <div className="mb-4 flex gap-2">
                        <Input
                            placeholder="Search by donor or date..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Button variant="outline" className="flex gap-2">
                            <Search className="w-4 h-4" />
                            Search
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 border-b">#</th>
                                    <th className="p-3 border-b">Donor</th>
                                    <th className="p-3 border-b">Amount (USD)</th>
                                    <th className="p-3 border-b">Date</th>
                                    <th className="p-3 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? (
                                    filtered.map((donation, index) => (
                                        <tr key={donation.id} className="hover:bg-gray-50">
                                            <td className="p-3 border-b">{index + 1}</td>
                                            <td className="p-3 border-b">{donation.donorName}</td>
                                            <td className="p-3 border-b">${donation.amount}</td>
                                            <td className="p-3 border-b">{donation.date}</td>
                                            <td className="p-3 border-b text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(donation.id)}
                                                    className="flex items-center gap-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-gray-500">
                                            No donations found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
