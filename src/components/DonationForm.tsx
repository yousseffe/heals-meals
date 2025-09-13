"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function DonationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    donationAmount: "",
    message: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donation submitted:", formData)
  }

  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <div>
              <h1 className="text-3xl font-bold mb-8">Donation form</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-gray-600">
                    Full Name
                  </Label>
                  <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-2 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-green-600"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-600">
                    Phone Number
                  </Label>
                  <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="mt-2 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-green-600"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-600">
                    Email
                  </Label>
                  <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-green-600"
                  />
                </div>

                <div>
                  <Label htmlFor="donationAmount" className="text-gray-600">
                    Donation Amount
                  </Label>
                  <Input
                      id="donationAmount"
                      value={formData.donationAmount}
                      onChange={(e) => setFormData({ ...formData, donationAmount: e.target.value })}
                      className="mt-2 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-green-600"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-600">
                    Message
                  </Label>
                  <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-green-600 resize-none"
                      rows={3}
                  />
                </div>

                <div className="pt-4">
                  <Label className="text-gray-600 text-lg font-medium">Credit Card Information</Label>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-gray-200 border-0 rounded-full"
                    />
                    <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-gray-200 border-0 rounded-full"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <Input
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="bg-gray-200 border-0 rounded-full col-span-1"
                    />
                    <Input
                        placeholder="MM/YY"
                        value={`${formData.expiryMonth}/${formData.expiryYear}`}
                        className="bg-gray-200 border-0 rounded-full"
                    />
                    <Input
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="bg-gray-200 border-0 rounded-full"
                    />
                  </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full mt-8"
                >
                  Submit
                </Button>
              </form>
            </div>

            <div >
              <img src="/Rectangle 54.svg" className={"h-screen w-full"} alt="My Profile" />
            </div>
          </div>
        </div>
      </div>
  )
}
