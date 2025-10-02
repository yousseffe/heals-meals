import { useState, useEffect } from "react";
import { useDonation } from "@/contexts/DonationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function AdminDonations() {
    const { donations, loading, refresh, removeDonation } = useDonation();
    const { toast } = useToast();

    const [viewDonation, setViewDonation] = useState<any | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        refresh();
    }, []);

    const handleDelete = async (donationId: string) => {
        setDeleting(donationId);
        try {
            await removeDonation(donationId);
            toast({
                title: "Donation deleted",
                description: "The donation has been removed successfully.",
            });
            refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Error deleting donation",
                description: "Please try again later.",
            });
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-muted/20">
            <Card className="shadow-sm border border-border/40">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">All Donations</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                            Loading donations...
                        </div>
                    ) : donations.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No donations yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse rounded-lg overflow-hidden">
                                <thead className="bg-muted/60 text-sm text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Donor</th>
                                        <th className="px-4 py-2 text-left">Email</th>
                                        <th className="px-4 py-2 text-left">Phone</th>
                                        <th className="px-4 py-2 text-left">Amount</th>
                                        <th className="px-4 py-2 text-left">Payment Method</th>
                                        <th className="px-4 py-2 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation) => (
                                        <tr
                                            key={donation.email + donation.amount}
                                            className="border-t border-border/40 hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="px-4 py-2">
                                                {donation.firstName} {donation.secondName}
                                            </td>
                                            <td className="px-4 py-2">{donation.email}</td>
                                            <td className="px-4 py-2">{donation.phoneNumber}</td>
                                            <td className="px-4 py-2 font-medium">
                                                ${donation.amount.toFixed(2)}
                                            </td>
                                            <td className="px-4 py-2">{donation.paymentMethod}</td>
                                            <td className="px-4 py-2 text-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setViewDonation(donation)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDelete(donation.email)}
                                                    disabled={deleting === donation.email}
                                                >
                                                    {deleting === donation.email ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* View Donation Dialog */}
            <Dialog open={!!viewDonation} onOpenChange={() => setViewDonation(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Donation from {viewDonation?.firstName} {viewDonation?.secondName}
                        </DialogTitle>
                        <DialogDescription>
                            Here are the full details of this donation.
                        </DialogDescription>
                    </DialogHeader>

                    {viewDonation && (
                        <div className="space-y-3 text-sm">
                            <p>
                                <strong>Email:</strong> {viewDonation.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {viewDonation.phoneNumber}
                            </p>
                            <p>
                                <strong>Amount:</strong> ${viewDonation.amount.toFixed(2)}
                            </p>
                            <p>
                                <strong>Payment Method:</strong> {viewDonation.paymentMethod}
                            </p>
                            {viewDonation.message && (
                                <div className="bg-muted/40 p-3 rounded-md">
                                    <p className="text-muted-foreground text-xs uppercase font-semibold mb-1">
                                        Message
                                    </p>
                                    <p>{viewDonation.message}</p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
