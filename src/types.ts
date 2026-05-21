/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Claim {
  id: string;
  incidentDate: string;
  category: string;
  merchant: string;
  amount: number;
  status: 'Verified' | 'Flagged' | 'In Review' | 'Draft';
  notes?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'verifying' | 'verified' | 'flagged';
  confidence?: number;
  message?: string;
  extractedData?: ExtractedData;
}

export interface ExtractedData {
  merchant: string;
  date: string;
  amount: number;
  category: string;
  invoiceNo?: string;
  lineItems?: Array<{ description: string; amount: number }>;
  surcharge?: number;
  tax?: number;
  hasAnomalies: boolean;
  anomalyType?: 'duplicate' | 'tax_missing' | 'none';
  anomalyMessage?: string;
}

export const INITIAL_CLAIMS: Claim[] = [
  {
    id: 'CLM-8271-92',
    incidentDate: 'Oct 12, 2023',
    category: 'Medical Care',
    merchant: 'Apex Medical Group',
    amount: 2450.00,
    status: 'Verified'
  },
  {
    id: 'CLM-9928-11',
    incidentDate: 'Nov 04, 2023',
    category: 'Property Damage',
    merchant: 'Global Logistics Inc.',
    amount: 8120.50,
    status: 'Flagged',
    notes: 'A claim for $1,245.50 with Global Logistics Inc. was already submitted.'
  },
  {
    id: 'CLM-1022-45',
    incidentDate: 'Nov 15, 2023',
    category: 'Vehicle Incident',
    merchant: 'City Tow & Garage',
    amount: 1200.00,
    status: 'In Review'
  },
  {
    id: 'CLM-1150-08',
    incidentDate: 'Dec 02, 2023',
    category: 'Travel Delay',
    merchant: 'Skylink Airlines',
    amount: 680.00,
    status: 'Verified'
  }
];
