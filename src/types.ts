/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type InsuranceType = 'auto' | 'home' | 'life' | 'health' | 'enterprise' | 'travel' | 'equipment' | 'pet' | 'motorhome' | 'others';

export interface InsuranceProduct {
  id: InsuranceType;
  title: string;
  shortDesc: string;
  description: string;
  iconName: string;
  coverages: string[];
  benefits: string[];
  basePrice: number;
}

export interface QuoteInput {
  type: InsuranceType;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  state: string;
  cep: string;
  // Specific fields
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleUsage?: 'particular' | 'comercial';
  residenceType?: 'house' | 'apartment' | 'condo';
  birthDate?: string;
  occupation?: string;
}

export interface CarrierOption {
  carrierName: string;
  logo: string;
  monthlyPremium: number;
  yearlyPremium: number;
  deductible: string; // franquia
  highlights: string[];
}

export interface QuoteProposal {
  id: string;
  createdAt: string;
  input: QuoteInput;
  options: CarrierOption[];
  selectedCarrier?: string;
  status: 'pending' | 'contracted' | 'cancelled';
}

export interface ClientPolicy {
  id: string;
  policyNumber: string;
  insuranceType: InsuranceType;
  carrierName: string;
  startDate: string;
  endDate: string;
  premiumAmount: number;
  status: 'active' | 'suspended' | 'expired';
  coverageLimit: number;
}

export interface ClaimRequest {
  id: string;
  policyId: string;
  policyNumber: string;
  insuranceType: InsuranceType;
  date: string;
  description: string;
  status: 'analyzing' | 'approved' | 'rejected';
  documents: string[]; // names of uploaded files
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
