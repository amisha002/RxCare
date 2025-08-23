import { useState, useEffect } from 'react';

interface Medicine {
  id: number;
  medicine_name: string;
  dosage_count: number;
  timing: any;
  duration_days: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  notifications: any[];
}

interface Prescription {
  id: number;
  userId: number;
  family_member_name: string;
  prescription_image: string | null;
  created_at: string;
  updated_at: string;
  medicines: Medicine[];
  user: {
    id: number;
    email: string;
    age: number;
    phone_number: string;
  };
}

interface Summary {
  activeMedicines: number;
  dueForRefill: number;
  totalPrescriptions: number;
  uniqueDoctors: number;
}

interface PrescriptionData {
  prescriptions: Prescription[];
  summary: Summary;
}

export function usePrescriptions() {
  const [data, setData] = useState<PrescriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch('/api/prescriptions', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication required. Please login again.');
          }
          throw new Error('Failed to fetch prescriptions');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching prescriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  return { data, loading, error };
}
