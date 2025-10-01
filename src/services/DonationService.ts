export type DonationRequest = {
    firstName: string;
    secondName: string;
    phoneNumber: string;
    email: string;
    amount: number;
    message: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    paymentMethod: string;
}

export type DonationResponse = {
    firstName: string;
    secondName: string;
    phoneNumber: string;
    email: string;
    amount: number;
    message: string;
    paymentMethod: string;
}

const BASE_URL = "http://localhost:8080/api/donations"

export async function createDonation(request: DonationRequest, token: string): Promise<DonationResponse> {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(request)
    })

    if (!response.ok){
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to process donation");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json();
}

export async function getDonations(token: string): Promise<DonationResponse[]> {
    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok){
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch donations");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json();
}

export async function getDonation(donationId: string, token: string): Promise<DonationResponse> {
    const response = await fetch(`${BASE_URL}/${donationId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok){
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch donation");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json();
}

export async function deleteDonation(donationId: string, token: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${donationId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok){
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch donation");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

}