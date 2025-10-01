import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useDonation } from "@/contexts/DonationContext";
import { DonationRequest } from "@/services/DonationService";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const isFutureDate = (month: string, year: string) => {
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  const expYear = Number(year);
  const expMonth = Number(month);

  if (expYear > currentYear) return true;
  if (expYear === currentYear && expMonth >= currentMonth) return true;
  return false;
};

const donationSchema = z
  .object({
    phoneNumber: z
      .string()
      .regex(/^[0-9]{10,15}$/, "Enter a valid phone number"),
    email: z.string().email("Invalid email address"),
    amount: z
      .string()
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "Enter a valid amount"
      ),
    message: z.string().optional(),
    firstName: z.string().min(2, "First name is required"),
    secondName: z.string().min(2, "Last name is required"),
    cardNumber: z.string().regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
    expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid month (01–12)"),
    expiryYear: z.string().regex(/^[0-9]{2}$/, "Invalid year"),
    cvv: z.string().regex(/^[0-9]{3}$/, "CVV must be 3 digits"),
    paymentMethod: z.string().min(1, "Please select a payment method"),
  })
  .refine(
    (data) => isFutureDate(data.expiryMonth, data.expiryYear),
    {
      message: "The expiry date must be in the future",
      path: ["expiryMonth"],
    }
  );

type DonationFormData = z.infer<typeof donationSchema>;

export default function DonationPage() {
  const { donate } = useDonation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      phoneNumber: "",
      email: "",
      amount: "",
      message: "",
      firstName: "",
      secondName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      paymentMethod: "",
    },
  });

  const donationAmount = watch("amount");
  const donationPresets = [10, 25, 50, 100];

  const onSubmit = async (data: DonationFormData) => {
    try {
      const expiryDate = `${data.expiryMonth}/${data.expiryYear}`;
      const donationData: DonationRequest = {
        firstName: data.firstName,
        secondName: data.secondName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        amount: Number(data.amount),
        message: data.message || "",
        cardNumber: data.cardNumber,
        expiryDate,
        cvv: data.cvv,
        paymentMethod: data.paymentMethod,
      };

      console.log("Sending donation request:", donationData);
      await donate(donationData);

      toast({
        title: "Thank you!",
        description: "Your donation has been successfully submitted.",
      });

      reset();
      // navigate("/");
    } catch (error: any) {
      console.error("Submit donation failed:", error);

      toast({
        title: "Failed to submit donation",
        description: "Something went wrong while processing your donation.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Form Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Make a Donation</h1>
            <p className="text-gray-600 mb-8">
              Your contribution helps us provide healthy recipes for everyone. Every donation makes a difference.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")}
                  className="mt-2 border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="mt-2 border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Donation Amount */}
              <div>
                <Label htmlFor="donationAmount">Donation Amount *</Label>
                <div className="flex gap-3 mt-2 mb-3 flex-wrap">
                  {donationPresets.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={donationAmount === String(amount) ? "default" : "outline"}
                      onClick={() => setValue("amount", String(amount))}
                      className={
                        donationAmount === String(amount)
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600"
                      }
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Input
                  id="donationAmount"
                  placeholder="Or enter a custom amount"
                  {...register("amount")}
                  className="border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Leave us a note"
                  {...register("message")}
                  className="mt-2 border border-gray-300 rounded-xl px-4 bg-gray-50 focus:border-green-600 focus:ring-0 resize-none"
                  rows={3}
                />
              </div>

              {/* Payment Info */}
              <div className="pt-6">
                <Label className="text-gray-700 text-lg font-medium">
                  Credit Card Information
                </Label>

                {/* Payment Method Dropdown */}
                <div className="mt-4">
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select
                    onValueChange={(value) => setValue("paymentMethod", value)}
                    defaultValue=""
                  >
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select a method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Visa">Visa</SelectItem>
                      <SelectItem value="MasterCard">MasterCard</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
                  )}
                </div>

                {/* Name */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    placeholder="First Name"
                    {...register("firstName")}
                    className="border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                  />
                  <Input
                    placeholder="Last Name"
                    {...register("secondName")}
                    className="border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
                {errors.secondName && (
                  <p className="text-red-500 text-sm mt-1">{errors.secondName.message}</p>
                )}

                {/* Card Info */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Input
                    placeholder="Card Number"
                    inputMode="numeric"
                    maxLength={16}
                    {...register("cardNumber")}
                    className="col-span-2 border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                  />
                  <Input
                    placeholder="CVV"
                    inputMode="numeric"
                    maxLength={3}
                    {...register("cvv")}
                    className="border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                  />
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                )}
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                )}

                {/* Expiry */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    placeholder="MM"
                    inputMode="numeric"
                    maxLength={2}
                    {...register("expiryMonth")}
                    className="border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                  />
                  <Input
                    placeholder="YY"
                    inputMode="numeric"
                    maxLength={2}
                    {...register("expiryYear")}
                    className="border border-gray-300 rounded-full px-4 bg-gray-50 focus:border-green-600 focus:ring-0"
                  />
                </div>
                {(errors.expiryMonth || errors.expiryYear) && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expiryMonth?.message || errors.expiryYear?.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full mt-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Donation"}
              </Button>
            </form>
          </div>

          {/* Right Image */}
          <div className="hidden md:block">
            <img
              src="/Rectangle 54.svg"
              alt="Donation illustration"
              className="w-full h-full object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
